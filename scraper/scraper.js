

const puppeteer = require("puppeteer");
const Event = require("../models/Event");

async function scrapeEvents() {
  let browser;

  try {
    console.log("Starting scraping...");

    browser = await puppeteer.launch({
      headless: "new",
      // executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();

    await page.goto(
      "https://www.eventbrite.com/d/australia--sydney/events/",
      { waitUntil: "networkidle2", timeout: 60000 }
    );

    const events = await page.evaluate(() => {
      const cards = document.querySelectorAll("article");

      const results = [];

      cards.forEach(card => {
        const title = card.querySelector("h3")?.innerText.trim() || "";
        const date = card.querySelector("time")?.innerText.trim() || "";
        const link = card.querySelector("a")?.href || "";
        const image = card.querySelector("img")?.src || "";

        if (title && link) {
          results.push({
            title,
            date,
            link,
            image
          });
        }
      });

      return results;
    });

    console.log(`Events found: ${events.length}`);

    for (const event of events) {

      const exists = await Event.findOne({ eventUrl: event.link });

      if (exists) continue;

      await Event.create({
        title: event.title,
        date: event.date,
        city: "Sydney",
        source: "Eventbrite",
        eventUrl: event.link,
        image: event.image,
        lastScrapedAt: new Date(),
        status: "new"
      });

      console.log("Saved:", event.title);
    }

    console.log("Scraping finished successfully");
  } catch (err) {
    console.error("Scraper error:", err.message);
  } finally {
    if (browser) await browser.close();
  }
}

module.exports = scrapeEvents;