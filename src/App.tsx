import React, { useState, useMemo } from "react";
import { 
  motion, 
  AnimatePresence 
} from "motion/react";
import { 
  AlertCircle, 
  HelpCircle, 
  ChevronDown,
  RotateCcw
} from "lucide-react";

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

interface SubjectState {
  id: string; // "toan" | "van" | "anh" | "ly" | etc.
  name: string;
  score: string;
  multiplier: string;
  isFixed: boolean;
}

export default function App() {
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
      <header className="pt-2 pb-6 flex flex-col sm:flex-row justify-between items-baseline border-b border-neutral-100 gap-4">
        <div>
          <h1 className="text-3xl font-light tracking-tighter flex items-center select-none">
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
            <span className="font-bold">30</span>
          </h1>
        </div>
      </header>

      {/* Grid wrapper handles both desktop (col split) and ultra cohesive responsive sizes for small screens & scaled browser windows */}
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
                <RotateCcw className="w-3 h-3" />
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
                        {comb.finalScore.toFixed(1)}
                        <span className="text-base select-none ml-1 inline-flex items-baseline">
                          <span className="font-medium text-neutral-400">/</span>
                          <span className="font-light text-neutral-300">30</span>
                        </span>
                      </span>
                      
                      {comb.actualPriority > 0 && (
                        <div className="text-[10px] text-neutral-400 font-mono">
                          Thi: {comb.unweightedScore.toFixed(1)} + ƯT: {comb.actualPriority.toFixed(1)}
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
