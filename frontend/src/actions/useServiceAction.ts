import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axios';

interface GeneratePlaylistsProps {
    accessToken: string;
    prompt: string;
}

async function generatePlaylists({accessToken, prompt}: GeneratePlaylistsProps):Promise<void> {
    const response = await axiosInstance.post("/service/generate-playlist",
        {
            prompt: prompt
        },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    )

    return response.data;
}

export function useGeneratePlaylists() {
    return useMutation({
        mutationKey: ['generatePlaylists'],
        mutationFn: generatePlaylists,
        onMutate: () => {},
        onSuccess: () => {},
        onError: () => {},
    })
}