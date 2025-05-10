import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { QueryClientProvider, QueryClient,  } from "@tanstack/react-query";
import { ThemeProvider } from '@/components/theme-provider'

const queryClient = new QueryClient();


export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <ThemeProvider defaultTheme={"dark"}>
        <React.Fragment>
            <QueryClientProvider client={queryClient}>
                <Outlet />
            </QueryClientProvider>
        </React.Fragment>
    </ThemeProvider>
  )
}
