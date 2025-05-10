import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axios';

interface GeneratePlaylistsProps {
    accessToken: string;
    providerToken: string;
    prompt: string;
}

async function generatePlaylists({accessToken, providerToken, prompt}: GeneratePlaylistsProps):Promise<void> {
    const response = await axiosInstance.post("/service/generate-playlist",
        {
            prompt: prompt
        },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'x-provider-token': providerToken
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