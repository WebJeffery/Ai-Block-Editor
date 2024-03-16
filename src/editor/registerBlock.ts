import { Boot } from "./Boot";

import { HeadingPlugin } from "../toolbar/heading/Heading"
import { ParagraphPlugin } from "../toolbar/paragraph/Paragraph";
import { ListPlugin } from "../toolbar/list/List";
import { QuotePlugin } from "../toolbar/quote/Quote";

Boot.registerTiptapBlock(HeadingPlugin)
Boot.registerTiptapBlock(ParagraphPlugin)
Boot.registerTiptapBlock(ListPlugin)
Boot.registerTiptapBlock(QuotePlugin)