import { fastify  } from "fastify";
import { fastifyCors } from '@fastify/cors'
import { prisma } from "./lib/prisma";
import { getAllPromptsRoute } from "./routes/get-all-prompts";
import { uploadVideoRoute } from "./routes/upload-video";
import { createTranscriptionRoute } from "./routes/create-transcription";
import { generateAICompletionRoute } from "./routes/generate-ai-completion";

const app = fastify()
const port = process.env.PORT || 10000

app.register(fastifyCors, {
    origin: '*',
})

app.register(getAllPromptsRoute)
app.register(uploadVideoRoute)
app.register(createTranscriptionRoute)
app.register(generateAICompletionRoute)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });