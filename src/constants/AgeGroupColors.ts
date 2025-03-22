import { AgeGroup } from "../types/transaction";
import { theme } from "../styles/StyledComponents";

export const AgeGroupColors: Record<AgeGroup, string> = {
    "Under 15": theme.colors.white,  
    "15-19": theme.colors.neutral_400,     
    "20-29": theme.colors.neutral_500,     
    "30-39": theme.colors.neutral_600,     
    "40-49": theme.colors.neutral_700,     
    "50+": theme.colors.neutral_800,       
}; 
