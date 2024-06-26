import { Github, Wand2 } from "lucide-react";
import { Button } from "./components/ui/button";
import { Separator } from "./components/ui/separator";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Slider } from "./components/ui/slider";
import { VideoInputForm } from "./components/video-input-form";
import { PromptSelect } from "./components/prompt-select";
import { useState } from "react";
import { useCompletion } from 'ai/react'

export function App() {
  const [temperatura, setTemperatura] = useState(0.5)
  const [videoId, setVideoId] = useState<String | null>(null)

  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
  } = useCompletion({
    api: "http://35.160.120.126/ai/complete",
    body: {
      videoId,
      temperatura,
      
    },
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-6 py-3 flex itens-center justify-between border-b">
        <h1 className="text-xl font-bold px-2">upload.ai</h1>

        <div className="flex itens-center gap-3">
          <span className="text-sm text-muted-foreground py-2">
            Desenvolvido com ❤ por Lucas Campos
          </span>

          <Separator orientation="vertical" className="h-9" />
          <a href="https://github.com/lucascmpos" target="_blank">
          <Button variant="outline">
            <Github className="w-4 h-4 mr-2" />
            Github
          </Button>
          </a>
        </div>
      </div>
      <main className="flex-1 p-6 flex gap-6">
        <div className="flex flex-col flex-1 gap-4">
          <div className="grid grid-rows-2 gap-4 flex-1">
            <Textarea
             className="resize-none p-4 leading-relaxed"
             placeholder="Inclua o prompt para a IA..."
             value={input}
             onChange={handleInputChange} 
             />
            <Textarea
             className="resize-none p-4 leading-relaxed"
             placeholder="Resultado gerado pela IA..." 
             readOnly
             value={completion} 
             />
          </div>

          <p className="text-sm text-muted-foreground">
            Lembre-se: você pode utilizar a variável{" "}
            <code className="text-violet-400">{'{transcription}'}</code> no seu prompt
            para adicionar o conteúdo da transcrição do vídeo selecionado.
          </p>
        </div>
        <aside className="w-80 space-y-6">
          <VideoInputForm
            onVideoUploaded={setVideoId}          
          />
          <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
              <Label>Prompt</Label>
              <PromptSelect onPromptSelected={setInput} />
            </div>

            <div className="space-y-2">
              <Label>Modelo</Label>
              <Select disabled defaultValue="gpt3.5">
                <SelectTrigger>
                  <SelectValue>

                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt3.5">
                    GPT 3.5-turbo 16k
                  </SelectItem>
                </SelectContent>
              </Select>
              <span className="block text-xs text-muted-foreground italic">Você poderá customizar essa opção em breve</span>
            </div>

            <Separator />

            <div className="space-y-4">
              <Label>Temperatura</Label>
              <Slider
              min={0}
              max={1}
              step={0.1}
              value={[temperatura]}
              onValueChange={value => setTemperatura(value[0])} 
              />
              
              <span className="block text-xs text-muted-foreground italic leading-relaxed">
                Valores mais altos tendem a deixar o resultado mais criativo e com possíveis erros.
                </span>
            </div>

            <Separator />
          

            <Button disabled={isLoading} type="submit" className="w-full">
              Executar
              <Wand2 className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </aside>
      </main>
    </div>
  );
}
