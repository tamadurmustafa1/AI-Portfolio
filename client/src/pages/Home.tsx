import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  AudioLines,
  BookOpen,
  Check,
  ChevronDown,
  Code2,
  ExternalLink,
  FileText,
  Gamepad2,
  Globe2,
  Heart,
  Image as ImageIcon,
  Layers3,
  Menu,
  MessageCircle,
  MoveUpRight,
  PanelTop,
  Play,
  Presentation,
  Sparkles,
  X,
} from "lucide-react";
import type { CSSProperties, ReactNode } from "react";

type Lang = "ar" | "en";
type ProjectType = "image" | "video" | "html" | "doc" | "audio";

type Project = {
  id: string;
  type: ProjectType;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  source?: string;
  poster?: string;
  drive?: string;
  tool?: { ar: string; en: string };
  cta?: { ar: string; en: string };
  featured?: boolean;
};

type PortfolioSection = {
  id: string;
  index: string;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  projects: Project[];
  accent: "orange" | "blue" | "ice";
};

const storage = {
  profile: "/manus-storage/profile-cover_fbae9d8d.png",
  gameFish: "/manus-storage/fish-bead-thumbnail_ed5c0dda.png",
  hajjPoster: "/manus-storage/poster-hajj-kaaba_cb371364.png",
  interactivePosters: {
    plant: "/manus-storage/poster-save-my-plant_f0c1aa89.png",
    cells: "/manus-storage/poster-living-cells_964cbad2.png",
    pascal: "/manus-storage/poster-pascals-law_f045ca62.png",
  },
  transVideo: "/manus-storage/video-transformation-cinematic_63a0e148.mp4",
  transPoster: "/manus-storage/poster-transformation_c4c730c4.jpg",
  images: {
    library: "/manus-storage/gallery-library_2e098d0f.jpg",
    ocean: "/manus-storage/gallery-ocean-street_fee15af3.jpg",
    dinosaur: "/manus-storage/gallery-dinosaur_92c26d31.png",
    surreal: "/manus-storage/gallery-surreal_867ef0b0.jpg",
    character1: "/manus-storage/gallery-character-1_6d88aee3.jpeg",
    character2: "/manus-storage/gallery-character-2_6d0237f6.jpeg",
    flow1: "/manus-storage/gallery-flow-1_3a2b0cb7.png",
    flow2: "/manus-storage/gallery-flow-2_c7ef9063.png",
    paperback: "/manus-storage/gallery-paperback_858f1860.png",
    construction: "/manus-storage/gallery-construction_bbc1ad1a.jpg",
    fashion: "/manus-storage/gallery-fashion-card_163ca1bb.jpg",
    computerFlow: "/manus-storage/gallery-computer-flow_aaa11103.jpg",
  },
  posters: {
    kitchen: "/manus-storage/poster-kitchen_9c7f1526.jpg",
    bead: "/manus-storage/poster-bead-workshop_15ce120c.jpg",
    lab: "/manus-storage/poster-computer-lab_ba33e1d6.jpg",
    robot: "/manus-storage/poster-robot_f20c6208.jpg",
    smartbox: "/manus-storage/poster-smartbox_63373bd9.jpg",
    cake: "/manus-storage/poster-tala-cake_cbd03009.jpg",
    promo: "/manus-storage/poster-creative-promo_ae886c36.png",
    data: "/manus-storage/poster-data-trainer_5a5157bb.png",
    smartDeliveryBox: "/manus-storage/poster-smart-delivery-box_9aa9e333.png",
    dragon: "/manus-storage/poster-dragon-snow_7fedd24f.png",
    coffee: "/manus-storage/poster-tala-coffee_ec9808e5.png",
    startup: "/manus-storage/poster-computer-startup_66662812.png",
  },
  videos: {
    kitchen: "/manus-storage/video-kitchen-transformation_80d5dbcc.mp4",
    bead: "/manus-storage/video-bead-workshop-transformation_2bfd07d2.mp4",
    lab: "/manus-storage/video-computer-lab_e2d81777.mp4",
    promo: "/manus-storage/video-promo-creative_2efbcc40.mp4",
    data: "/manus-storage/video-data-trainer_d998b3c3.mp4",
    smartbox: "/manus-storage/video-smartbox-avatar_a61ff939.mp4",
    robot: "/manus-storage/video-robot-child_da506183.mp4",
    cake: "/manus-storage/video-tala-cake_4f534e8c.mp4",
    coffee: "/manus-storage/video-tala-mila-coffee_15cf5fe0.mp4",
    dragon: "/manus-storage/video-dragon-snow_533c8bab.mp4",
    startup: "/manus-storage/video-computer-startup_df1f2c15.mp4",
  },
  html: {
    plant: "/manus-storage/interactive-save-my-plant_cd281502.html",
    cells: "/manus-storage/interactive-cell-lesson_f2ece2df.html",
    pascal: "/manus-storage/interactive-pascal_9102ab6d.html",
    beadGame: "/manus-storage/game-bead-quest_f5c00ec8.html",
    fishGame: "/manus-storage/game-fish-out-of-place_338dc80f.html",
  },
  audio: {
    courtyard: "/manus-storage/Courtyard_of_the_Brave_1d7369fc.mp3",
  },
};

const drive = {
  presentation: "https://drive.google.com/file/d/1keoULuPFQTkw7rppJEmST1Q9M8LoQ308/view",
  englishBook: "https://drive.google.com/file/d/1_1NaOqUCHJgGng6sNNwVeH43VZhyPb_w/view",
  talaBook: "https://drive.google.com/file/d/1D8xYiS8Zc8p2FM-LSupu5Spim3Rx1W2A/view",
};

const L = (lang: Lang, value: { ar: string; en: string }) => value[lang];

const sections: PortfolioSection[] = [
  {
    id: "timelapse",
    index: "01",
    title: { ar: "تايم لابس — تصميم وتحول المساحات", en: "Time Lapse — Space Design & Transformation" },
    description: { ar: "مشاهد متتابعة توثق تحوّل المساحات، من المختبر والمطبخ إلى مشغل شك الخرز.", en: "Time-based studies documenting spaces in motion: from a computer lab and kitchen to a bead-craft workshop." },
    accent: "orange",
    projects: [
      { id: "kitchen", type: "video", title: { ar: "تحول المطبخ", en: "Kitchen Transformation" }, description: { ar: "فيديو تايم لابس لتحول مساحة المطبخ.", en: "A time-lapse video of a kitchen transformation." }, source: storage.videos.kitchen, poster: storage.posters.kitchen, tool: { ar: "فيديو", en: "Video" } },
      { id: "bead-workshop", type: "video", title: { ar: "مراحل تصميم مشغل شك الخرز", en: "Bead Workshop — Design Stages" }, description: { ar: "مراحل ديكور وتصميم مشغل حرف يدوية لشك الخرز.", en: "Stages of decorating and designing a handmade bead-craft workshop." }, source: storage.videos.bead, poster: storage.posters.bead, tool: { ar: "فيديو", en: "Video" } },
      { id: "computer-lab", type: "video", title: { ar: "مختبر الحاسوب", en: "Computer Lab" }, description: { ar: "تحول بصري لمساحة مختبر الحاسوب.", en: "A visual transformation of a computer lab space." }, source: storage.videos.lab, poster: storage.posters.lab, tool: { ar: "فيديو", en: "Video" } },
    ],
  },
  {
    id: "audio",
    index: "02",
    title: { ar: "الأصوات والموسيقى", en: "Audio & Music" },
    description: { ar: "مساحة صوتية تجمع أغنية شك خرز وأعمالاً صوتية من ملف التدريب.", en: "An audio space featuring Shape Kharaz and other sound works from the course portfolio." },
    accent: "ice",
    projects: [
      { id: "shape-kharaz", type: "audio", title: { ar: "أغنية شكل خرز", en: "Shape Kharaz Song" }, description: { ar: "أغنية إبداعية صُنعت باستخدام Suno. الرابط محفوظ في ملف My Links الأصلي.", en: "A creative song made with Suno. The link is preserved from the original My Links document." }, drive: "https://suno.com/s/QLM2sxwaYqIkI1DU", tool: { ar: "Suno", en: "Suno" }, cta: { ar: "استمع إلى الأغنية", en: "Listen to the Song" }, featured: true },
      { id: "courtyard", type: "audio", title: { ar: "Courtyard of the Brave", en: "Courtyard of the Brave" }, description: { ar: "مقطع صوتي موجود ضمن مجلد الأصوات والموسيقى.", en: "An audio piece included in the Audio & Music folder." }, source: storage.audio.courtyard, tool: { ar: "ملف صوتي", en: "Audio file" } },
    ],
  },
  {
    id: "games",
    index: "03",
    title: { ar: "الألعاب", en: "Games" },
    description: { ar: "تجارب لعب صغيرة تعمل مباشرة من ملفات HTML الأصلية.", en: "Small playable experiences that launch directly from the original HTML files." },
    accent: "orange",
    projects: [
      { id: "bead-game", type: "html", title: { ar: "رحلة الخرز", en: "Bead Quest" }, description: { ar: "لعبة تفاعلية بطابع حرفي حول تحديات الخرز.", en: "An interactive craft-themed game built around bead challenges." }, source: storage.html.beadGame, tool: { ar: "HTML تفاعلي", en: "Interactive HTML" }, cta: { ar: "افتح اللعبة", en: "Open Game" } },
      { id: "fish-game", type: "html", title: { ar: "سمكة مش بمكانها", en: "Fish Out of Place" }, description: { ar: "تجربة لعبة قصيرة بواجهة مرحة ومباشرة.", en: "A short playable experience with a playful, direct interface." }, source: storage.html.fishGame, tool: { ar: "HTML تفاعلي", en: "Interactive HTML" }, cta: { ar: "افتح اللعبة", en: "Open Game" } },
    ],
  },
  {
    id: "ads",
    index: "04",
    title: { ar: "الدعايات", en: "Advertising" },
    description: { ar: "فيديوهات دعائية وتجارب أفاتار تحوّل الفكرة إلى رسالة مرئية.", en: "Promotional videos and avatar-led pieces that turn a concept into a visual message." },
    accent: "blue",
    projects: [
      { id: "promo", type: "video", title: { ar: "فيديو دعائي إبداعي", en: "Creative Promotional Video" }, description: { ar: "فيديو ترويجي من مواد الدورة.", en: "A promotional video from the course portfolio." }, source: storage.videos.promo, poster: storage.posters.promo, tool: { ar: "فيديو", en: "Video" } },
      { id: "data-trainer", type: "video", title: { ar: "مدربة إدخال البيانات", en: "Data Entry Trainer" }, description: { ar: "فيديو دعائي يقدّم شخصية مدربة إدخال البيانات.", en: "A promotional video introducing a data-entry trainer character." }, source: storage.videos.data, poster: storage.posters.data, tool: { ar: "فيديو", en: "Video" } },
      { id: "smartbox", type: "video", title: { ar: "إعلان سمارت بوكس مع أفاتار", en: "Smart Box Ad with Avatar" }, description: { ar: "إعلان مرئي لسمارت بوكس باستخدام أفاتار.", en: "A visual Smart Box advertisement using an avatar." }, source: storage.videos.smartbox, poster: storage.posters.smartDeliveryBox, tool: { ar: "فيديو", en: "Video" } },
    ],
  },
  {
    id: "images",
    index: "05",
    title: { ar: "الصور", en: "Images" },
    description: { ar: "صور وشخصيات وأغلفة وتكوينات بصرية من التجارب الإبداعية.", en: "Characters, covers, compositions, and visual studies from the creative experiments." },
    accent: "ice",
    projects: [
      { id: "character-1", type: "image", title: { ar: "ورقة شخصية 01", en: "Character Sheet 01" }, description: { ar: "ورقة تصميم شخصية من ملف الصور.", en: "A character design sheet from the image collection." }, source: storage.images.character1, tool: { ar: "صورة", en: "Image" } },
      { id: "character-2", type: "image", title: { ar: "ورقة شخصية 02", en: "Character Sheet 02" }, description: { ar: "ورقة تصميم شخصية ثانية من ملف الصور.", en: "A second character design sheet from the image collection." }, source: storage.images.character2, tool: { ar: "صورة", en: "Image" } },
      { id: "flow-1", type: "image", title: { ar: "Google Flow — مشهد 01", en: "Google Flow — Scene 01" }, description: { ar: "مشهد بصري محفوظ ضمن صور Google Flow.", en: "A visual scene preserved in the Google Flow image set." }, source: storage.images.flow1, tool: { ar: "Google Flow", en: "Google Flow" } },
      { id: "flow-2", type: "image", title: { ar: "Google Flow — مشهد 02", en: "Google Flow — Scene 02" }, description: { ar: "مشهد بصري ثانٍ من المجموعة نفسها.", en: "A second visual scene from the same set." }, source: storage.images.flow2, tool: { ar: "Google Flow", en: "Google Flow" } },
      { id: "paperback", type: "image", title: { ar: "غلاف كتاب", en: "Book Cover" }, description: { ar: "تصميم غلاف محفوظ ضمن مجموعة الصور.", en: "A cover design preserved in the image collection." }, source: storage.images.paperback, tool: { ar: "تصميم بصري", en: "Visual design" } },
      { id: "construction", type: "image", title: { ar: "تصحيح أخطاء البناء", en: "Construction Error Correction" }, description: { ar: "صورة معنونة بتصحيح أخطاء البناء.", en: "An image titled Construction Error Correction." }, source: storage.images.construction, tool: { ar: "صورة", en: "Image" } },
    ],
  },
  {
    id: "surreal",
    index: "06",
    title: { ar: "الصور الغريبة والخيالية", en: "Strange & Imaginative Images" },
    description: { ar: "صور تتجاوز الواقع: مكتبة في الصحراء، شارع يتحول إلى محيط، وديناصور في المدينة.", en: "Images that move beyond reality: a desert library, a street becoming an ocean, and a dinosaur in the city." },
    accent: "orange",
    projects: [
      { id: "library", type: "image", title: { ar: "مكتبة في الصحراء", en: "Library in the Desert" }, description: { ar: "مشهد خيالي من مجموعة الصور الغريبة.", en: "An imaginative scene from the surreal image collection." }, source: storage.images.library, tool: { ar: "صورة مولدة", en: "Generated image" } },
      { id: "ocean-street", type: "image", title: { ar: "شارع يتحول إلى محيط", en: "Street Becoming an Ocean" }, description: { ar: "تحويل مشهد حضري إلى صورة خيالية.", en: "A city scene transformed into an imaginative image." }, source: storage.images.ocean, tool: { ar: "صورة مولدة", en: "Generated image" } },
      { id: "dinosaur", type: "image", title: { ar: "ديناصور ضخم في المدينة", en: "Giant Dinosaur in the City" }, description: { ar: "صورة خيالية تجمع المدينة والمخلوق العملاق.", en: "An imaginative image merging a city with a giant creature." }, source: storage.images.dinosaur, tool: { ar: "صورة مولدة", en: "Generated image" } },
      { id: "surreal", type: "image", title: { ar: "مشهد خيالي", en: "Surreal Scene" }, description: { ar: "مشهد بصري عمودي من المجموعة الخيالية.", en: "A vertical visual scene from the imaginative collection." }, source: storage.images.surreal, tool: { ar: "صورة مولدة", en: "Generated image" } },
    ],
  },
  {
    id: "presentations",
    index: "07",
    title: { ar: "العروض التقديمية", en: "Presentations" },
    description: { ar: "عرض تقديمي تعليمي محفوظ كملف PowerPoint ضمن مجلد العروض.", en: "An educational presentation preserved as a PowerPoint file in the presentations folder." },
    accent: "blue",
    projects: [
      { id: "hajj", type: "doc", title: { ar: "مناسك الحج — دليل شامل", en: "Hajj Rituals — A Complete Guide" }, description: { ar: "عرض تقديمي مجهز على Z AI حول مناسك الحج.", en: "A presentation prepared on Z AI about the Hajj rituals." }, drive: drive.presentation, poster: storage.hajjPoster, tool: { ar: "Z AI / PowerPoint", en: "Z AI / PowerPoint" }, cta: { ar: "افتح العرض", en: "Open Presentation" } },
    ],
  },
  {
    id: "creative-video",
    index: "08",
    title: { ar: "الفيديو الإبداعي", en: "Creative Video" },
    description: { ar: "قصص قصيرة ومشاهد خيالية وتجارب سردية بالصورة المتحركة.", en: "Short stories, imaginative scenes, and narrative experiments in motion." },
    accent: "ice",
    projects: [
      { id: "robot", type: "video", title: { ar: "روبوت يتفاعل مع طفل", en: "Robot Interacts with a Child" }, description: { ar: "مشهد إبداعي عن تفاعل الروبوت والطفل.", en: "A creative scene about an interaction between a robot and a child." }, source: storage.videos.robot, poster: storage.posters.robot, tool: { ar: "فيديو", en: "Video" } },
      { id: "dragon", type: "video", title: { ar: "التنين والثلج", en: "The Dragon & the Snow" }, description: { ar: "مشهد فيديو خيالي عن التنين والثلج.", en: "An imaginative video scene featuring a dragon and snow." }, source: storage.videos.dragon, poster: storage.posters.dragon, tool: { ar: "فيديو", en: "Video" } },
      { id: "cake", type: "video", title: { ar: "تالا تصنع الكيك", en: "Tala Makes a Cake" }, description: { ar: "مشهد قصصي عن تالا وصناعة الكيك.", en: "A story scene about Tala making a cake." }, source: storage.videos.cake, poster: storage.posters.cake, tool: { ar: "فيديو", en: "Video" } },
      { id: "coffee", type: "video", title: { ar: "تالا وميلا مع القهوة", en: "Tala & Mila with Coffee" }, description: { ar: "مشهد قصصي يجمع تالا وميلا مع القهوة.", en: "A story scene bringing Tala and Mila together over coffee." }, source: storage.videos.coffee, poster: storage.posters.coffee, tool: { ar: "فيديو", en: "Video" } },
      { id: "startup", type: "video", title: { ar: "من زر التشغيل إلى سطح المكتب", en: "From Power Button to Desktop" }, description: { ar: "محاكاة مرئية لمراحل تشغيل جهاز الحاسوب.", en: "A visual simulation of the computer startup sequence." }, source: storage.videos.startup, poster: storage.posters.startup, tool: { ar: "فيديو", en: "Video" } },
    ],
  },
  {
    id: "cards",
    index: "09",
    title: { ar: "بطاقات تعريفية ومخططات تفصيلية", en: "Info Cards & Detailed Diagrams" },
    description: { ar: "مخططات وبطاقات تعريفية تشرح العملية بصرياً وتحوّل الخطوات إلى معرفة قابلة للتتبع.", en: "Diagrams and information cards that turn process steps into clear, traceable knowledge." },
    accent: "orange",
    projects: [
      { id: "fashion-card", type: "image", title: { ar: "بطاقة تعريفية — درزة الملابس النسائية", en: "Info Card — Women's Garment Stitching" }, description: { ar: "بطاقة تعريفية توضح موضوع درزة الملابس النسائية.", en: "An information card about women's garment stitching." }, source: storage.images.fashion, tool: { ar: "مخطط بصري", en: "Visual diagram" } },
      { id: "computer-flow", type: "image", title: { ar: "مخطط تشغيل جهاز الحاسوب", en: "Computer Startup Flowchart" }, description: { ar: "مخطط تفصيلي لمراحل تشغيل جهاز الحاسوب.", en: "A detailed diagram of the computer startup stages." }, source: storage.images.computerFlow, tool: { ar: "مخطط بصري", en: "Visual diagram" } },
      { id: "fashion-flow", type: "image", title: { ar: "مخطط تفصيلي — درزة الملابس النسائية", en: "Detailed Diagram — Women's Garment Stitching" }, description: { ar: "مخطط تفصيلي مرتبط ببطاقة درزة الملابس النسائية.", en: "A detailed diagram connected to the women's garment stitching card." }, source: storage.images.fashion, tool: { ar: "مخطط بصري", en: "Visual diagram" } },
    ],
  },
  {
    id: "interactive",
    index: "10",
    title: { ar: "تجارب تفاعلية", en: "Interactive Experiences" },
    description: { ar: "ملفات HTML تعليمية يمكن فتحها وتشغيلها كصفحات تفاعلية مستقلة.", en: "Educational HTML files that open and run as standalone interactive pages." },
    accent: "blue",
    projects: [
      { id: "plant", type: "html", title: { ar: "أنقذ نبتتي", en: "Save My Plant" }, description: { ar: "تجربة تفاعلية تعليمية حول إنقاذ النبتة.", en: "An educational interactive experience about saving a plant." }, source: storage.html.plant, poster: storage.interactivePosters.plant, tool: { ar: "HTML تفاعلي", en: "Interactive HTML" }, cta: { ar: "افتح التجربة التفاعلية", en: "Open Experience" } },
      { id: "cells", type: "html", title: { ar: "الدرس التفاعلي — خلايا الكائنات الحية", en: "Interactive Lesson — Living Organism Cells" }, description: { ar: "رحلة تعليمية تفاعلية إلى بوابة الخلية الذكية.", en: "An interactive learning journey into the smart cell gateway." }, source: storage.html.cells, poster: storage.interactivePosters.cells, tool: { ar: "HTML تفاعلي", en: "Interactive HTML" }, cta: { ar: "افتح التجربة التفاعلية", en: "Open Experience" } },
      { id: "pascal", type: "html", title: { ar: "قانون باسكال", en: "Pascal's Law" }, description: { ar: "تجربة تفاعلية للتحكم في القوة وفهم قانون باسكال.", en: "An interactive experiment for controlling force and understanding Pascal's law." }, source: storage.html.pascal, poster: storage.interactivePosters.pascal, tool: { ar: "HTML تفاعلي", en: "Interactive HTML" }, cta: { ar: "افتح التجربة التفاعلية", en: "Open Experience" } },
    ],
  },
  {
    id: "books",
    index: "11",
    title: { ar: "قصص وكتب", en: "Stories & Books" },
    description: { ar: "كتب وقصص رقمية محفوظة كملفات PDF ضمن الأعمال.", en: "Digital books and stories preserved as PDF files in the portfolio." },
    accent: "ice",
    projects: [
      { id: "alphabet", type: "doc", title: { ar: "كتاب الحروف الإنجليزية للأطفال", en: "English Alphabet Children Book" }, description: { ar: "كتاب رقمي للأطفال محفوظ بصيغة PDF.", en: "A digital children’s book preserved as a PDF." }, drive: drive.englishBook, tool: { ar: "PDF", en: "PDF" }, cta: { ar: "افتح الكتاب", en: "Open Book" } },
      { id: "tala-moon", type: "doc", title: { ar: "رحلة تالا وإخوانها إلى القمر", en: "Tala & Her Siblings’ Journey to the Moon" }, description: { ar: "قصة رقمية طويلة محفوظة بصيغة PDF.", en: "A long-form digital story preserved as a PDF." }, drive: drive.talaBook, tool: { ar: "PDF", en: "PDF" }, cta: { ar: "افتح القصة", en: "Open Story" } },
    ],
  },
];

const iconFor = (type: ProjectType) => {
  if (type === "video") return <Play size={15} strokeWidth={2.4} />;
  if (type === "image") return <ImageIcon size={15} strokeWidth={2.4} />;
  if (type === "html") return <Code2 size={15} strokeWidth={2.4} />;
  if (type === "audio") return <AudioLines size={15} strokeWidth={2.4} />;
  return <FileText size={15} strokeWidth={2.4} />;
};

function useCopy(lang: Lang): any {
  return useMemo(() => ({
    nav: {
      ar: ["الرئيسية", "كيف غيّر AI طريقة العمل؟", "الأعمال"],
      en: ["Home", "How did AI change the way we work?", "Work"],
    },
    heroKicker: { ar: "ملف تماضر مصطفى / تدريب أدوات الذكاء الاصطناعي", en: "Tamadur Mustafa / AI tools training portfolio" },
    heroTitle: { ar: "من التعلّم\nإلى الأثر", en: "From learning\nto impact" },
    heroSubtitle: { ar: "ملف أعمال أدوات الذكاء الاصطناعي", en: "AI Tools Course Portfolio" },
    heroBody: { ar: "رحلة موثقة من استكشاف الأدوات إلى صناعة الصور، الفيديو، الصوت، القصص، الألعاب والتجارب التفاعلية — باستخدام الأعمال الفعلية المحفوظة في ملف الدورة.", en: "A documented journey from exploring AI tools to making images, video, sound, stories, games, and interactive experiences — using the actual works preserved in the course portfolio." },
    explore: { ar: "استعرض الأعمال", en: "Explore the work" },
    watch: { ar: "كيف غيّر AI طريقة العمل؟", en: "How did AI change the way we work?" },
    archiveLabel: { ar: "AI TOOLS", en: "AI TOOLS" },
    identity: { ar: "تماضر مصطفى", en: "Tamadur Mustafa" },
    identityRole: { ar: "مدربة حاسوب · مؤسسة التدريب المهني", en: "Computer trainer · Vocational Training Corporation" },
    stats: [
      { value: "11", ar: "قسمًا منظمًا", en: "structured sections" },
      { value: "34+", ar: "عملًا معروضًا", en: "works showcased" },
      { value: "05", ar: "تجارب قابلة للتشغيل", en: "playable experiences" },
      { value: "01", ar: "كيف غيّر AI طريقة العمل؟", en: "How did AI change the way we work?" },
    ],
    transformationEyebrow: { ar: "الفصل الأهم", en: "The pivotal chapter" },
    transformationTitle: { ar: "كيف غيّر AI طريقة العمل؟", en: "How did AI change the way we work?" },
    transformationBody: { ar: "هذا ليس فيديو عاديًا داخل ملف الأعمال. إنه قطعة سردية تفاعلية تسأل كيف تغيّر العمل حين أصبحت الأداة شريكًا في التفكير والتنفيذ.", en: "This is not an ordinary portfolio video. It is an interactive narrative asking how work changes when the tool becomes a partner in thinking and making." },
    phases: [
      { ar: "قبل الذكاء الاصطناعي", en: "Before AI" },
      { ar: "تعلّم الأدوات", en: "Learning tools" },
      { ar: "التجريب", en: "Experimentation" },
      { ar: "الصناعة", en: "Creation" },
      { ar: "بعد الذكاء الاصطناعي", en: "After AI" },
    ],
    like: { ar: "إعجاب", en: "Like" },
    comments: { ar: "تعليقات", en: "Comments" },
    commentPlaceholder: { ar: "اكتب ملاحظة عن: كيف غيّر AI طريقة العمل؟", en: "Write a note about: How did AI change the way we work?" },
    send: { ar: "إرسال", en: "Send" },
    workEyebrow: { ar: "الأعمال", en: "The works" },
    workTitle: { ar: "كل الأعمال", en: "All works" },
    workBody: { ar: "كل قسم يحتفظ باسم المجلد الأصلي وترتيبه. افتح الصورة، شغّل الفيديو، أو ادخل إلى التجربة الأصلية.", en: "Every section preserves the original folder name and order. Open the image, play the video, or enter the original experience." },
    openSource: { ar: "افتح المصدر", en: "Open source" },
    scroll: { ar: "مرّر للاكتشاف", en: "Scroll to discover" },
    footer: { ar: "ملف إبداعي من رحلة أدوات الذكاء الاصطناعي", en: "A creative portfolio from an AI tools journey" },
    sourceNote: { ar: "المحتوى مأخوذ من ملفات الأعمال الأصلية", en: "Content sourced from the original portfolio files" },
  }), [lang]);
}

function LanguageSwitch({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  return (
    <div className="language-switch" aria-label="Language switcher">
      <button className={lang === "ar" ? "active" : ""} onClick={() => setLang("ar")} aria-pressed={lang === "ar"}>العربية</button>
      <span>/</span>
      <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")} aria-pressed={lang === "en"}>English</button>
    </div>
  );
}

function Header({ lang, setLang, open, setOpen }: { lang: Lang; setLang: (lang: Lang) => void; open: boolean; setOpen: (value: boolean) => void }) {
  const copy = useCopy(lang);
  const links = [
    { href: "#home", label: copy.nav[lang][0] },
    { href: "#transformation", label: copy.nav[lang][1] },
    { href: "#work", label: copy.nav[lang][2] },
  ];
  return (
    <header className="site-header">
      <a className="brand-mark" href="#home" onClick={() => setOpen(false)} aria-label="AI Portfolio home"><span>AI</span><b>/</b><i>PF</i></a>
      <nav className={open ? "main-nav open" : "main-nav"}>
        {links.map((link, index) => <a key={link.href} href={link.href} onClick={() => setOpen(false)}><small>0{index + 1}</small>{link.label}</a>)}
      </nav>
      <div className="header-actions"><LanguageSwitch lang={lang} setLang={setLang} /><button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X size={20} /> : <Menu size={20} />}</button></div>
    </header>
  );
}

function Hero({ lang }: { lang: Lang }) {
  const copy = useCopy(lang);
  return (
    <section className="hero-section" id="home">
      <div className="hero-grid">
        <div className="hero-copy reveal-up">
          <div className="eyebrow"><span className="eyebrow-dot" />{L(lang, copy.heroKicker)}</div>
          <div className="hero-signature"><span className="signature-line" /><div className="hero-identity-copy"><span className="hero-name">{L(lang, copy.identity)}</span><small>{L(lang, copy.identityRole)}</small></div></div>
          <h1>{L(lang, copy.heroTitle)}</h1>
          <div className="hero-title-meta"><span>{L(lang, copy.heroSubtitle)}</span><span className="line" /><span>2026</span></div>
          <p className="hero-body">{L(lang, copy.heroBody)}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">{L(lang, copy.explore)} <ArrowDownLeft size={17} /></a>
            <a className="button button-quiet" href="#transformation"><span className="play-disc"><Play size={12} fill="currentColor" /></span>{L(lang, copy.watch)}</a>
          </div>
        </div>
        <div className="hero-portrait reveal-up" style={{ "--delay": "120ms" } as CSSProperties}>
          <div className="portrait-orbit orbit-one" /><div className="portrait-orbit orbit-two" />
          <div className="portrait-card"><img src={storage.profile} alt={L(lang, copy.identity)} /><div className="portrait-gradient" /><div className="portrait-label"><span>{L(lang, copy.archiveLabel)}</span><strong>01 / 11</strong></div><div className="portrait-caption"><span>{L(lang, copy.identity)}</span><small>AI TOOLS / PORTFOLIO</small></div></div>
          <div className="vertical-note">LEARNING · EXPERIMENTATION · CREATION</div>
        </div>
      </div>
      <div className="hero-footer"><span className="scroll-cue"><ChevronDown size={16} />{L(lang, copy.scroll)}</span><div className="hero-rule" /><span className="hero-coordinate">32°33′N / 35°51′E</span></div>
    </section>
  );
}

function Stats({ lang }: { lang: Lang }) {
  const copy = useCopy(lang);
  return <div className="stats-grid">{copy.stats.map((stat: { value: string; ar: string; en: string }, index: number) => <div className="stat" key={stat.value}><span className="stat-index">0{index + 1}</span><strong>{stat.value}</strong><span>{lang === "ar" ? stat.ar : stat.en}</span></div>)}</div>;
}

function Transformation({ lang }: { lang: Lang }) {
  const copy = useCopy(lang);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>([]);
  useEffect(() => { const saved = localStorage.getItem("ai-portfolio-comments"); if (saved) setComments(JSON.parse(saved)); }, []);
  const submitComment = () => { if (!comment.trim()) return; const next = [comment.trim(), ...comments]; setComments(next); localStorage.setItem("ai-portfolio-comments", JSON.stringify(next)); setComment(""); };
  return (
    <section className="transformation-section" id="transformation">
      <div className="section-intro transformation-intro reveal-up"><span className="section-number">02</span><div className="eyebrow"><span className="eyebrow-dot orange" />{L(lang, copy.transformationEyebrow)}</div><h2>{L(lang, copy.transformationTitle)}</h2><p>{L(lang, copy.transformationBody)}</p><div className="phase-list">{copy.phases.map((phase: { ar: string; en: string }, index: number) => <div className={index === 0 || index === 4 ? "phase edge" : "phase"} key={phase.en}><span>0{index + 1}</span><b>{L(lang, phase)}</b></div>)}</div></div>
      <div className="transformation-visual reveal-up" style={{ "--delay": "100ms" } as CSSProperties}>
        <div className="video-frame"><video controls playsInline poster={storage.transPoster} src={storage.transVideo} aria-label={lang === "ar" ? "فيديو كيف غيّر AI طريقة العمل؟" : "How did AI change the way we work? video"} /><div className="video-corner"><span>BEFORE / AFTER</span><span>INTERACTIVE FILM</span></div></div>
        <div className="film-controls"><button className={liked ? "reaction active" : "reaction"} onClick={() => setLiked(!liked)}><Heart size={16} fill={liked ? "currentColor" : "none"} />{L(lang, copy.like)}</button><span className="reaction-count">{liked ? "01" : "00"}</span><span className="film-divider" /><span className="comment-count"><MessageCircle size={16} />{comments.length.toString().padStart(2, "0")} {L(lang, copy.comments)}</span></div>
        <div className="comment-box"><input value={comment} onChange={(event) => setComment(event.target.value)} onKeyDown={(event) => event.key === "Enter" && submitComment()} placeholder={L(lang, copy.commentPlaceholder)} aria-label={L(lang, copy.commentPlaceholder)} /><button onClick={submitComment}><ArrowUpRight size={16} />{L(lang, copy.send)}</button></div>
        {comments.length > 0 && <div className="comment-list">{comments.slice(0, 2).map((item, index) => <div className="comment-item" key={`${item}-${index}`}><span>0{index + 1}</span>{item}</div>)}</div>}
      </div>
    </section>
  );
}

function ProjectCard({ project, lang, sectionIndex }: { project: Project; lang: Lang; sectionIndex: string }) {
  const title = L(lang, project.title);
  const description = L(lang, project.description);
  const typeLabel = L(lang, project.tool || { ar: "عمل", en: "Work" });
  const action = project.cta ? L(lang, project.cta) : project.type === "doc" ? (lang === "ar" ? "افتح المصدر" : "Open source") : project.type === "html" ? (lang === "ar" ? "افتح التجربة التفاعلية" : "Open Experience") : undefined;
  return (
    <article className={`project-card type-${project.type} ${project.featured ? "featured" : ""}`}>
      <div className="project-media">
        {project.type === "image" && project.source && <img src={project.source} alt={title} loading="lazy" />}
        {project.type === "video" && project.source && <video controls playsInline preload="metadata" poster={project.poster} src={project.source} aria-label={title} />}
        {project.type === "audio" && <div className="audio-art"><div className="audio-orb"><AudioLines size={30} /></div><div className="equalizer">{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((bar) => <i key={bar} style={{ "--bar": `${bar % 4 + 2}` } as CSSProperties} />)}</div><span>SOUND / {sectionIndex}</span></div>}
        {project.type === "html" && project.id === "bead-game" && <div className="game-art game-beads" role="img" aria-label={lang === "ar" ? "صورة مصغرة للعبة رحلة الخرز" : "Thumbnail for the Bead Quest game"}><div className="game-art-grid" /><span className="bead bead-1" /><span className="bead bead-2" /><span className="bead bead-3" /><span className="bead bead-4" /><span className="bead bead-5" /><span className="bead bead-6" /><span className="bead bead-7" /><span className="bead bead-8" /><span className="bead-thread" /><div className="game-thumb-label"><Gamepad2 size={14} />{lang === "ar" ? "تحدي الخرز" : "BEAD QUEST"}</div></div>}
        {project.type === "html" && project.id === "fish-game" && <div className="game-art game-fish" role="img" aria-label={lang === "ar" ? "صورة مصغرة لسمكة ذهبية مصنوعة من الخرز للعبة سمكة مش بمكانها" : "Bead-crafted golden fish thumbnail for Fish Out of Place"}><img className="game-fish-image" src={storage.gameFish} alt="" /><div className="game-thumb-label"><Gamepad2 size={14} />{lang === "ar" ? "السمكة مش بمكانها" : "FISH OUT OF PLACE"}</div></div>}
        {project.type === "html" && project.id !== "bead-game" && project.id !== "fish-game" && project.poster && <div className="interactive-art"><img src={project.poster} alt="" /><div className="interactive-thumb-label"><Globe2 size={14} />{lang === "ar" ? "تجربة تعليمية" : "INTERACTIVE EXPERIENCE"}</div></div>}
        {project.type === "html" && project.id !== "bead-game" && project.id !== "fish-game" && !project.poster && <div className="html-art"><div className="html-window"><span /><span /><span /></div><Code2 size={44} /><strong>HTML</strong><small>{lang === "ar" ? "تجربة قابلة للتشغيل" : "Playable experience"}</small></div>}
        {project.type === "doc" && project.poster && <div className="presentation-art"><img src={project.poster} alt="" /><div className="presentation-thumb-label"><Presentation size={14} />{lang === "ar" ? "عرض تعليمي" : "EDUCATIONAL PRESENTATION"}</div></div>}
        {project.type === "doc" && !project.poster && <div className="doc-art"><div className="doc-fold"><FileText size={34} /><span>{project.tool?.en === "PDF" ? "PDF" : "PPTX"}</span></div><span>{lang === "ar" ? "ملف أصلي" : "Original file"}</span></div>}
        <div className="media-index">{sectionIndex} / {project.type.toUpperCase()}</div>
      </div>
      <div className="project-content"><div className="project-meta"><span>{iconFor(project.type)}{typeLabel}</span>{project.featured && <span className="featured-pill"><Sparkles size={13} />{lang === "ar" ? "مختار" : "Featured"}</span>}</div><h3>{title}</h3><p>{description}</p><div className="project-footer">{action && (project.drive || project.source) && <a className="project-link" href={project.drive || project.source} target="_blank" rel="noreferrer">{action}<MoveUpRight size={15} /></a>}{project.type === "audio" && project.id === "courtyard" && project.source && <audio controls preload="none" src={project.source} aria-label={title} />}</div></div>
    </article>
  );
}

function CategoryVisual({ section, lang }: { section: PortfolioSection; lang: Lang }) {
  const lead = section.projects[0];
  const source = lead?.type === "image" ? lead.source : lead?.type === "video" ? lead.poster : undefined;
  return source ? <img src={source} alt={L(lang, section.title)} loading="lazy" /> : <div className={`category-fallback category-${lead?.type || "doc"}`}><span>{iconFor(lead?.type || "doc")}</span><strong>{lead?.type === "html" ? "HTML" : lead?.type === "audio" ? "AUDIO" : "PDF"}</strong></div>;
}

const categoryIcon = (id: string) => {
  if (id === "timelapse" || id === "creative-video") return <Play size={20} />;
  if (id === "audio") return <AudioLines size={20} />;
  if (id === "games") return <Gamepad2 size={20} />;
  if (id === "ads") return <Sparkles size={20} />;
  if (id === "images" || id === "surreal") return <ImageIcon size={20} />;
  if (id === "presentations") return <Presentation size={20} />;
  if (id === "cards") return <Layers3 size={20} />;
  if (id === "interactive") return <Code2 size={20} />;
  return <BookOpen size={20} />;
};

const groupLabel = (id: string) => {
  if (["timelapse", "ads", "creative-video"].includes(id)) return { ar: "الفيديوهات", en: "Videos" };
  if (id === "audio") return { ar: "الصوت والموسيقى", en: "Audio & music" };
  if (["images", "surreal", "cards"].includes(id)) return { ar: "الصور والتصاميم", en: "Images & designs" };
  if (id === "books") return { ar: "الكتب والقصص", en: "Books & stories" };
  if (["games", "interactive"].includes(id)) return { ar: "التجارب التفاعلية والألعاب", en: "Interactive experiences & games" };
  return { ar: "المشاريع والأعمال الأخرى", en: "Projects & other works" };
};

function WorksSection({ lang }: { lang: Lang }) {
  const copy = useCopy(lang);
  const jump = (section: string) => document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" });
  return (
    <section className="work-section" id="work">
      <div className="work-heading reveal-up"><div className="section-intro"><span className="section-number">03</span><div className="eyebrow"><span className="eyebrow-dot orange" />{L(lang, copy.workEyebrow)}</div><h2>{L(lang, copy.workTitle)}</h2><p>{L(lang, copy.workBody)}</p></div><div className="archive-stamp"><Layers3 size={21} /><span>AI<br />PORTFOLIO</span><b>2026</b></div></div>
      <div className="works-board-wrap reveal-up" style={{ "--delay": "90ms" } as CSSProperties}>
        <div className="archive-board works-board">
          <div className="archive-board-header"><span className="archive-board-kicker">AI / 03—11</span><strong>AI WORKS</strong><span className="archive-board-note">{lang === "ar" ? "أعمال حقيقية · معاينة مختارة" : "REAL WORKS · CURATED PREVIEW"}</span></div>
          <div className="archive-board-grid">
            {sections.map((section, index) => <button key={section.id} className={`archive-piece folder-piece piece-${index + 1} accent-${section.accent}`} onClick={() => jump(section.id)} aria-label={`${L(lang, section.title)} — ${lang === "ar" ? "افتح المجلد" : "open folder"}`}>
              <span className="piece-pin" /><span className="piece-tape" /><span className="folder-ai-mark"><b>AI</b><i /></span><span className="folder-icon">{categoryIcon(section.id)}</span><strong className="folder-title">{L(lang, section.title)}</strong><span className="folder-meta">AI / {section.index}</span><span className="folder-count">{String(section.projects.length).padStart(2, "0")} {lang === "ar" ? "أعمال" : "works"}</span><span className="piece-caption"><b>{String(index + 1).padStart(2, "0")}</b>{lang === "ar" ? "فتح المجموعة" : "OPEN FOLDER"}</span>
            </button>)}
          </div>
          <div className="archive-board-footer"><span>{lang === "ar" ? "معاينة بصرية من مجموعات الأعمال" : "A visual preview of the work groups"}</span><span>WORKS / 03</span></div>
        </div>
      </div>
      <div className="archive-grid">{sections.map((section) => <section className={`archive-section accent-${section.accent}`} id={section.id} key={section.id}><div className="archive-section-header"><div><span className="work-group-label">{L(lang, groupLabel(section.id))}</span><span className="archive-number">{section.index}</span><h3>{L(lang, section.title)}</h3></div><p>{L(lang, section.description)}</p><span className="section-count">{String(section.projects.length).padStart(2, "0")} {lang === "ar" ? "أعمال" : "works"}</span></div><div className="projects-grid">{section.projects.map((project) => <ProjectCard key={project.id} project={project} lang={lang} sectionIndex={section.index} />)}</div></section>)}</div>
    </section>
  );
}

function Footer({ lang }: { lang: Lang }) {
  const copy = useCopy(lang);
  return <footer className="site-footer"><div className="footer-top"><div className="footer-brand"><a className="brand-mark" href="#home"><span>AI</span><b>/</b><i>PF</i></a><p>{L(lang, copy.footer)}</p></div><div className="footer-quote">{lang === "ar" ? "كل أداة فتحت احتمالاً.\nوكل تجربة تركت أثراً." : "Every tool opened a possibility.\nEvery experiment left a trace."}</div><a className="back-top" href="#home"><ArrowUpRight size={18} />{lang === "ar" ? "العودة إلى الأعلى" : "Back to top"}</a></div><div className="footer-bottom"><span>© 2026 · {L(lang, copy.identity)}</span><span>{L(lang, copy.sourceNote)}</span><span>AI / 01—11</span></div></footer>;
}

export default function Home() {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem("ai-portfolio-language") as Lang) || "ar");
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { document.documentElement.lang = lang; document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"; localStorage.setItem("ai-portfolio-language", lang); window.scrollTo({ top: 0, behavior: "smooth" }); }, [lang]);
  return <div className="site-shell"><Header lang={lang} setLang={setLang} open={menuOpen} setOpen={setMenuOpen} /><main><Hero lang={lang} /><Stats lang={lang} /><Transformation lang={lang} /><WorksSection lang={lang} /></main><Footer lang={lang} /></div>;
}
