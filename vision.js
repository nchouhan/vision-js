import OpenAI from 'openai';
import chalk from 'chalk';
import dotenv from 'dotenv';

dotenv.config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const PROMPT = `
Assume you are a marketing expert specializing in Gen Z consumer engagement. Your task is to craft compelling product descriptions for an e-commerce website, lottosport.in. The descriptions should be trendy, engaging, and resonate with Gen Z shoppers.

Highlight the product’s unique features, including materials, comfort, durability, and performance.
Incorporate fun and relevant occasions where the shoes or sandals can be worn (e.g., music festivals, college days, weekend getaways).
Emphasize colors, design elements, and styling tips that align with current Gen Z fashion trends.
Use a conversational, playful, and aspirational tone that excites and informs shoppers.
Keep it concise yet vivid, ensuring the description creates a strong desire to purchase.
`;

async function generateProductDescription() {
    try {
        const response = await client.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: PROMPT },
                        { type: "image_url", image_url: { url: "https://storage.googleapis.com/agilitas-bucket/product_images/L10007701.png" } },
                        { type: "image_url", image_url: { url: "https://storage.googleapis.com/agilitas-bucket/product_images/L10010205.png" } },
                    ],
                },
            ],
            max_tokens: 300,
        });
        
        console.log(chalk.cyan(response.choices[0].message.content));
    } catch (error) {
        console.error("Error generating product description:", error);
    }
}

generateProductDescription();