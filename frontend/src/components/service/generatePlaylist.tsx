import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

import {useGeneratePlaylists} from "@/actions/useServiceAction.ts";

interface GeneratePlaylistAreaProps {
    accessToken: string;
}

export function GeneratePlaylistArea({accessToken}: GeneratePlaylistAreaProps) {
    const {mutate: generatePlaylist, isPending} = useGeneratePlaylists();

    async function handleClick() {
        const textarea = document.querySelector("textarea");

        if(!textarea) {
            console.error("Textarea not found");
            return;
        }

        const prompt = textarea.value;

        if(prompt === "") {
            console.error("Prompt is empty");
            return;
        }

        generatePlaylist({accessToken, prompt})
    }

    return (
        <div className="grid w-full gap-2">
            <Textarea placeholder="Type Your Prompt Here" />
            <Button
                onClick={handleClick}
                disabled={isPending}
            >
                Generate Playlist
            </Button>
        </div>
    )
}
