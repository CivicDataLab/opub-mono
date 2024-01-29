import { NextResponse, NextRequest } from "next/server";
import puppeteer from "puppeteer";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  // return NextResponse.json({ id: 1, name: 'john doe', url })

  if (!url) {
    return NextResponse.json(
      { error: "URL parameter is required" },
      { status: 400 }
    );
  }
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: "new",
    });
    const page = await browser.newPage();
    await page.goto(url);

    const screenshot = await page.screenshot({ encoding: "base64" });

    return new Response(`data:image/png;base64,${screenshot}`, {
      headers: {
        "Content-Type": "image/png",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 200 }
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
