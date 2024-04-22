import { Button } from "@/components/ui/Button";
import { SendHorizonal, Smile } from "lucide-react";
import { useState } from "react";

interface IEmojiTextareaProps {
  onSubmit: (text: string) => void;
}
export const EmojiTextarea = ({ onSubmit }: IEmojiTextareaProps) => {
  const [text, setText] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);

  const handleAddEmoji = (emoji: string) => {
    setText(text + " " + emoji + " ");
  };

  const handleShowEmojis = () => {
    setShowEmojis(!showEmojis);
  };

  const handelSubmit = () => {
    onSubmit(text.trim());
    setText("");
  };

  return (
    <div className="  text-black w-full">
      <textarea
        className=" w-full rounded-md bg-slate-500 p-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
      />
      <button className="text-gray-300" onClick={handleShowEmojis}>
        <Smile />
      </button>

      {showEmojis && (
        <div className="flex gap-2">
          <button onClick={() => handleAddEmoji("😊")}>😊</button>
          <button onClick={() => handleAddEmoji("👍")}>👍</button>
        </div>
      )}
      <div className=" flex justify-end">
        <Button variant="link" onClick={handelSubmit}>
          <SendHorizonal className="h-4 w-4 text-blue-600" />
        </Button>
      </div>
    </div>
  );
};
