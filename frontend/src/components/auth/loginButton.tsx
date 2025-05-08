import {Button} from "@/components/ui/button.tsx";
import supabase from "@/utils/supabase";

export default function LoginButton() {
    async function signInWithSpotify() {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'spotify',
        })

        if (error) {
            console.log(error)
        }
    }

    return (
        <Button onClick={signInWithSpotify}>Sign in with Spotify</Button>
    )
}