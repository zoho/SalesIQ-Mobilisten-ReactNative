import { SIQArticleMessageTheme } from "./SIQArticleMessageTheme"
import { SIQAudioPlayerTheme } from "./SIQAudioPlayerTheme"
import { SIQFileMessageTheme } from "./SIQFileMessageTheme"
import { SIQInfoMessageTheme } from "./SIQInfoMessageTheme"
import { SIQInputCardTheme } from "./SIQInputCardTheme"
import { SIQMessageCommonTheme } from "./SIQMessageCommonTheme"
import { SIQSelectionComponentTheme } from "./SIQSelectionComponentTheme"
import { SIQSkipActionButtonTheme } from "./SIQSkipActionButtonTheme"
import { SIQSliderCardTheme } from "./SIQSliderCardTheme"
import { SIQSuggestionTheme } from "./SIQSuggestionTheme"

export class SIQMessageTheme {
    Common = new SIQMessageCommonTheme()
    Suggestion = new SIQSuggestionTheme()
    SkipActionButton = new SIQSkipActionButtonTheme()
    AudioPlayer = new SIQAudioPlayerTheme()
    Selection = new SIQSelectionComponentTheme()
    InputCard = new SIQInputCardTheme()
    Slider = new SIQSliderCardTheme()
    InfoMessage = new SIQInfoMessageTheme()
    Article = new SIQArticleMessageTheme()
    File = new SIQFileMessageTheme()
}