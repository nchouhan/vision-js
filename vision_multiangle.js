import OpenAI from 'openai';
import chalk from 'chalk';
import dotenv from 'dotenv';

dotenv.config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); 


const PROMPT = `
Assume you are a marketing expert specializing in Office going Young Professional consumer engagement. Your task is to craft compelling product descriptions and detailed product attributes for an e-commerce website, lottosport.in. The descriptions should be trendy, engaging, and resonate with Office going young Millenial Professionals.

1. **Product Description:**
   - Highlight the product’s unique features, including materials, comfort, durability, and performance.
   - Incorporate fun and relevant occasions where the shoes or sandals can be worn (e.g., music festivals, college days, weekend getaways).
   - Emphasize colors, design elements, and styling tips that align with current Gen Z fashion trends.
   - Use a conversational, playful, and aspirational tone that excites and informs shoppers.
   - Keep it concise yet vivid, ensuring the description creates a strong desire to purchase.
   
2. **Product Attributes:**
   - Material Composition
   - Sole Type
   - Fit & Comfort Level
   - Durability & Use Case
   - Ideal Weather & Activity
   - Available Color Options
   - Size Variants
`;

const productImages = [
    "https://storage.googleapis.com/agilitas-bucket/product_images/22878/CS0-01.jpg",
    "https://storage.googleapis.com/agilitas-bucket/product_images/22878/CS0-02.jpg",
    "https://storage.googleapis.com/agilitas-bucket/product_images/22878/CS0-03.jpg",
    "https://storage.googleapis.com/agilitas-bucket/product_images/22878/CS0-04.jpg",
    "https://storage.googleapis.com/agilitas-bucket/product_images/22878/CS0-05.jpg",
    "https://storage.googleapis.com/agilitas-bucket/product_images/22878/CS0-06.jpg",
    "https://storage.googleapis.com/agilitas-bucket/product_images/22878/CS0-26.jpg",
];

async function generateProductDetails() {
    try {
        const response = await client.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: PROMPT },
                        ...productImages.map(url => ({ type: "image_url", image_url: { url } })),
                    ],
                },
            ],
            max_tokens: 500,
        });
        
        console.log(chalk.cyan(response.choices[0].message.content));
    } catch (error) {
        console.error("Error generating product details:", error);
    }
}

generateProductDetails();