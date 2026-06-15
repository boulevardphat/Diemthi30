import React, { useState, useMemo, useEffect } from "react";
import { 
  motion, 
  AnimatePresence 
} from "motion/react";
import { 
  AlertCircle, 
  HelpCircle, 
  ChevronDown,
  RotateCcw,
  ArrowUp,
  ArrowDown,
  Trash2,
  Plus,
  Edit2,
  Download,
  Upload,
  Check,
  Award,
  BookOpen,
  GripVertical
} from "lucide-react";
import { UNIVERSITIES_DB, getLogoFallbackLetters } from "./data/universities";

// Canonical mapping of Vietnamese high school subjects (including new languages & science courses)
const ELECTIVE_SUBJECTS = [
  { id: "anh", name: "Tiếng Anh" },
  { id: "ly", name: "Vật lí" },
  { id: "hoa", name: "Hóa học" },
  { id: "sinh", name: "Sinh học" },
  { id: "su", name: "Lịch sử" },
  { id: "dia", name: "Địa lí" },
  { id: "gdktpl", name: "GDKTPL" },
  { id: "tin", name: "Tin học" },
  { id: "cn_cn", name: "Công nghệ công nghiệp" },
  { id: "cn_nn", name: "Công nghệ nông nghiệp" },
  { id: "nga", name: "Tiếng Nga" },
  { id: "phap", name: "Tiếng Pháp" },
  { id: "trung", name: "Tiếng Trung" },
  { id: "duc", name: "Tiếng Đức" },
  { id: "nhat", name: "Tiếng Nhật" },
  { id: "han", name: "Tiếng Hàn" }
];

// Mapping subject IDs to exact lowercased Vietnamese subject values for set matching
const SUBJECT_CANON_MAP: Record<string, string> = {
  toan: "toán",
  van: "ngữ văn",
  anh: "tiếng anh",
  ly: "vật lí",
  hoa: "hóa học",
  sinh: "sinh học",
  su: "lịch sử",
  dia: "địa lí",
  gdktpl: "gdktpl",
  tin: "tin học",
  cn_cn: "công nghệ công nghiệp",
  cn_nn: "công nghệ nông nghiệp",
  nga: "tiếng nga",
  phap: "tiếng pháp",
  trung: "tiếng trung",
  duc: "tiếng đức",
  nhat: "tiếng nhật",
  han: "tiếng hàn"
};

interface BlockDefinition {
  code: string;
  fullName: string;
  subjects: string[];
  type: "A" | "B" | "C" | "D" | "X" | "Y";
}

// Full, comprehensive list of Vietnamese admission blocks grouped under standard categories (excluding performance-art elements)
const ALL_BLOCKS: BlockDefinition[] = [
  // Khối A
  { code: "A00", subjects: ["toán", "vật lí", "hóa học"], fullName: "Toán, Vật lí, Hóa học", type: "A" },
  { code: "A01", subjects: ["toán", "vật lí", "tiếng anh"], fullName: "Toán, Vật lí, Tiếng Anh", type: "A" },
  { code: "A02", subjects: ["toán", "vật lí", "sinh học"], fullName: "Toán, Vật lí, Sinh học", type: "A" },
  { code: "A03", subjects: ["toán", "vật lí", "lịch sử"], fullName: "Toán, Vật lí, Lịch sử", type: "A" },
  { code: "A04", subjects: ["toán", "vật lí", "địa lí"], fullName: "Toán, Vật lí, Địa lí", type: "A" },
  { code: "A05", subjects: ["toán", "hóa học", "lịch sử"], fullName: "Toán, Hóa học, Lịch sử", type: "A" },
  { code: "A06", subjects: ["toán", "hóa học", "địa lí"], fullName: "Toán, Hóa học, Địa lí", type: "A" },
  { code: "A07", subjects: ["toán", "lịch sử", "địa lí"], fullName: "Toán, Lịch sử, Địa lí", type: "A" },

  // Khối B
  { code: "B00", subjects: ["toán", "hóa học", "sinh học"], fullName: "Toán, Hóa học, Sinh học", type: "B" },
  { code: "B01", subjects: ["toán", "lịch sử", "sinh học"], fullName: "Toán, Lịch sử, Sinh học", type: "B" },
  { code: "B02", subjects: ["toán", "sinh học", "địa lí"], fullName: "Toán, Sinh học, Địa lí", type: "B" },
  { code: "B03", subjects: ["toán", "sinh học", "ngữ văn"], fullName: "Toán, Sinh học, Ngữ văn", type: "B" },
  { code: "B08", subjects: ["toán", "sinh học", "tiếng anh"], fullName: "Toán, Sinh học, Tiếng Anh", type: "B" },
  { code: "B0C", subjects: ["toán", "hóa học", "công nghệ công nghiệp"], fullName: "Toán, Hóa học, Công nghệ công nghiệp", type: "B" },

  // Khối C
  { code: "C00", subjects: ["ngữ văn", "lịch sử", "địa lí"], fullName: "Ngữ văn, Lịch sử, Địa lí", type: "C" },
  { code: "C01", subjects: ["ngữ văn", "toán", "vật lí"], fullName: "Ngữ văn, Toán, Vật lí", type: "C" },
  { code: "C02", subjects: ["ngữ văn", "toán", "hóa học"], fullName: "Ngữ văn, Toán, Hóa học", type: "C" },
  { code: "C03", subjects: ["ngữ văn", "toán", "lịch sử"], fullName: "Ngữ văn, Toán, Lịch sử", type: "C" },
  { code: "C04", subjects: ["ngữ văn", "toán", "địa lí"], fullName: "Ngữ văn, Toán, Địa lí", type: "C" },
  { code: "C05", subjects: ["ngữ văn", "vật lí", "hóa học"], fullName: "Ngữ văn, Vật lí, Hóa học", type: "C" },
  { code: "C06", subjects: ["ngữ văn", "vật lí", "sinh học"], fullName: "Ngữ văn, Vật lí, Sinh học", type: "C" },
  { code: "C07", subjects: ["ngữ văn", "lịch sử", "vật lí"], fullName: "Ngữ văn, Lịch sử, Vật lí", type: "C" },
  { code: "C08", subjects: ["ngữ văn", "hóa học", "sinh học"], fullName: "Ngữ văn, Hóa học, Sinh học", type: "C" },
  { code: "C09", subjects: ["ngữ văn", "địa lí", "vật lí"], fullName: "Ngữ văn, Địa lí, Vật lí", type: "C" },
  { code: "C10", subjects: ["ngữ văn", "lịch sử", "hóa học"], fullName: "Ngữ văn, Lịch sử, Hóa học", type: "C" },
  { code: "C11", subjects: ["ngữ văn", "địa lí", "hóa học"], fullName: "Ngữ văn, Địa lí, Hóa học", type: "C" },
  { code: "C12", subjects: ["ngữ văn", "lịch sử", "sinh học"], fullName: "Ngữ văn, Lịch sử, Sinh học", type: "C" },
  { code: "C13", subjects: ["ngữ văn", "sinh học", "địa lí"], fullName: "Ngữ văn, Sinh học, Địa lí", type: "C" },

  // Khối D
  { code: "D01", subjects: ["ngữ văn", "toán", "tiếng anh"], fullName: "Ngữ văn, Toán, Tiếng Anh", type: "D" },
  { code: "D02", subjects: ["ngữ văn", "toán", "tiếng nga"], fullName: "Ngữ văn, Toán, Tiếng Nga", type: "D" },
  { code: "D03", subjects: ["ngữ văn", "toán", "tiếng pháp"], fullName: "Ngữ văn, Toán, Tiếng Pháp", type: "D" },
  { code: "D04", subjects: ["ngữ văn", "toán", "tiếng trung"], fullName: "Ngữ văn, Toán, Tiếng Trung", type: "D" },
  { code: "D05", subjects: ["ngữ văn", "toán", "tiếng đức"], fullName: "Ngữ văn, Toán, Tiếng Đức", type: "D" },
  { code: "D06", subjects: ["ngữ văn", "toán", "tiếng nhật"], fullName: "Ngữ văn, Toán, Tiếng Nhật", type: "D" },
  { code: "D07", subjects: ["toán", "hóa học", "tiếng anh"], fullName: "Toán, Hóa học, Tiếng Anh", type: "D" },
  { code: "D08", subjects: ["toán", "sinh học", "tiếng anh"], fullName: "Toán, Sinh học, Tiếng Anh", type: "D" },
  { code: "D09", subjects: ["toán", "lịch sử", "tiếng anh"], fullName: "Toán, Lịch sử, Tiếng Anh", type: "D" },
  { code: "D10", subjects: ["toán", "địa lí", "tiếng anh"], fullName: "Toán, Địa lí, Tiếng Anh", type: "D" },
  { code: "D11", subjects: ["ngữ văn", "vật lí", "tiếng anh"], fullName: "Ngữ văn, Vật lí, Tiếng Anh", type: "D" },
  { code: "D12", subjects: ["ngữ văn", "hóa học", "tiếng anh"], fullName: "Ngữ văn, Hóa học, Tiếng Anh", type: "D" },
  { code: "D13", subjects: ["ngữ văn", "sinh học", "tiếng anh"], fullName: "Ngữ văn, Sinh học, Tiếng Anh", type: "D" },
  { code: "D14", subjects: ["ngữ văn", "lịch sử", "tiếng anh"], fullName: "Ngữ văn, Lịch sử, Tiếng Anh", type: "D" },
  { code: "D15", subjects: ["ngữ văn", "địa lí", "tiếng anh"], fullName: "Ngữ văn, Địa lí, Tiếng Anh", type: "D" },
  { code: "D16", subjects: ["toán", "địa lí", "tiếng đức"], fullName: "Toán, Địa lí, Tiếng Đức", type: "D" },
  { code: "D18", subjects: ["toán", "địa lí", "tiếng nhật"], fullName: "Toán, Địa lí, Tiếng Nhật", type: "D" },
  { code: "D19", subjects: ["toán", "địa lí", "tiếng pháp"], fullName: "Toán, Địa lí, Tiếng Pháp", type: "D" },
  { code: "D20", subjects: ["toán", "địa lí", "tiếng trung"], fullName: "Toán, Địa lí, Tiếng Trung", type: "D" },
  { code: "D21", subjects: ["toán", "hóa học", "tiếng đức"], fullName: "Toán, Hóa học, Tiếng Đức", type: "D" },
  { code: "D22", subjects: ["toán", "hóa học", "tiếng nga"], fullName: "Toán, Hóa học, Tiếng Nga", type: "D" },
  { code: "D23", subjects: ["toán", "hóa học", "tiếng nhật"], fullName: "Toán, Hóa học, Tiếng Nhật", type: "D" },
  { code: "D24", subjects: ["toán", "hóa học", "tiếng pháp"], fullName: "Toán, Hóa học, Tiếng Pháp", type: "D" },
  { code: "D25", subjects: ["toán", "hóa học", "tiếng trung"], fullName: "Toán, Hóa học, Tiếng Trung", type: "D" },
  { code: "D26", subjects: ["toán", "vật lí", "tiếng đức"], fullName: "Toán, Vật lí, Tiếng Đức", type: "D" },
  { code: "D27", subjects: ["toán", "vật lí", "tiếng nga"], fullName: "Toán, Vật lí, Tiếng Nga", type: "D" },
  { code: "D28", subjects: ["toán", "vật lí", "tiếng nhật"], fullName: "Toán, Vật lí, Tiếng Nhật", type: "D" },
  { code: "D29", subjects: ["toán", "vật lí", "tiếng pháp"], fullName: "Toán, Vật lí, Tiếng Pháp", type: "D" },
  { code: "D30", subjects: ["toán", "vật lí", "tiếng trung"], fullName: "Toán, Vật lí, Tiếng Trung", type: "D" },
  { code: "D31", subjects: ["toán", "sinh học", "tiếng đức"], fullName: "Toán, Sinh học, Tiếng Đức", type: "D" },
  { code: "D32", subjects: ["toán", "sinh học", "tiếng nga"], fullName: "Toán, Sinh học, Tiếng Nga", type: "D" },
  { code: "D33", subjects: ["toán", "sinh học", "tiếng nhật"], fullName: "Toán, Sinh học, Tiếng Nhật", type: "D" },
  { code: "D34", subjects: ["toán", "sinh học", "tiếng pháp"], fullName: "Toán, Sinh học, Tiếng Pháp", type: "D" },
  { code: "D35", subjects: ["toán", "sinh học", "tiếng trung"], fullName: "Toán, Sinh học, Tiếng Trung", type: "D" },
  { code: "D36", subjects: ["toán", "lịch sử", "tiếng đức"], fullName: "Toán, Lịch sử, Tiếng Đức", type: "D" },
  { code: "D37", subjects: ["toán", "lịch sử", "tiếng nga"], fullName: "Toán, Lịch sử, Tiếng Nga", type: "D" },
  { code: "D38", subjects: ["toán", "lịch sử", "tiếng nhật"], fullName: "Toán, Lịch sử, Tiếng Nhật", type: "D" },
  { code: "D39", subjects: ["toán", "lịch sử", "tiếng pháp"], fullName: "Toán, Lịch sử, Tiếng Pháp", type: "D" },
  { code: "D40", subjects: ["toán", "lịch sử", "tiếng trung"], fullName: "Toán, Lịch sử, Tiếng Trung", type: "D" },
  { code: "D41", subjects: ["ngữ văn", "địa lí", "tiếng đức"], fullName: "Ngữ văn, Địa lí, Tiếng Đức", type: "D" },
  { code: "D42", subjects: ["ngữ văn", "địa lí", "tiếng nga"], fullName: "Ngữ văn, Địa lí, Tiếng Nga", type: "D" },
  { code: "D43", subjects: ["ngữ văn", "địa lí", "tiếng nhật"], fullName: "Ngữ văn, Địa lí, Tiếng Nhật", type: "D" },
  { code: "D44", subjects: ["ngữ văn", "địa lí", "tiếng pháp"], fullName: "Ngữ văn, Địa lí, Tiếng Pháp", type: "D" },
  { code: "D45", subjects: ["ngữ văn", "địa lí", "tiếng trung"], fullName: "Ngữ văn, Địa lí, Tiếng Trung", type: "D" },
  { code: "D50", subjects: ["ngữ văn", "hóa học", "tiếng trung"], fullName: "Ngữ văn, Hóa học, Tiếng Trung", type: "D" },
  { code: "D55", subjects: ["ngữ văn", "vật lí", "tiếng trung"], fullName: "Ngữ văn, Vật lí, Tiếng Trung", type: "D" },
  { code: "D61", subjects: ["ngữ văn", "lịch sử", "tiếng đức"], fullName: "Ngữ văn, Lịch sử, Tiếng Đức", type: "D" },
  { code: "D62", subjects: ["ngữ văn", "lịch sử", "tiếng nga"], fullName: "Ngữ văn, Lịch sử, Tiếng Nga", type: "D" },
  { code: "D63", subjects: ["ngữ văn", "lịch sử", "tiếng nhật"], fullName: "Ngữ văn, Lịch sử, Tiếng Nhật", type: "D" },
  { code: "D64", subjects: ["ngữ văn", "lịch sử", "tiếng pháp"], fullName: "Ngữ văn, Lịch sử, Tiếng Pháp", type: "D" },
  { code: "D65", subjects: ["ngữ văn", "lịch sử", "tiếng trung"], fullName: "Ngữ văn, Lịch sử, Tiếng Trung", type: "D" },
  { code: "D66", subjects: ["ngữ văn", "gdktpl", "tiếng anh"], fullName: "Ngữ văn, GDKTPL, Tiếng Anh", type: "D" },
  { code: "D68", subjects: ["ngữ văn", "gdktpl", "tiếng nga"], fullName: "Ngữ văn, GDKTPL, Tiếng Nga", type: "D" },
  { code: "D70", subjects: ["ngữ văn", "gdktpl", "tiếng pháp"], fullName: "Ngữ văn, GDKTPL, Tiếng Pháp", type: "D" },
  { code: "D71", subjects: ["ngữ văn", "gdktpl", "tiếng trung"], fullName: "Ngữ văn, GDKTPL, Tiếng Trung", type: "D" },
  { code: "D89", subjects: ["toán", "gdktpl", "tiếng trung"], fullName: "Toán, GDKTPL, Tiếng Trung", type: "D" },

  // Khối X (Tổ hợp mới của GDKTPL, Công nghệ, Tin học theo GDPT 2018)
  { code: "X70", subjects: ["ngữ văn", "lịch sử", "gdktpl"], fullName: "Ngữ văn, Lịch sử, GDKTPL", type: "X" },
  { code: "X01", subjects: ["ngữ văn", "toán", "gdktpl"], fullName: "Ngữ văn, Toán, GDKTPL", type: "X" },
  { code: "X74", subjects: ["ngữ văn", "địa lí", "gdktpl"], fullName: "Ngữ văn, Địa lí, GDKTPL", type: "X" },
  { code: "X78", subjects: ["ngữ văn", "gdktpl", "tiếng anh"], fullName: "Ngữ văn, GDKTPL, Tiếng Anh", type: "X" },
  { code: "X21", subjects: ["toán", "địa lí", "gdktpl"], fullName: "Toán, Địa lí, GDKTPL", type: "X" },
  { code: "X25", subjects: ["toán", "tiếng anh", "gdktpl"], fullName: "Toán, Tiếng Anh, GDKTPL", type: "X" },
  { code: "X13", subjects: ["toán", "sinh học", "gdktpl"], fullName: "Toán, Sinh học, GDKTPL", type: "X" },
  { code: "X05", subjects: ["toán", "vật lí", "gdktpl"], fullName: "Toán, Vật lí, GDKTPL", type: "X" },
  { code: "X26", subjects: ["toán", "tiếng anh", "tin học"], fullName: "Toán, Tiếng Anh, Tin học", type: "X" },
  { code: "X17", subjects: ["toán", "lịch sử", "gdktpl"], fullName: "Toán, Lịch sử, GDKTPL", type: "X" },
  { code: "X09", subjects: ["toán", "hóa học", "gdktpl"], fullName: "Toán, Hóa học, GDKTPL", type: "X" },
  { code: "X23", subjects: ["toán", "địa lí", "công nghệ công nghiệp"], fullName: "Toán, Địa lí, Công nghệ công nghiệp", type: "X" },
  { code: "X24", subjects: ["toán", "địa lí", "công nghệ nông nghiệp"], fullName: "Toán, Địa lí, Công nghệ nông nghiệp", type: "X" },
  { code: "X58", subjects: ["ngữ văn", "vật lí", "gdktpl"], fullName: "Ngữ văn, Vật lí, GDKTPL", type: "X" },
  { code: "X94", subjects: ["ngữ văn", "gdktpl", "tiếng đức"], fullName: "Ngữ văn, GDKTPL, Tiếng Đức", type: "X" },
  { code: "X98", subjects: ["ngữ văn", "gdktpl", "tiếng nhật"], fullName: "Ngữ văn, GDKTPL, Tiếng Nhật", type: "X" },
  { code: "X41", subjects: ["toán", "gdktpl", "tiếng đức"], fullName: "Toán, GDKTPL, Tiếng Đức", type: "X" },
  { code: "X29", subjects: ["toán", "gdktpl", "tiếng nga"], fullName: "Toán, GDKTPL, Tiếng Nga", type: "X" },
  { code: "X62", subjects: ["ngữ văn", "hóa học", "gdktpl"], fullName: "Ngữ văn, Hóa học, GDKTPL", type: "X" },
  { code: "X02", subjects: ["toán", "ngữ văn", "tin học"], fullName: "Toán, Ngữ văn, Tin học", type: "X" },
  { code: "X06", subjects: ["toán", "vật lí", "tin học"], fullName: "Toán, Vật lí, Tin học", type: "X" },
  { code: "X08", subjects: ["toán", "vật lí", "công nghệ nông nghiệp"], fullName: "Toán, Vật lí, Công nghệ nông nghiệp", type: "X" },
  { code: "X07", subjects: ["toán", "vật lí", "công nghệ công nghiệp"], fullName: "Toán, Vật lí, Công nghệ công nghiệp", type: "X" },
  { code: "X11", subjects: ["toán", "hóa học", "công nghệ công nghiệp"], fullName: "Toán, Hóa học, Công nghệ công nghiệp", type: "X" },
  { code: "X28", subjects: ["toán", "tiếng anh", "công nghệ nông nghiệp"], fullName: "Toán, Tiếng Anh, Công nghệ nông nghiệp", type: "X" },
  { code: "X27", subjects: ["toán", "tiếng anh", "công nghệ công nghiệp"], fullName: "Toán, Tiếng Anh, Công nghệ công nghiệp", type: "X" },
  { code: "X12", subjects: ["toán", "hóa học", "công nghệ nông nghiệp"], fullName: "Toán, Hóa học, Công nghệ nông nghiệp", type: "X" },
  { code: "X15", subjects: ["toán", "sinh học", "công nghệ công nghiệp"], fullName: "Toán, Sinh học, Công nghệ công nghiệp", type: "X" },
  { code: "X14", subjects: ["toán", "sinh học", "tin học"], fullName: "Toán, Sinh học, Tin học", type: "X" },
  { code: "X16", subjects: ["toán", "sinh học", "công nghệ nông nghiệp"], fullName: "Toán, Sinh học, Công nghệ nông nghiệp", type: "X" },
  { code: "X10", subjects: ["toán", "hóa học", "tin học"], fullName: "Toán, Hóa học, Tin học", type: "X" },
  { code: "X75", subjects: ["ngữ văn", "địa lí", "tin học"], fullName: "Ngữ văn, Địa lí, Tin học", type: "X" },
  { code: "X46", subjects: ["toán", "tiếng nhật", "tin học"], fullName: "Toán, Tiếng Nhật, Tin học", type: "X" },
  { code: "X22", subjects: ["toán", "địa lí", "tin học"], fullName: "Toán, Địa lí, Tin học", type: "X" },
  { code: "X03", subjects: ["toán", "ngữ văn", "công nghệ công nghiệp"], fullName: "Toán, Ngữ văn, Công nghệ công nghiệp", type: "X" },
  { code: "X79", subjects: ["ngữ văn", "tiếng anh", "tin học"], fullName: "Ngữ văn, Tiếng Anh, Tin học", type: "X" },
  { code: "X04", subjects: ["toán", "ngữ văn", "công nghệ nông nghiệp"], fullName: "Toán, Ngữ văn, Công nghệ nông nghiệp", type: "X" },
  { code: "X71", subjects: ["ngữ văn", "lịch sử", "tin học"], fullName: "Ngữ văn, Lịch sử, Tin học", type: "X" },
  { code: "X53", subjects: ["toán", "gdktpl", "tin học"], fullName: "Toán, GDKTPL, Tin học", type: "X" },
  { code: "X86", subjects: ["ngữ văn", "gdktpl", "tiếng pháp"], fullName: "Ngữ văn, GDKTPL, Tiếng Pháp", type: "X" },
  { code: "X45", subjects: ["toán", "gdktpl", "tiếng nhật"], fullName: "Toán, GDKTPL, Tiếng Nhật", type: "X" },
  { code: "X33", subjects: ["toán", "gdktpl", "tiếng pháp"], fullName: "Toán, GDKTPL, Tiếng Pháp", type: "X" },
  { code: "X90", subjects: ["ngữ văn", "gdktpl", "tiếng trung"], fullName: "Ngữ văn, GDKTPL, Tiếng Trung", type: "X" },
  { code: "X54", subjects: ["toán", "gdktpl", "công nghệ công nghiệp"], fullName: "Toán, GDKTPL, Công nghệ công nghiệp", type: "X" },
  { code: "X66", subjects: ["ngữ văn", "sinh học", "gdktpl"], fullName: "Ngữ văn, Sinh học, GDKTPL", type: "X" },
  { code: "X55", subjects: ["toán", "gdktpl", "công nghệ nông nghiệp"], fullName: "Toán, GDKTPL, Công nghệ nông nghiệp", type: "X" },
  { code: "X56", subjects: ["toán", "tin học", "công nghệ công nghiệp"], fullName: "Toán, Tin học, Công nghệ công nghiệp", type: "X" },
  { code: "X57", subjects: ["toán", "tin học", "công nghệ nông nghiệp"], fullName: "Toán, Tin học, Công nghệ nông nghiệp", type: "X" },
  { code: "X19", subjects: ["toán", "lịch sử", "công nghệ công nghiệp"], fullName: "Toán, Lịch sử, Công nghệ công nghiệp", type: "X" },
  { code: "X20", subjects: ["toán", "lịch sử", "công nghệ nông nghiệp"], fullName: "Toán, Lịch sử, Công nghệ nông nghiệp", type: "X" },
  { code: "X18", subjects: ["toán", "lịch sử", "tin học"], fullName: "Toán, Lịch sử, Tin học", type: "X" },
  { code: "X76", subjects: ["ngữ văn", "địa lí", "công nghệ công nghiệp"], fullName: "Ngữ văn, Địa lí, Công nghệ công nghiệp", type: "X" },
  { code: "X77", subjects: ["ngữ văn", "địa lí", "công nghệ nông nghiệp"], fullName: "Ngữ văn, Địa lí, Công nghệ nông nghiệp", type: "X" },
  { code: "X64", subjects: ["ngữ văn", "hóa học", "công nghệ công nghiệp"], fullName: "Ngữ văn, Hóa học, Công nghệ công nghiệp", type: "X" },
  { code: "X65", subjects: ["ngữ văn", "hóa học", "công nghệ nông nghiệp"], fullName: "Ngữ văn, Hóa học, Công nghệ nông nghiệp", type: "X" },
  { code: "X63", subjects: ["ngữ văn", "hóa học", "tin học"], fullName: "Ngữ văn, Hóa học, Tin học", type: "X" },
  { code: "X72", subjects: ["ngữ văn", "lịch sử", "công nghệ công nghiệp"], fullName: "Ngữ văn, Lịch sử, Công nghệ công nghiệp", type: "X" },
  { code: "X73", subjects: ["ngữ văn", "lịch sử", "công nghệ nông nghiệp"], fullName: "Ngữ văn, Lịch sử, Công nghệ nông nghiệp", type: "X" },
  { code: "X68", subjects: ["ngữ văn", "sinh học", "công nghệ công nghiệp"], fullName: "Ngữ văn, Sinh học, Công nghệ công nghiệp", type: "X" },
  { code: "X69", subjects: ["ngữ văn", "sinh học", "công nghệ nông nghiệp"], fullName: "Ngữ văn, Sinh học, Công nghệ nông nghiệp", type: "X" },
  { code: "X67", subjects: ["ngữ văn", "sinh học", "tin học"], fullName: "Ngữ văn, Sinh học, Tin học", type: "X" },
  { code: "X80", subjects: ["ngữ văn", "tiếng anh", "công nghệ công nghiệp"], fullName: "Ngữ văn, Tiếng Anh, Công nghệ công nghiệp", type: "X" },
  { code: "X81", subjects: ["ngữ văn", "tiếng anh", "công nghệ nông nghiệp"], fullName: "Ngữ văn, Tiếng Anh, Công nghệ nông nghiệp", type: "X" },
  { code: "X60", subjects: ["ngữ văn", "vật lí", "công nghệ công nghiệp"], fullName: "Ngữ văn, Vật lí, Công nghệ công nghiệp", type: "X" },
  { code: "X61", subjects: ["ngữ văn", "vật lí", "công nghệ nông nghiệp"], fullName: "Ngữ văn, Vật lí, Công nghệ nông nghiệp", type: "X" },
  { code: "X59", subjects: ["ngữ văn", "vật lí", "tin học"], fullName: "Ngữ văn, Vật lí, Tin học", type: "X" },

  // Khối Y
  { code: "Y07", subjects: ["ngữ văn", "gdktpl", "tin học"], fullName: "Ngữ văn, GDKTPL, Tin học", type: "Y" },
  { code: "Y09", subjects: ["ngữ văn", "gdktpl", "công nghệ nông nghiệp"], fullName: "Ngữ văn, GDKTPL, Công nghệ nông nghiệp", type: "Y" },
  { code: "Y08", subjects: ["ngữ văn", "gdktpl", "công nghệ công nghiệp"], fullName: "Ngữ văn, GDKTPL, Công nghệ công nghiệp", type: "Y" },
  { code: "Y10", subjects: ["ngữ văn", "tin học", "công nghệ công nghiệp"], fullName: "Ngữ văn, Tin học, Công nghệ công nghiệp", type: "Y" },
  { code: "Y11", subjects: ["ngữ văn", "tin học", "công nghệ nông nghiệp"], fullName: "Ngữ văn, Tin học, Công nghệ nông nghiệp", type: "Y" },

  // Khối đặc thù bổ sung (AH, DD, DH)
  { code: "AH3", subjects: ["toán", "vật lí", "tiếng hàn"], fullName: "Toán, Vật lí, Tiếng Hàn", type: "A" },
  { code: "AH2", subjects: ["toán", "hóa học", "tiếng hàn"], fullName: "Toán, Hóa học, Tiếng Hàn", type: "A" },
  { code: "AH4", subjects: ["toán", "sinh học", "tiếng hàn"], fullName: "Toán, Sinh học, Tiếng Hàn", type: "A" },
  { code: "AH1", subjects: ["toán", "địa lí", "tiếng hàn"], fullName: "Toán, Địa lí, Tiếng Hàn", type: "A" },
  { code: "DD2", subjects: ["ngữ văn", "toán", "tiếng hàn"], fullName: "Ngữ văn, Toán, Tiếng Hàn", type: "D" },
  { code: "DH1", subjects: ["ngữ văn", "địa lí", "tiếng hàn"], fullName: "Ngữ văn, Địa lí, Tiếng Hàn", type: "D" },
  { code: "DH5", subjects: ["ngữ văn", "lịch sử", "tiếng hàn"], fullName: "Ngữ văn, Lịch sử, Tiếng Hàn", type: "D" }
];

// Elegant category coloration map - no background frames, purely colored text
const BLOCK_THEME_MAP = {
  A: {
    textColor: "text-[#2563EB]", // Cool Blue (Toán)
    subjectTheme: "Vùng Toán chủ đạo"
  },
  B: {
    textColor: "text-[#10B981]", // Emerald Green (Sinh học)
    subjectTheme: "Vùng Sinh chủ đạo"
  },
  C: {
    textColor: "text-[#EA580C]", // Warm Orange-Red (Ngữ văn)
    subjectTheme: "Vùng Văn chủ đạo"
  },
  D: {
    textColor: "text-[#8B5CF6]", // Royal Violet (Ngoại ngữ)
    subjectTheme: "Vùng Ngoại ngữ"
  },
  X: {
    textColor: "text-[#475569]", // Slate Gray (Sử, Địa, GDKTPL, Công nghệ, Tin học)
    subjectTheme: "Vùng Công nghệ & Tổ hợp mới"
  },
  Y: {
    textColor: "text-[#1E293B]", // Dark Slate for Y
    subjectTheme: "Khối Y mới"
  }
};

function getBlockSubjectsText(blockCode: string): string {
  if (!blockCode) return "";
  const b = ALL_BLOCKS.find(x => x.code.toUpperCase() === blockCode.toUpperCase());
  return b ? b.fullName : "";
}

function getBlockTheme(blockCode: string) {
  if (!blockCode) {
    return {
      textColor: "text-slate-600",
      bg: "bg-slate-50/50 border-slate-100",
      text: "text-slate-600",
      badge: "bg-slate-100 text-slate-700 border-slate-200",
      dot: "bg-slate-400",
      gradient: "from-slate-50 to-slate-100"
    };
  }
  const key = blockCode.charAt(0).toUpperCase();
  
  let bg = "bg-slate-50/50 border-slate-100";
  let text = "text-slate-600";
  let badge = "bg-slate-100 text-slate-700 border-slate-200";
  let dot = "bg-slate-400";
  let gradient = "from-slate-50 to-slate-100";

  if (key === "A") {
    bg = "bg-blue-50/40 border-blue-100/50";
    text = "text-[#2563EB]";
    badge = "bg-blue-50/60 text-[#2563EB] border-blue-100";
    dot = "bg-blue-500";
    gradient = "from-blue-50/30 to-blue-100/10";
  } else if (key === "B") {
    bg = "bg-emerald-50/40 border-emerald-100/50";
    text = "text-[#10B981]";
    badge = "bg-emerald-50/60 text-[#10B981] border-emerald-100";
    dot = "bg-emerald-500";
    gradient = "from-emerald-50/30 to-emerald-100/10";
  } else if (key === "C") {
    bg = "bg-orange-50/40 border-orange-100/50";
    text = "text-[#EA580C]";
    badge = "bg-orange-50/60 text-[#EA580C] border-orange-100";
    dot = "bg-orange-500";
    gradient = "from-orange-50/30 to-orange-100/10";
  } else if (key === "D") {
    bg = "bg-purple-50/40 border-purple-100/50";
    text = "text-[#8B5CF6]";
    badge = "bg-purple-100/80 text-[#8B5CF6] border-purple-200";
    dot = "bg-purple-500";
    gradient = "from-purple-50/30 to-purple-100/10";
  } else if (key === "Y") {
    bg = "bg-slate-800/10 border-slate-200";
    text = "text-[#1E293B]";
    badge = "bg-slate-100 text-[#1E293B] border-slate-250";
    dot = "bg-slate-900";
    gradient = "from-slate-100/30 to-slate-200/10";
  }

  return { bg, text, badge, dot, gradient };
}

interface SubjectState {
  id: string; // "toan" | "van" | "anh" | "ly" | etc.
  name: string;
  score: string;
  multiplier: string;
  isFixed: boolean;
}

export interface Aspiration {
  id: string;
  universityId: string; // e.g. "hust", "neu" ... or "custom"
  customUniversityName?: string;
  customUniversityCode?: string;
  majorCode: string;
  majorName: string;
  blockCode?: string; // legacy support (single block)
  blockCodes?: string[]; // support multiple block codes per aspiration
  previousYearCutoff?: string; // legacy support
  estimatedCutoff?: string; // user's 2026 estimated cutoff score
  blockScores?: { block: string; score: string }[]; // fully decoupled block scores
  originalMajorId?: string; // Support customizing major code of built-in majors
  scale?: string;
}

function UniversityLogo({ logoUrl, shortName, name }: { logoUrl: string; shortName: string; name: string }) {
  const [imageError, setImageError] = useState(false);
  const fallbackText = getLogoFallbackLetters(name || shortName);

  return (
    <div className="w-10 h-10 rounded-full bg-neutral-50 border border-neutral-100 flex items-center justify-center shrink-0 overflow-hidden select-none">
      {!imageError && logoUrl ? (
        <img
          src={logoUrl}
          alt={shortName}
          referrerPolicy="no-referrer"
          className="w-7 h-7 object-contain"
          onError={() => setImageError(true)}
        />
      ) : (
        <span className="text-[11px] font-bold font-mono tracking-tight text-neutral-500">
          {fallbackText}
        </span>
      )}
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<"calculator" | "aspirations">("calculator");
  
  const [aspirations, setAspirations] = useState<Aspiration[]>(() => {
    const saved = localStorage.getItem("diemthi30_aspirations");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error loading aspirations", e);
      }
    }
    return [];
  });

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const saveAspirationsList = (newList: Aspiration[]) => {
    setAspirations(newList);
    localStorage.setItem("diemthi30_aspirations", JSON.stringify(newList));
  };

  // Aspiration form input states
  const [targetUnivId, setTargetUnivId] = useState<string>("hust");
  const [customUnivName, setCustomUnivName] = useState<string>("");
  const [customUnivCode, setCustomUnivCode] = useState<string>("");
  
  const [targetMajorId, setTargetMajorId] = useState<string>("IT1");
  const [customMajorName, setCustomMajorName] = useState<string>("");
  const [customMajorCode, setCustomMajorCode] = useState<string>("IT1");
  
  const [manualBlocks, setManualBlocks] = useState<{ block: string; score: string }[]>([{ block: "A00", score: "" }]);
  const [customBlockInput, setCustomBlockInput] = useState<string>("");
  const [editingAspirationId, setEditingAspirationId] = useState<string | null>(null);
  const [targetScale, setTargetScale] = useState<string>("30");

  // Auto-set first major & block on university selection change
  const handleUnivChange = (uId: string) => {
    setTargetUnivId(uId);
    if (uId !== "custom") {
      const selectedUniv = UNIVERSITIES_DB.find(u => u.id === uId);
      if (selectedUniv && selectedUniv.majors.length > 0) {
        setTargetMajorId(selectedUniv.majors[0].code);
        setCustomMajorCode(selectedUniv.majors[0].code);
        if (selectedUniv.majors[0].blocks && selectedUniv.majors[0].blocks.length > 0) {
          setManualBlocks(selectedUniv.majors[0].blocks.map(b => ({ block: b, score: "" })));
        } else {
          setManualBlocks([{ block: "A00", score: "" }]);
        }
      } else {
        setTargetMajorId("custom");
        setCustomMajorCode("");
        setManualBlocks([{ block: "A00", score: "" }]);
      }
    } else {
      setTargetMajorId("custom");
      setCustomMajorCode("");
      setManualBlocks([{ block: "A00", score: "" }]);
    }
  };

  const handleMajorChange = (mId: string) => {
    setTargetMajorId(mId);
    if (mId !== "custom" && targetUnivId !== "custom") {
      const selectedUniv = UNIVERSITIES_DB.find(u => u.id === targetUnivId);
      const selectedMajor = selectedUniv?.majors.find(m => m.code === mId);
      if (selectedMajor) {
        setCustomMajorCode(selectedMajor.code);
        if (selectedMajor.blocks && selectedMajor.blocks.length > 0) {
          setManualBlocks(selectedMajor.blocks.map(b => ({ block: b, score: "" })));
        } else {
          setManualBlocks([{ block: "A00", score: "" }]);
        }
      }
    } else {
      setCustomMajorCode("");
    }
  };

  const resetForm = () => {
    setTargetUnivId("hust");
    setTargetMajorId("IT1");
    setCustomUnivName("");
    setCustomUnivCode("");
    setCustomMajorName("");
    setCustomMajorCode("IT1");
    setManualBlocks([{ block: "A00", score: "" }]);
    setCustomBlockInput("");
    setTargetScale("30");
    setEditingAspirationId(null);
  };

  const handleSaveAspiration = (e: React.FormEvent) => {
    e.preventDefault();
    
    let finalUnivName = "";
    let finalUnivCode = "";
    let finalMajorName = "";
    let finalMajorCode = "";
    
    if (targetUnivId === "custom") {
      finalUnivName = customUnivName.trim() || "Trường Đại học khác";
      finalUnivCode = customUnivCode.trim().toUpperCase() || "CUSTOM";
    } else {
      const selectedUniv = UNIVERSITIES_DB.find(u => u.id === targetUnivId);
      if (selectedUniv) {
        finalUnivName = selectedUniv.name;
        finalUnivCode = selectedUniv.code;
      }
    }
    
    if (targetMajorId === "custom") {
      finalMajorName = customMajorName.trim() || "Ngành học tự chọn";
      finalMajorCode = customMajorCode.trim().toUpperCase() || "CUSTOM";
    } else {
      const selectedUniv = UNIVERSITIES_DB.find(u => u.id === targetUnivId);
      const selectedMajor = selectedUniv?.majors.find(m => m.code === targetMajorId);
      if (selectedMajor) {
        finalMajorName = selectedMajor.name;
        finalMajorCode = customMajorCode.trim().toUpperCase() || selectedMajor.code;
      }
    }
    
    const newAsp: Aspiration = {
      id: editingAspirationId || Math.random().toString(36).substring(2, 9),
      universityId: targetUnivId,
      customUniversityName: targetUnivId === "custom" ? customUnivName : undefined,
      customUniversityCode: targetUnivId === "custom" ? customUnivCode : undefined,
      majorName: finalMajorName,
      majorCode: finalMajorCode,
      originalMajorId: targetMajorId !== "custom" ? targetMajorId : undefined,
      // For compatibility purposes, populate first manual block
      blockCode: manualBlocks[0]?.block || "A00",
      blockCodes: manualBlocks.map(mb => mb.block),
      estimatedCutoff: manualBlocks[0]?.score || undefined,
      blockScores: manualBlocks,
      scale: targetScale || "30"
    };
    
    if (editingAspirationId) {
      const updated = aspirations.map(asp => asp.id === editingAspirationId ? newAsp : asp);
      saveAspirationsList(updated);
      setEditingAspirationId(null);
    } else {
      saveAspirationsList([...aspirations, newAsp]);
    }
    
    resetForm();
  };

  const startEditAspiration = (asp: Aspiration) => {
    setEditingAspirationId(asp.id);
    setTargetUnivId(asp.universityId);
    setTargetScale(asp.scale || "30");
    
    if (asp.universityId === "custom") {
      setCustomUnivName(asp.customUniversityName || "");
      setCustomUnivCode(asp.customUniversityCode || "");
      setTargetMajorId("custom");
      setCustomMajorName(asp.majorName);
      setCustomMajorCode(asp.majorCode);
    } else {
      const selectedUniv = UNIVERSITIES_DB.find(u => u.id === asp.universityId);
      const majorIdToUse = asp.originalMajorId || asp.majorCode;
      const hasMajor = selectedUniv?.majors.some(m => m.code === majorIdToUse);
      if (hasMajor) {
        setTargetMajorId(majorIdToUse);
        setCustomMajorCode(asp.majorCode);
      } else {
        setTargetMajorId("custom");
        setCustomMajorName(asp.majorName);
        setCustomMajorCode(asp.majorCode);
      }
    }
    
    if (asp.blockScores && asp.blockScores.length > 0) {
      setManualBlocks(asp.blockScores);
    } else {
      const legacyBlocks = asp.blockCodes || (asp.blockCode ? [asp.blockCode] : ["A00"]);
      const legacyScore = asp.estimatedCutoff || asp.previousYearCutoff || "";
      setManualBlocks(legacyBlocks.map(b => ({ block: b, score: legacyScore })));
    }
    setCustomBlockInput("");
  };

  const deleteAspiration = (id: string) => {
    const updated = aspirations.filter(asp => asp.id !== id);
    saveAspirationsList(updated);
    if (editingAspirationId === id) {
      resetForm();
    }
  };

  const moveAspiration = (index: number, direction: "up" | "down") => {
    const nextIndex = direction === "up" ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= aspirations.length) return;
    
    const newList = [...aspirations];
    const temp = newList[index];
    newList[index] = newList[nextIndex];
    newList[nextIndex] = temp;
    
    saveAspirationsList(newList);
  };

  const exportAspirations = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(aspirations, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "diem_thi_30_nguyen_vong.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportAspirations = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    const file = e.target.files?.[0];
    if (!file) return;
    
    fileReader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          const mapped = parsed.map((item: any) => ({
            ...item,
            blockCodes: item.blockCodes || (item.blockCode ? [item.blockCode] : ["A00"]),
            estimatedCutoff: item.estimatedCutoff || item.previousYearCutoff || undefined
          }));
          saveAspirationsList(mapped);
        } else {
          alert("Tập tin JSON không chứa danh sách nguyện vọng hợp lệ.");
        }
      } catch (err) {
        alert("Không thể đọc được file. Vui lòng chọn file .json hợp lệ.");
      }
    };
    fileReader.readAsText(file);
  };

  // Hardcoded 2 compulsory core classes: Toán (Math) and Ngữ văn (Literature), and 2 customizable electives
  const [subjects, setSubjects] = useState<SubjectState[]>([
    { id: "toan", name: "Toán", score: "8.6", multiplier: "1.0", isFixed: true },
    { id: "van", name: "Ngữ văn", score: "7.8", multiplier: "1.0", isFixed: true },
    { id: "anh", name: "Tiếng Anh", score: "8.2", multiplier: "1.0", isFixed: false },
    { id: "ly", name: "Vật lí", score: "9.0", multiplier: "1.0", isFixed: false }
  ]);

  const [priorityArea, setPriorityArea] = useState<number>(0); 
  const [priorityTarget, setPriorityTarget] = useState<number>(0); 
  const [showPriorityFormula, setShowPriorityFormula] = useState(false);

  // Validate duplicate elective subjects selection
  const selectedElectives = subjects.filter(s => !s.isFixed).map(s => s.id);
  const hasElectiveDuplicates = selectedElectives[0] === selectedElectives[1];

  const handleScoreChange = (id: string, value: string) => {
    if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setSubjects(prev => prev.map(s => {
        if (s.id === id) {
          const num = parseFloat(value);
          if (!isNaN(num) && num > 10) return { ...s, score: "10" };
          return { ...s, score: value };
        }
        return s;
      }));
    }
  };

  const handleScoreBlur = (id: string) => {
    setSubjects(prev => prev.map(s => {
      if (s.id === id) {
        const parsed = parseFloat(s.score);
        if (isNaN(parsed) || parsed < 0) return { ...s, score: "0.0" };
        return { ...s, score: parsed.toFixed(2).replace(/\.?0+$/, "") };
      }
      return s;
    }));
  };

  const handleMultiplierChange = (id: string, value: string) => {
    if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setSubjects(prev => prev.map(s => 
        s.id === id ? { ...s, multiplier: value } : s
      ));
    }
  };

  const handleMultiplierBlur = (id: string) => {
    setSubjects(prev => prev.map(s => {
      if (s.id === id) {
        const parsed = parseFloat(s.multiplier);
        if (isNaN(parsed) || parsed <= 0) return { ...s, multiplier: "1.0" };
        return { ...s, multiplier: parsed.toFixed(2).replace(/\.?0+$/, "") };
      }
      return s;
    }));
  };

  const handleElectiveSelect = (idToReplace: string, newId: string) => {
    const electiveObj = ELECTIVE_SUBJECTS.find(item => item.id === newId);
    if (!electiveObj) return;

    setSubjects(prev => prev.map(s => {
      if (s.id === idToReplace) {
        return {
          ...s,
          id: newId,
          name: electiveObj.name
        };
      }
      return s;
    }));
  };

  const resetAllToDefaults = () => {
    setSubjects([
      { id: "toan", name: "Toán", score: "8.6", multiplier: "1.0", isFixed: true },
      { id: "van", name: "Ngữ văn", score: "7.8", multiplier: "1.0", isFixed: true },
      { id: "anh", name: "Tiếng Anh", score: "8.2", multiplier: "1.0", isFixed: false },
      { id: "ly", name: "Vật lí", score: "9.0", multiplier: "1.0", isFixed: false }
    ]);
    setPriorityArea(0);
    setPriorityTarget(0);
  };

  const basePriorityPoints = priorityArea + priorityTarget;

  // Calculates unweighted base scores on a 30-point scale, then applies linear priority points based on MOET rules
  const combinations = useMemo(() => {
    if (hasElectiveDuplicates) return [];

    // All available subsets of 3 out of 4 subjects
    const combIndices = [
      [0, 1, 2],
      [0, 1, 3],
      [0, 2, 3],
      [1, 2, 3]
    ];

    return combIndices.map(indices => {
      const selectedSubjects = indices.map(idx => {
        const sub = subjects[idx];
        return {
          id: sub.id,
          name: sub.name,
          score: parseFloat(sub.score) || 0,
          multiplier: parseFloat(sub.multiplier) || 1.0
        };
      });

      const sumWeightedScores = selectedSubjects.reduce((sum, item) => sum + (item.score * item.multiplier), 0);
      const sumMultipliers = selectedSubjects.reduce((sum, item) => sum + item.multiplier, 0);
      
      const calculatedUnweighted = (sumWeightedScores * 3) / sumMultipliers;
      
      let actualPriority = basePriorityPoints;
      let isScaled = false;
      if (basePriorityPoints > 0 && calculatedUnweighted >= 22.5) {
        actualPriority = basePriorityPoints * (30 - calculatedUnweighted) / 7.5;
        isScaled = true;
      }
      
      const finalScore = Math.min(30, calculatedUnweighted + actualPriority);

      // Map to exact list of subjects
      const canonNames = selectedSubjects.map(item => SUBJECT_CANON_MAP[item.id] || item.name.toLowerCase());
      
      // Look up inside our 120+ standard blocks
      const blockMatch = ALL_BLOCKS.find(block => {
        if (block.subjects.length !== canonNames.length) return false;
        return block.subjects.every(subj => canonNames.includes(subj));
      });

      return {
        key: selectedSubjects.map(s => s.id).join("-"),
        subjects: selectedSubjects,
        unweightedScore: calculatedUnweighted,
        actualPriority: actualPriority,
        isScaled: isScaled,
        finalScore: finalScore,
        blockCode: blockMatch ? blockMatch.code : null,
        blockFullName: blockMatch ? blockMatch.fullName : `Tổ hợp (${selectedSubjects.map(s => s.name).join(", ")})`,
        blockType: blockMatch ? blockMatch.type : ("X" as const)
      };
    })
    .filter(c => c.blockCode !== null)
    .sort((a, b) => b.finalScore - a.finalScore);
  }, [subjects, hasElectiveDuplicates, basePriorityPoints]);

  return (
    <div id="calculator-root" className="w-full min-h-screen bg-white text-[#1A1A1A] font-sans flex flex-col justify-between px-4 md:px-12 py-8 selection:bg-neutral-900 selection:text-white select-none">
      
      {/* Header */}
      <header className="pt-2 pb-6 flex flex-col sm:flex-row justify-between items-center border-b border-neutral-100 gap-4 mb-6 w-full">
        <div 
          className="text-3xl font-light tracking-tighter flex items-center select-none cursor-pointer hover:opacity-85 transition-opacity"
          onClick={() => setActiveTab("calculator")}
        >
          <span>DiemThi</span>
          <svg 
            className="h-[0.9em] w-[0.45em] mx-0.5 text-neutral-300 self-center translate-y-[0.05em]" 
            viewBox="0 0 10 20" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.8" 
            strokeLinecap="round"
          >
            <line x1="3.8" y1="18" x2="6.2" y2="2" />
          </svg>
          <span className="font-extrabold text-[#1A1A1A]">30</span>
        </div>

        <nav className="flex items-center gap-1.5 bg-neutral-50/70 p-1 rounded-xl text-xs font-semibold select-none border border-neutral-200/80 shadow-xs">
          <button
            onClick={() => setActiveTab("calculator")}
            className={`px-3.5 py-1.5 rounded-lg transition-all duration-300 cursor-pointer flex items-center gap-2 font-bold ${
              activeTab === "calculator"
                ? "bg-neutral-900 text-white shadow-xs border border-neutral-950 scale-[1.01]"
                : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/40"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 shrink-0 opacity-80" />
            <span>Tính điểm thi</span>
          </button>
          <button
            onClick={() => setActiveTab("aspirations")}
            className={`px-3.5 py-1.5 rounded-lg transition-all duration-300 cursor-pointer flex items-center gap-2 font-bold ${
              activeTab === "aspirations"
                ? "bg-neutral-900 text-white shadow-xs border border-neutral-950 scale-[1.01]"
                : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/40"
            }`}
          >
            <Award className="w-3.5 h-3.5 shrink-0 opacity-80" />
            <span>Nguyện vọng</span>
            {aspirations.length > 0 && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono font-bold transition-all duration-200 ${
                activeTab === "aspirations" 
                  ? "bg-white/20 text-white" 
                  : "bg-neutral-200 text-neutral-700"
              }`}>
                {aspirations.length}
              </span>
            )}
          </button>
        </nav>
      </header>

      {activeTab === "calculator" ? (
        <main className="flex-1 w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start py-6">
          
          {/* Left Side Section: Dynamic score entries & Custom multipliers */}
          <section className="md:col-span-12 lg:col-span-5 flex flex-col gap-8">
            
            <div className="flex flex-col gap-6">
              
              {/* Subject Panel Header */}
              <div className="flex items-center justify-between border-b border-neutral-900 pb-2">
                <h2 className="text-lg font-medium tracking-tight">
                  Thông tin điểm số
                </h2>
                
                <button 
                  onClick={resetAllToDefaults}
                  className="text-xs text-neutral-400 hover:text-neutral-900 flex items-center gap-1 transition-all"
                  title="Đặt lại thông số mặc định"
                  id="btn-reset-values"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Đặt lại</span>
                </button>
              </div>

              {/* Error banner when selecting duplicate elective classes */}
              <AnimatePresence>
                {hasElectiveDuplicates && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 bg-orange-50 border border-orange-200 text-orange-950 rounded flex items-start gap-2.5 text-xs"
                    id="warning-duplicates-alert"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 text-orange-700 mt-0.5" />
                    <div>
                      <h4 className="font-bold">Trùng lặp môn học tự chọn</h4>
                      <p className="text-neutral-600 mt-0.5 leading-relaxed">
                        Bạn đang chọn trùng lặp môn thi. Vui lòng thay đổi môn tự chọn thứ 3 hoặc thứ 4 để hệ thống ghép thành các tổ hợp tuyển sinh chuẩn xác.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form list inputs */}
              <div className="space-y-6" id="subject-rows-parent">
                {subjects.map((sub) => {
                  return (
                    <div key={sub.id} className="flex flex-col sm:flex-row sm:items-end gap-3 pb-3 border-b border-neutral-100" id={`row-${sub.id}`}>
                      
                      {/* Subject Picker dropdown logic */}
                      <div className="flex-1 space-y-1">
                        <span className="block text-[9px] uppercase font-bold tracking-widest text-neutral-400">
                          {sub.isFixed ? "Môn thi bắt buộc" : "Môn thi tự chọn"}
                        </span>
                        
                        {sub.isFixed ? (
                          <div className="py-1 text-base font-semibold text-neutral-800" id={`label-compulsory-${sub.id}`}>
                            {sub.name}
                          </div>
                        ) : (
                          <div className="relative">
                            <select
                              value={sub.id}
                              onChange={(e) => handleElectiveSelect(sub.id, e.target.value)}
                              className="bg-transparent font-semibold text-neutral-800 text-base py-1 focus:outline-none cursor-pointer appearance-none pr-6 w-full"
                              id={`dropdown-elective-${sub.id}`}
                            >
                              {ELECTIVE_SUBJECTS.map(item => {
                                return (
                                  <option key={item.id} value={item.id} className="text-neutral-900">
                                    {item.name}
                                  </option>
                                );
                              })}
                            </select>
                            <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                        )}
                      </div>

                      {/* Numeric Score Entry */}
                      <div className="w-full sm:w-28 space-y-1">
                        <span className="block text-[9px] uppercase font-bold tracking-widest text-neutral-400">
                          Điểm thi (0 - 10)
                        </span>
                        <div className="flex items-center border-b border-neutral-200 focus-within:border-neutral-950 transition-colors pb-0.5">
                          <input
                            type="text"
                            value={sub.score}
                            onChange={(e) => handleScoreChange(sub.id, e.target.value)}
                            onBlur={() => handleScoreBlur(sub.id)}
                            placeholder="0.0"
                            className="w-full text-left bg-transparent text-base font-bold font-mono outline-none select-text"
                            id={`input-score-${sub.id}`}
                          />
                          <span className="text-[10px] text-neutral-400 font-bold ml-1 uppercase">đ</span>
                        </div>
                      </div>

                      {/* Multipliers system - custom customizable numeric box */}
                      <div className="w-full sm:w-24 space-y-1">
                        <span className="block text-[9px] uppercase font-bold tracking-widest text-neutral-400">
                          Hệ số môn
                        </span>
                        <div className="flex items-center border-b border-neutral-200 focus-within:border-neutral-950 transition-colors pb-0.5">
                          <input
                            type="text"
                            value={sub.multiplier}
                            onChange={(e) => handleMultiplierChange(sub.id, e.target.value)}
                            onBlur={() => handleMultiplierBlur(sub.id)}
                            placeholder="1.0"
                            className="w-full text-left bg-transparent text-base font-medium font-mono outline-none select-text"
                            id={`input-multiplier-${sub.id}`}
                          />
                          <span className="text-[10px] text-neutral-400 font-bold ml-1 uppercase font-mono">h/s</span>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>

            {/* Scaled priority calculations block */}
            <div className="pt-6 border-t border-neutral-100 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <label className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">
                  Điểm ưu tiên xét tuyển
                </label>
                
                <button
                  type="button"
                  onClick={() => setShowPriorityFormula(!showPriorityFormula)}
                  className="text-neutral-400 hover:text-neutral-900 transition-colors inline-flex items-center gap-1 text-[11px] font-semibold"
                  id="btn-trigger-formula"
                >
                  <span>Xem quy chế</span>
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              </div>

              <AnimatePresence>
                {showPriorityFormula && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-neutral-50 rounded p-4 text-[11px] leading-relaxed text-neutral-600 border border-neutral-200 space-y-2 overflow-hidden"
                    id="info-formula-popup"
                  >
                    <p className="font-bold text-neutral-950">Quy chế xét tuyển Đại học mới nhất:</p>
                    <p>Thí sinh đạt tổng điểm từ 22.5 trở lên (quy đổi về thang 30 unweighted) được cộng điểm ưu tiên giảm tuyển tính theo công thức:</p>
                    <p className="bg-white p-2 border border-neutral-100 rounded text-center text-neutral-900 font-mono text-[10px]">
                      Điểm ưu tiên thực tế = Điểm gốc * [ (30 - Điểm thi unweighted) / 7.5 ]
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                {/* Region Select */}
                <div className="space-y-1">
                  <span className="block text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Khu vực ưu tiên</span>
                  <select
                    value={priorityArea}
                    onChange={(e) => setPriorityArea(parseFloat(e.target.value))}
                    className="w-full bg-neutral-50 border border-neutral-200 text-xs font-semibold rounded p-2 focus:border-neutral-900 focus:outline-none cursor-pointer"
                    id="select-priority-area"
                  >
                    <option value="0">Khu vực 3 (KV3) — +0.00 đ</option>
                    <option value="0.25">Khu vực 2 (KV2) — +0.25 đ</option>
                    <option value="0.5">Khu vực 2-NT (KV2-NT) — +0.50 đ</option>
                    <option value="0.75">Khu vực 1 (KV1) — +0.75 đ</option>
                  </select>
                </div>

                {/* Target Class Setup */}
                <div className="space-y-1">
                  <span className="block text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Đối tượng ưu tiên</span>
                  <select
                    value={priorityTarget}
                    onChange={(e) => setPriorityTarget(parseFloat(e.target.value))}
                    className="w-full bg-neutral-50 border border-neutral-200 text-xs font-semibold rounded p-2 focus:border-neutral-900 focus:outline-none cursor-pointer"
                    id="select-priority-target"
                  >
                    <option value="0">Không có đối tượng ưu tiên</option>
                    <option value="1.0">Nhóm đối tượng UT2 — +1.00 đ</option>
                    <option value="2.0">Nhóm đối tượng UT1 — +2.00 đ</option>
                  </select>
                </div>
              </div>
            </div>

          </section>

          {/* Right Side Section: Live rendering of parsed combination streams */}
          <section className="md:col-span-12 lg:col-span-7 w-full h-full flex flex-col justify-center lg:border-l lg:border-neutral-100 lg:pl-12">
            
            <div className="mb-6">
              <p className="text-neutral-400 text-[10px] uppercase tracking-wider font-semibold mb-1">
                Kết quả tổ hợp khả thi GDPT 2018
              </p>
              <h2 id="optimal-title-header" className="text-2xl font-bold tracking-tight text-neutral-900">
                Điểm thi tối ưu
              </h2>
            </div>

            <div className="space-y-1" id="combination-list-wrap">
              {hasElectiveDuplicates ? (
                <div className="py-20 text-center text-neutral-400 font-light text-xs space-y-2 border border-dashed border-neutral-200 rounded" id="results-duplicate-gate">
                  <AlertCircle className="w-8 h-8 text-neutral-300 mx-auto" />
                  <p>Hãy điều chỉnh các môn tự chọn khác biệt để xếp hạng khối thi tối ưu của bạn.</p>
                </div>
              ) : combinations.length === 0 ? (
                <div className="py-20 text-center text-neutral-400 font-light text-xs space-y-2 border border-dashed border-neutral-200 rounded" id="results-empty-gate">
                  <AlertCircle className="w-8 h-8 text-neutral-300 mx-auto" />
                  <p>Không tìm thấy khối tuyển sinh phù hợp với những môn hiện tại.</p>
                </div>
              ) : (
                combinations.map((comb, index) => {
                  const isHighest = index === 0;
                  const config = BLOCK_THEME_MAP[comb.blockType] || BLOCK_THEME_MAP["X"];

                  return (
                    <div
                      key={comb.key}
                      className="relative flex flex-col sm:flex-row sm:items-center justify-between py-5 border-b border-neutral-100 last:border-b-0 px-1 overflow-hidden"
                      id={`combination-card-${index}`}
                    >
                      
                      {/* Block key metadata colored gracefully */}
                      <div className="space-y-1 relative z-10">
                        <div className="flex items-center gap-3">
                          <span className={`text-4xl font-extrabold italic tracking-tighter ${config.textColor}`} id={`combo-badge-${comb.key}`}>
                            {comb.blockCode || "TỔ HỢP"}
                          </span>
                          
                          {isHighest && (
                            <span className="px-1.5 py-0.5 bg-neutral-900 text-white text-[8px] font-bold uppercase tracking-widest rounded" id="highest-score-pin">
                              Tầm điểm tối ưu
                            </span>
                          )}
                        </div>
                        
                        <div className="flex flex-col gap-0.5">
                          <span className="text-sm text-neutral-800 font-medium">
                            {comb.blockFullName}
                          </span>
                        </div>
                      </div>

                      {/* Calculated values column */}
                      <div className="text-left sm:text-right mt-3 sm:mt-0 flex sm:flex-col justify-between sm:justify-start items-start sm:items-end gap-1 relative z-10 w-full sm:w-auto">
                        <span className="text-3xl font-bold font-mono tracking-tighter text-neutral-900" id={`score-value-${index}`}>
                          {comb.finalScore.toFixed(2)}
                          <span className="text-base select-none ml-1 inline-flex items-baseline">
                            <span className="font-medium text-neutral-400">/</span>
                            <span className="font-light text-neutral-300">30</span>
                          </span>
                        </span>
                        
                        {comb.actualPriority > 0 && (
                          <div className="text-[10px] text-neutral-400 font-mono">
                            Thi: {comb.unweightedScore.toFixed(2)} + ƯT: {comb.actualPriority.toFixed(2)}
                          </div>
                        )}
                      </div>

                    </div>
                  );
                })
              )}
            </div>

            <p className="mt-8 text-neutral-400 text-[11px] leading-relaxed w-full font-light">
              Mô phỏng tính toán hệ số và phân tích tổ hợp theo quy chế Bộ GD&ĐT 2026. Kết quả tính toán chỉ mang tính tham khảo hữu ích dành cho sĩ tử.
            </p>

          </section>
        </main>
      ) : (
        <main className="flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-6 items-start">
          
          {/* Left panel: Add / Edit form */}
          <section className="lg:col-span-4 bg-neutral-50/60 border border-neutral-100 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <h3 className="text-sm font-bold tracking-tight text-neutral-900 uppercase">
                {editingAspirationId ? "Sửa Nguyện vọng" : "Thêm Nguyện vọng mới"}
              </h3>
              {editingAspirationId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors text-[10px] font-bold uppercase tracking-wider"
                >
                  Hủy bỏ
                </button>
              )}
            </div>

            <form onSubmit={handleSaveAspiration} className="space-y-4">
              
              {/* Select University */}
              <div className="space-y-1">
                <label className="block text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                  Trường Đại học
                </label>
                <select
                  value={targetUnivId}
                  onChange={(e) => handleUnivChange(e.target.value)}
                  className="w-full bg-white border border-neutral-200 text-xs font-semibold rounded-lg p-2.5 focus:border-neutral-900 focus:outline-none cursor-pointer"
                >
                  {UNIVERSITIES_DB.map((univ) => (
                    <option key={univ.id} value={univ.id}>
                      [{univ.code}] {univ.name}
                    </option>
                  ))}
                  <option value="custom">[KHÁC] Tự nhập trường đại học khác...</option>
                </select>
              </div>

              {/* Custom University Inputs */}
              {targetUnivId === "custom" && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2 space-y-1">
                    <label className="block text-[9px] uppercase font-bold text-neutral-400">Tên trường đại học</label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Học viện Ngoại giao"
                      value={customUnivName}
                      onChange={(e) => setCustomUnivName(e.target.value)}
                      className="w-full bg-white border border-neutral-200 text-xs font-semibold rounded-lg p-2.5 outline-none focus:border-neutral-900"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[9px] uppercase font-bold text-neutral-400">Mã trường (e.g. HVT)</label>
                    <input
                      type="text"
                      required
                      placeholder="Mã"
                      value={customUnivCode}
                      onChange={(e) => setCustomUnivCode(e.target.value)}
                      className="w-full bg-white border border-neutral-200 text-xs font-semibold rounded-lg p-2.5 outline-none focus:border-neutral-900 uppercase"
                    />
                  </div>
                </div>
              )}

              {/* Select Major */}
              <div className="space-y-1">
                <label className="block text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                  Ngành học / Chương trình đào tạo
                </label>
                {targetUnivId !== "custom" ? (
                  <select
                    value={targetMajorId}
                    onChange={(e) => handleMajorChange(e.target.value)}
                    className="w-full bg-white border border-neutral-200 text-xs font-semibold rounded-lg p-2.5 focus:border-neutral-900 focus:outline-none cursor-pointer"
                  >
                    {UNIVERSITIES_DB.find((u) => u.id === targetUnivId)?.majors.map((m) => (
                      <option key={m.code} value={m.code}>
                        [{m.code}] {m.name}
                      </option>
                    ))}
                    <option value="custom">[KHÁC] Tự nhập ngành học...</option>
                  </select>
                ) : (
                  <div className="p-3 bg-neutral-100 text-[11px] text-neutral-500 rounded-lg font-light leading-relaxed">
                    Bạn đang chọn thiết lập thủ công, vui lòng nhập thông tin ngành phía dưới.
                  </div>
                )}
              </div>
 
              {/* Optional Major Code Edit for Pre-existing Majors */}
              {targetUnivId !== "custom" && targetMajorId !== "custom" && (
                <div className="space-y-1">
                  <label className="block text-[9px] uppercase font-bold text-neutral-400">
                    Mã ngành tuyển sinh (Có thể điều chỉnh nếu cần)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: 7480201"
                    value={customMajorCode}
                    onChange={(e) => setCustomMajorCode(e.target.value)}
                    className="w-full bg-white border border-neutral-200 text-xs font-semibold rounded-lg p-2.5 outline-none focus:border-neutral-900 uppercase"
                  />
                </div>
              )}

              {/* Custom Major Inputs */}
              {(targetUnivId === "custom" || targetMajorId === "custom") && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2 space-y-1">
                    <label className="block text-[9px] uppercase font-bold text-neutral-400">Tên ngành mong muốn</label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Khoa học Dữ liệu nâng cao"
                      value={customMajorName}
                      onChange={(e) => setCustomMajorName(e.target.value)}
                      className="w-full bg-white border border-neutral-200 text-xs font-semibold rounded-lg p-2.5 outline-none focus:border-neutral-900"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[9px] uppercase font-bold text-neutral-400">Mã ngành</label>
                    <input
                      type="text"
                      required
                      placeholder="Mã"
                      value={customMajorCode}
                      onChange={(e) => setCustomMajorCode(e.target.value)}
                      className="w-full bg-white border border-neutral-200 text-xs font-semibold rounded-lg p-2.5 outline-none focus:border-neutral-900 uppercase"
                    />
                  </div>
                </div>
              )}

              {/* Select Admission Block */}
              <div className="space-y-3">
                <label className="block text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                  Tổ hợp xét tuyển & Điểm ước lượng của bạn
                </label>
                
                <div className="space-y-2">
                  {manualBlocks.map((mb, index) => {
                    const themeConfig = getBlockTheme(mb.block);
                    return (
                      <div key={mb.block} className={`flex items-center gap-2 bg-white/40 p-2 rounded-xl border ${themeConfig.bg} transition-all duration-300`}>
                        <span className={`w-14 shrink-0 text-xs font-black font-mono ${themeConfig.text} ${themeConfig.badge} py-1.5 px-2 rounded-lg text-center border uppercase select-none`}>
                          {mb.block}
                        </span>
                        <input
                          type="text"
                          required
                          placeholder="Mức điểm thi ước lượng (VD: 25.5)"
                          value={mb.score}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === "" || /^[0-9]*\.?[0-9]*$/.test(val)) {
                              const updated = [...manualBlocks];
                              updated[index].score = val;
                              setManualBlocks(updated);
                            }
                          }}
                          className={`flex-1 bg-white border border-neutral-200 text-xs font-mono font-bold rounded-lg p-2 outline-none focus:border-neutral-900 focus:bg-white select-text h-[34px] ${themeConfig.text}`}
                        />
                        {manualBlocks.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              setManualBlocks(manualBlocks.filter((_, i) => i !== index));
                            }}
                            className="text-neutral-400 hover:text-rose-600 p-1.5 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer shrink-0"
                            title="Xóa tổ hợp này"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Suggestions to add/toggle blocks */}
              <div className="space-y-2 pt-1">
                <span className="block text-[9px] uppercase font-bold text-neutral-400 tracking-wider">
                  Chọn nhanh khối thi gợi ý của ngành
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {Array.from(new Set([
                    ...(targetUnivId !== "custom" && targetMajorId !== "custom"
                      ? UNIVERSITIES_DB.find((u) => u.id === targetUnivId)?.majors.find((m) => m.code === targetMajorId)?.blocks || []
                      : []),
                    "A00", "A01", "B00", "C00", "D01", "D07"
                  ])).map((block) => {
                    const isSelected = manualBlocks.some(b => b.block === block);
                    const themeConfig = getBlockTheme(block);
                    return (
                      <button
                        key={block}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            if (manualBlocks.length > 1) {
                              setManualBlocks(manualBlocks.filter(b => b.block !== block));
                            }
                          } else {
                            setManualBlocks([...manualBlocks, { block, score: "" }]);
                          }
                        }}
                        className={`px-2.5 py-1.5 rounded-lg border text-[10px] font-extrabold font-mono transition-all duration-200 cursor-pointer select-none ${
                          isSelected
                            ? `border-current ${themeConfig.text} ${themeConfig.bg} shadow-sm font-black`
                            : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400"
                        }`}
                      >
                        {isSelected ? "✓ " : ""}{block}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Manual/custom block input */}
              <div className="space-y-1.5 pb-2">
                <span className="block text-[9px] uppercase font-bold text-neutral-400 tracking-wider">
                  Hoặc tự nhập tổ hợp xét tuyển khác
                </span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ví dụ: D11, C01, V01..."
                    value={customBlockInput}
                    onChange={(e) => setCustomBlockInput(e.target.value.toUpperCase().replace(/\s/g, ""))}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const clean = customBlockInput.trim().toUpperCase();
                        if (clean) {
                          if (manualBlocks.some(b => b.block === clean)) {
                            alert("Tổ hợp này đã có trong danh sách.");
                            return;
                          }
                          setManualBlocks([...manualBlocks, { block: clean, score: "" }]);
                          setCustomBlockInput("");
                        }
                      }
                    }}
                    className="flex-1 bg-white border border-neutral-200 text-xs font-mono font-bold rounded-lg p-2 outline-none focus:border-neutral-900 uppercase"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const clean = customBlockInput.trim().toUpperCase();
                      if (clean) {
                        if (manualBlocks.some(b => b.block === clean)) {
                          alert("Tổ hợp này đã có trong danh sách.");
                          return;
                        }
                        setManualBlocks([...manualBlocks, { block: clean, score: "" }]);
                        setCustomBlockInput("");
                      }
                    }}
                    className="px-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold rounded-lg transition-colors cursor-pointer active:scale-95 flex items-center justify-center font-semibold"
                  >
                    Thêm
                  </button>
                </div>
                <span className="block text-[9px] text-neutral-400 italic">
                  Khối thi và điểm ước lượng của nguyện vọng là bán tự động/độc lập với phần "Tính điểm thi". Bạn tự điền theo mong muốn xét tuyển.
                </span>
              </div>

              {/* Optional custom scale input */}
              <div className="space-y-1.5 pb-2">
                <div className="flex items-center justify-between gap-2">
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                    Thang điểm tối đa
                  </label>
                  <div className="flex gap-1.5 shrink-0">
                    {["30", "40", "100"].map((sc) => (
                      <button
                        key={sc}
                        type="button"
                        onClick={() => setTargetScale(sc)}
                        className={`px-2 py-0.5 rounded text-[10px] font-extrabold font-mono transition-all cursor-pointer ${
                          targetScale === sc
                            ? "bg-neutral-900 text-white font-black"
                            : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 border border-neutral-200/50"
                        }`}
                      >
                        {sc}
                      </button>
                    ))}
                  </div>
                </div>
                <input
                  type="text"
                  required
                  placeholder="Nhập thang điểm (mặc định: 30)"
                  value={targetScale}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "" || /^[0-9]*\.?[0-9]*$/.test(val)) {
                      setTargetScale(val);
                    }
                  }}
                  className="w-full bg-white border border-neutral-200 text-xs font-mono font-bold rounded-lg p-2.5 outline-none focus:border-neutral-900"
                />
                <span className="block text-[9px] text-neutral-400 italic">
                  Các ngành tiêu chuẩn dùng thang 30. Ngành nhân hệ số dùng thang 40, đánh giá năng lực dùng thang 100/1200...
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-neutral-900 hover:bg-neutral-850 text-white rounded-lg py-2.5 px-4 text-xs font-bold active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {editingAspirationId ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                <span>{editingAspirationId ? "Cập nhật thay đổi" : "Thêm vào nguyện vọng"}</span>
              </button>

            </form>
          </section>

          {/* Right panel: Sorted interactive list */}
          <section className="lg:col-span-8 flex flex-col h-full space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-200 pb-3 gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight flex items-center gap-2">
                  <span>Sắp xếp hồ sơ nguyện vọng</span>
                  <span className="bg-neutral-100 text-neutral-600 font-mono text-[10px] px-2 py-0.5 rounded-full font-bold">
                    {aspirations.length} NV
                  </span>
                </h3>
              </div>

              {/* Reset or Export */}
              {aspirations.length > 0 && (
                <div className="flex items-center gap-4">
                  <button
                    onClick={exportAspirations}
                    className="text-xs text-neutral-500 hover:text-neutral-900 flex items-center gap-1 transition-colors cursor-pointer"
                    title="Xuất dữ liệu lưu trữ dưới dạng JSON"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Xuất JSON</span>
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("Bạn có chắc muốn xóa toàn bộ danh sách nguyện vọng hiện có?")) {
                        saveAspirationsList([]);
                        resetForm();
                      }
                    }}
                    className="text-xs text-neutral-500 hover:text-rose-600 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Xóa toàn bộ</span>
                  </button>
                </div>
              )}
            </div>

            {/* Empty list state */}
            {aspirations.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center py-16 px-8 text-center border border-dashed border-neutral-200 rounded-2xl bg-neutral-50/20">
                <div className="w-12 h-12 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-400 mb-4 border border-neutral-100">
                  <Award className="w-5 h-5 text-neutral-400" />
                </div>
                <h4 className="font-semibold text-neutral-800 text-sm mb-1">Chưa có nguyện vọng xét tuyển</h4>
                <p className="text-xs text-neutral-500 max-w-sm leading-relaxed mb-6">
                  Bạn chưa thiết lập nguyện vọng nào. Hãy sử dụng form bên trái để bắt đầu lập danh sách các trường đại học mơ ước theo thứ tự ưu tiên của riêng bạn.
                </p>

                {/* Import triggers */}
                <div>
                  <label className="text-xs bg-white border border-neutral-200 hover:border-neutral-950 text-neutral-700 font-semibold px-4 py-2.5 rounded-lg cursor-pointer transition-colors shadow-sm inline-flex items-center gap-1.5 select-none hover:text-neutral-900 active:scale-95">
                    <Upload className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Nhập dữ liệu JSON đã lưu</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportAspirations}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                {aspirations.map((asp, index) => {
                  const items = asp.blockScores || (asp.blockCodes ? asp.blockCodes.map(b => ({ block: b, score: asp.estimatedCutoff || asp.previousYearCutoff || "" })) : [{ block: "A00", score: "" }]);
                  const selectedUniv = UNIVERSITIES_DB.find((u) => u.id === asp.universityId);
                  const logoUrl = selectedUniv ? selectedUniv.logo : "";
                  const shortName = selectedUniv ? selectedUniv.shortName : "ĐHK";
                  const fullName = selectedUniv ? selectedUniv.name : (asp.customUniversityName || "Trường Đại học khác");
                  const univCode = selectedUniv ? selectedUniv.code : (asp.customUniversityCode || "CUSTOM");

                  const isDragged = draggedIndex === index;
                  const isOver = dragOverIndex === index;

                  return (
                    <div
                      key={asp.id}
                      draggable
                      onDragStart={(e) => {
                        setDraggedIndex(index);
                        e.dataTransfer.effectAllowed = "move";
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                        if (dragOverIndex !== index) {
                          setDragOverIndex(index);
                        }
                      }}
                      onDragEnd={() => {
                        setDraggedIndex(null);
                        setDragOverIndex(null);
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        if (draggedIndex !== null && draggedIndex !== index) {
                          const newList = [...aspirations];
                          const draggedItem = newList[draggedIndex];
                          newList.splice(draggedIndex, 1);
                          newList.splice(index, 0, draggedItem);
                          saveAspirationsList(newList);
                        }
                        setDraggedIndex(null);
                        setDragOverIndex(null);
                      }}
                      className={`relative flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-3.5 sm:p-5 mb-3 sm:mb-4 border border-neutral-100 rounded-2xl bg-white transition-all duration-300 shadow-[0_1px_3px_rgba(0,0,0,0.015)] group ${
                        isDragged ? "opacity-30 bg-neutral-50/50" : "hover:bg-neutral-50/10 hover:border-neutral-200/80 hover:shadow-xs"
                      } ${
                        isOver && draggedIndex !== index ? "border-t-2 border-purple-500 border-dashed pt-8 mt-2" : ""
                      }`}
                    >
                      {/* Left: Drag Handle, NV Index, Details */}
                      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                        {/* Drag Handle vertical grip icon */}
                        <div className="text-neutral-300 hover:text-neutral-600 cursor-grab active:cursor-grabbing p-1.5 -ml-1.5 transition-colors select-none shrink-0" title="Kéo thả để sắp xếp lại">
                          <GripVertical className="w-4 h-4" />
                        </div>

                        {/* NV index with elegant thin typographic design */}
                        <div className="text-center font-mono shrink-0 select-none min-w-[32px] sm:min-w-[36px]">
                          <span className="block text-[8px] uppercase tracking-wider text-neutral-400 font-extrabold leading-none">NV</span>
                          <span className="block text-xl sm:text-2xl font-black italic tracking-tighter text-neutral-900 leading-tight">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>

                        {/* School & major details */}
                        <div className="space-y-0.5 min-w-0 flex-1">
                          <h4 className="text-xs sm:text-sm font-extrabold text-neutral-900 leading-snug tracking-tight text-wrap break-words">
                            {asp.majorName} <span className="font-mono text-[9px] sm:text-[10px] text-neutral-400 font-normal select-all">({asp.majorCode})</span>
                          </h4>
                          <p className="text-[10px] sm:text-[11px] text-neutral-500 font-light leading-snug select-all text-wrap break-words">
                            {fullName} <span className="font-mono text-[8px] sm:text-[9px] text-neutral-400 font-extrabold uppercase">({univCode})</span>
                          </p>
                        </div>
                      </div>

                      {/* Right: Scores & Row Actions side-by-side */}
                      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between lg:justify-end gap-4 lg:gap-8 border-t lg:border-t-0 border-neutral-100/60 pt-3.5 lg:pt-0 w-full lg:w-auto">
                        
                        {/* Unified combination-like score cells (styled exactly like combinations, colored dynamically by group) */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-6 w-full lg:w-auto">
                          {items.map(({ block, score }) => {
                            const themeConfig = getBlockTheme(block);
                            return (
                              <div key={block} className="flex-1 sm:flex-initial min-w-[100px] sm:min-w-0">
                                {/* Mobile Version: compact colored pill */}
                                <div className={`flex sm:hidden items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg border ${themeConfig.bg} transition-all duration-200 select-none w-full`}>
                                  <div className="flex items-center gap-1.5">
                                    <span className={`text-[11px] font-black italic tracking-wide ${themeConfig.text}`}>
                                      {block}
                                    </span>
                                  </div>
                                  <div className="flex items-baseline gap-0.5">
                                    <span className="text-xs font-bold font-mono text-neutral-800">
                                      {score ? (parseFloat(score) ? parseFloat(score).toFixed(2) : score) : "--"}
                                    </span>
                                    <span className="text-[9px] font-light text-neutral-400 select-none ml-0.5">/{asp.scale || "30"}</span>
                                  </div>
                                </div>

                                {/* Desktop Version: spacious column layout */}
                                <div className="hidden sm:flex flex-col items-center sm:items-end justify-center gap-0.5 min-w-[120px] md:min-w-[130px]">
                                  <div className="flex flex-col items-start sm:items-end w-full">
                                    <span className={`text-2xl font-black italic tracking-tighter ${themeConfig.text} leading-none`}>
                                      {block}
                                    </span>
                                    <span className="text-[8.5px] font-sans font-medium text-neutral-400 truncate max-w-[125px] sm:max-w-[140px] text-right mt-1.5 leading-none uppercase tracking-wide">
                                      {getBlockSubjectsText(block)}
                                    </span>
                                  </div>
                                  
                                  <div className="flex items-baseline mt-1">
                                    <span className="text-xl font-bold font-mono tracking-tighter text-neutral-900 leading-none">
                                      {score ? (parseFloat(score) ? parseFloat(score).toFixed(2) : score) : "--"}
                                    </span>
                                    <span className="text-[10px] select-none ml-1 font-light text-neutral-400">/{asp.scale || "30"}</span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Row management actions (Edit and Delete) */}
                        <div className="flex items-center justify-end gap-1 shrink-0 bg-neutral-50/50 sm:bg-transparent rounded-lg p-1 sm:p-0 border border-neutral-100/55 sm:border-0 self-end lg:self-center">
                          {/* Edit row trigger */}
                          <button
                            onClick={() => startEditAspiration(asp)}
                            className="p-2 sm:p-1.5 rounded-lg hover:bg-neutral-100/80 text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
                            title="Sửa thông tin nguyện vọng"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete row trigger */}
                          <button
                            onClick={() => deleteAspiration(asp.id)}
                            className="p-2 sm:p-1.5 rounded-lg hover:bg-rose-50 text-neutral-400 hover:text-rose-600 transition-colors cursor-pointer"
                            title="Xóa nguyện vọng này"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Import local uploader file trigger */}
                <div className="pt-3 border-t border-neutral-100 flex justify-end">
                  <label className="text-[10px] text-neutral-400 hover:text-neutral-800 font-semibold cursor-pointer transition-colors inline-flex items-center gap-1 select-none">
                    <Upload className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Nhập dữ liệu JSON từ thiết bị của bạn</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportAspirations}
                      className="hidden"
                    />
                  </label>
                </div>

              </div>
            )}
          </section>

        </main>
      )}

      <footer className="border-t border-neutral-100 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-neutral-400 font-light">
        <div id="author-credit-text">
          <span>Công cụ tính điểm tinh giản dành cho Học sinh Việt Nam</span>
        </div>
        <div className="text-left md:text-right text-[11px] font-mono leading-normal text-neutral-400">
          <span className="font-sans font-medium text-neutral-500 block">Phát (Boulevard)</span>
          <a href="mailto:thuanphat26092008@gmail.com" className="hover:text-neutral-600 transition-colors select-text">thuanphat26092008@gmail.com</a>
        </div>
      </footer>

    </div>
  );
}
