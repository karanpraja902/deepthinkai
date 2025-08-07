const {model}=require("mongoose")
const {GoogleGenAI}=require("@google/genai")//imported google gen ai

const genAi=new GoogleGenAI({
    apiKey:process.env.GOOGLE_API_KEY
})

const DEFAULT_SYSTEM_MESSAGE =
  "You are DEEPTHINK AI, a helpful AI assistant. You provide accurate, informative, and friendly responses. Always be respectful, helpful, and concise in your responses. After your first message, also include a suitable chat title (in 3-8 words) in the format: [TITLE: Your generated title here]."

  async function generateStreamResponse(message,onChunk){
    try {
        if(!message.some((msg) => msg.role === 'system')){
            message= [{role:"system", content:DEFAULT_SYSTEM_MESSAGE},...message]
        }
        const formattedMessage = message.map((msg) =>({
            role:msg.role,
            content:msg.content
        }));

        const stream = await genAi.chat.completions.create({
    model:"gemini-2.0-flash-exp",
            messages:formattedMessage,
            stream:true
        });


        let fullResponse = "";
        for await (const chunk of stream){
            const content = chunk.choices[0]?.delta?.content || "";
            if(content){
                fullResponse += content;
                if(onChunk){
                   onChunk(content)
                }
            }
        }
        
        return fullResponse;
    } catch (error) {
        console.error("Error in deepseek ai provider",error)
        throw new Error(error)
    }
}


module.exports={generateStreamResponse}

