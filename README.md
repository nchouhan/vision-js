# **OpenAI Vision Module - Sample Project**  

This repository contains sample files to experiment with OpenAI's Vision modules.  

## **Installation**  
To set up the project, install the required dependencies using the following commands:  

```sh
npm install chalk
npm install openai
npm install dotenv
```

## **API Key Setup**  
1. Create an API key from OpenAI:  
   - Go to the [OpenAI Platform](https://platform.openai.com/)  
   - Sign in with your OpenAI account  
   - Click on your **profile icon** (top-right corner)  
   - Select **"View API keys"**  
   - Click **"Create a new secret key"**  
   - **Copy and store the key securely** (you won't be able to see it again)  

2. Set the key in your `.env` file:  

```sh
OPENAI_API_KEY=your_api_key_here
```

## **Usage**  
Run the script using Node.js:  

```sh
node vision.js
```

### **Customization**  
- Modify the **prompt** and **image URLs** in `vision.js` as per your requirements.  
- Ensure you're using the correct **OpenAI model** (`gpt-4o` or another as needed).  

## **Code Overview**  
The script imports required modules, loads the OpenAI API key from the environment, and sends a **prompt** along with image URLs to generate engaging product descriptions.  

### **Main Dependencies**  
```javascript
import OpenAI from 'openai';
import chalk from 'chalk';
import dotenv from 'dotenv';

dotenv.config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); 
```

### **Prompt Example**  
The script is designed to generate **trendy and engaging product descriptions** for footwear targeting **office-going young professionals**.  

```javascript
const PROMPT = `
Assume you are a marketing expert specializing in Office-going Young Professional consumer engagement...
`;
```

### **Product Images**  
The script sends a series of product images to OpenAI along with the prompt:  

```javascript
const productImages = [
    "https://storage.googleapis.com/agilitas-bucket/product_images/22878/CS0-01.jpg",
    "https://storage.googleapis.com/agilitas-bucket/product_images/22878/CS0-02.jpg",
    ...
];
```

### **Generating Product Details**  
The script makes an OpenAI API call to generate descriptions based on the provided images:  

```javascript
async function generateProductDetails() {
    try {
        const response = await client.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "user", content: [{ type: "text", text: PROMPT }, ...productImages.map(url => ({ type: "image_url", image_url: { url } }))] },
            ],
            max_tokens: 500,
        });

        console.log(chalk.cyan(response.choices[0].message.content));
    } catch (error) {
        console.error("Error generating product details:", error);
    }
}

generateProductDetails();
```

## **Contributing**  
Feel free to contribute by:  
- Improving prompts  
- Adding support for more OpenAI models  
- Enhancing error handling  
