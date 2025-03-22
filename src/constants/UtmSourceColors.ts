import { UtmSource } from "../types/transaction";
import { theme } from "../styles/StyledComponents";

// TODO: Take this colors into the theme
export const UtmSourceColors: Record<UtmSource, string> = {
    [UtmSource.Facebook]: theme.colors.facebook,
    [UtmSource.Instagram]: theme.colors.instagram,
    [UtmSource.Google]: theme.colors.google,
    [UtmSource.TikTok]: theme.colors.tiktok,
    [UtmSource.Twitter]: theme.colors.twitter,
    [UtmSource.Pinterest]: theme.colors.pinterest,
    [UtmSource.LinkedIn]: theme.colors.linkedin,
    [UtmSource.Other]: theme.colors.gray400,
    [UtmSource.None]: theme.colors.gray500,
}

