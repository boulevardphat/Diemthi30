export interface Major {
  code: string;
  name: string;
  blocks: string[]; // e.g. ["A00", "A01", "D01"]
}

export interface University {
  id: string;
  name: string;
  code: string;
  logo: string;
  shortName: string;
  location: "Hà Nội" | "TP. HCM" | "Đà Nẵng" | "Khác";
  majors: Major[];
}

export const UNIVERSITIES_DB: University[] = [
  // ====================================================
  // KHỐI 1: ĐẠI HỌC QUỐC GIA HÀ NỘI (VNU)
  // ====================================================
  
  {
    id: "uethhn",
    name: "Trường Đại học Công nghệ - ĐHQG Hà Nội",
    code: "QHI",
    shortName: "VNU-UET",
    location: "Hà Nội",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e5/VNU_Logo.png",
    majors: [
      { code: "CN1", name: "Công nghệ thông tin", blocks: ["A00", "A01"] },
      { code: "CN2", name: "Kỹ thuật máy tính", blocks: ["A00", "A01"] },
      { code: "CN3", name: "Vật lý kỹ thuật", blocks: ["A00", "A01"] },
      { code: "CN4", name: "Cơ kỹ thuật", blocks: ["A00", "A01"] },
      { code: "CN5", name: "Công nghệ kỹ thuật xây dựng", blocks: ["A00", "A01"] },
      { code: "CN6", name: "Công nghệ kỹ thuật cơ – điện tử", blocks: ["A00", "A01"] },
      { code: "CN7", name: "Công nghệ hàng không vũ trụ", blocks: ["A00", "A01"] },
      { code: "CN8", name: "Khoa học máy tính", blocks: ["A00", "A01"] },
      { code: "CN9", name: "Công nghệ kỹ thuật điện tử – viễn thông", blocks: ["A00", "A01"] },
      { code: "CN10", name: "Công nghệ nông nghiệp", blocks: ["A00", "A01"] },
      { code: "CN11", name: "Kỹ thuật điều khiển và tự động hóa", blocks: ["A00", "A01"] },
      { code: "CN12", name: "Trí tuệ nhân tạo", blocks: ["A00", "A01"] },
      { code: "CN13", name: "Kỹ thuật năng lượng", blocks: ["A00", "A01"] },
      { code: "CN14", name: "Hệ thống thông tin", blocks: ["A00", "A01"] },
      { code: "CN15", name: "Mạng máy tính và truyền thông dữ liệu", blocks: ["A00", "A01"] },
      { code: "CN17", name: "Kỹ thuật Robot", blocks: ["A00", "A01"] },
      { code: "CN18", name: "Thiết kế công nghiệp và Đồ họa", blocks: ["A00", "A01"] },
      { code: "CN19", name: "Công nghệ vật liệu", blocks: ["A00", "A01"] },
      { code: "CN20", name: "Khoa học dữ liệu", blocks: ["A00", "A01"] },
      { code: "CN21", name: "Công nghệ sinh học", blocks: ["A00", "A01"] }
    ]
  },
  
  {
    id: "hus",
    name: "Trường Đại học Khoa học Tự nhiên - ĐHQG Hà Nội",
    code: "QHT",
    shortName: "VNU-HUS",
    location: "Hà Nội",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e5/VNU_Logo.png",
    majors: [
      { code: "QHT01", name: "Toán học", blocks: ["A00", "A01", "C01", "D07", "D08", "X26"] },
      { code: "QHT02", name: "Toán tin", blocks: ["A00", "A01", "C01", "D07", "D08", "X26"] },
      { code: "QHT08", name: "Sinh học", blocks: ["B00", "B08", "D08"] },
      { code: "QHT98", name: "Khoa học máy tính và thông tin", blocks: ["A00", "A01", "C01", "D07", "D08", "X26"] },
      { code: "QHT93", name: "Khoa học dữ liệu", blocks: ["A00", "A01", "C01", "D07", "D08", "X26"] },
      { code: "QHT03", name: "Vật lý học", blocks: ["A00", "A01", "A02", "B00", "C01", "C02", "D07", "X02", "X06", "X26"] },
      { code: "QHT04", name: "Khoa học vật liệu", blocks: ["A00", "A01", "A02", "B00", "C01", "C02", "D07", "X02", "X06", "X26"] },
      { code: "QHT99", name: "Công nghệ bán dẫn", blocks: ["A00", "A01", "A02", "B00", "C01", "C02", "D07", "X02", "X06", "X26"] },
      { code: "QHT05", name: "Công nghệ kỹ thuật hạt nhân", blocks: ["A00", "A01", "A02", "B00", "C01", "C02", "D07", "X02", "X06", "X26"] },
      { code: "QHT94", name: "Kỹ thuật điện tử và tin học", blocks: ["A00", "A01", "A02", "B00", "C01", "C02", "D07", "X02", "X06", "X26"] },
      { code: "QHT06", name: "Hoá học", blocks: ["A00", "A05", "A06", "B00", "C02", "D07", "X09", "X10", "X11", "X12"] },
      { code: "QHT07", name: "Công nghệ kỹ thuật hoá học", blocks: ["A00", "A05", "A06", "B00", "C02", "D07", "X09", "X10", "X11", "X12"] },
      { code: "QHT43", name: "Hoá dược", blocks: ["A00", "A05", "A06", "B00", "C02", "D07", "X09", "X10", "X11", "X12"] },
      { code: "QHT09", name: "Công nghệ sinh học", blocks: ["A00", "A05", "A06", "B00", "C02", "D07", "X09", "X10", "X11", "X12"] },
      { code: "QHT10", name: "Địa lý tự nhiên", blocks: ["A00", "A01", "A02", "B00", "C01", "C02", "D07", "X02", "X06", "X26"] },
      { code: "QHT12", name: "Quản lý đất đai", blocks: ["A00", "A07", "C01", "C04", "D01", "D10", "X26"] },
      { code: "QHT13", name: "Khoa học môi trường", blocks: ["A00", "B00", "B08", "D07", "X10", "X14"] },
      { code: "QHT15", name: "Công nghệ kỹ thuật môi trường", blocks: ["A00", "B00", "B08", "D07", "X10", "X14"] },
      { code: "QHT16", name: "Khí tượng và khí hậu học", blocks: ["A00", "A01", "C01", "C02", "D07", "X02", "X06", "X26"] },
      { code: "QHT17", name: "Hải dương học", blocks: ["A00", "A01", "C01", "C02", "D07", "X02", "X06", "X26"] },
      { code: "QHT18", name: "Địa chất học", blocks: ["A00", "A01", "C01", "C02", "D07", "X02", "X06", "X26"] },
      { code: "QHT20", name: "Quản lý tài nguyên và môi trường", blocks: ["A00", "A01", "C01", "C04", "D01", "D10", "X26"] },
      { code: "QHT81", name: "Sinh dược học", blocks: ["A00", "A01", "A02", "B00", "C01", "C02", "D07", "X02", "X06", "X26"] },
      { code: "QHT82", name: "Môi trường, sức khỏe và an toàn", blocks: ["A00", "A01", "A02", "B00", "C01", "C02", "D07", "X02", "X06", "X26"] },
      { code: "QHT91", name: "Khoa học thông tin địa không gian", blocks: ["A00", "A01", "C01", "C04", "D01", "D10", "X26"] },
      { code: "QHT92", name: "Tài nguyên và môi trường nước", blocks: ["A00", "A01", "C01", "C04", "D01", "D10", "X26"] },
      { code: "QHT95", name: "Quản lý phát triển đô thị và bất động sản", blocks: ["A00", "A01", "C01", "C04", "D01", "D10", "X26"] },
      { code: "QHT96", name: "Khoa học và công nghệ thực phẩm", blocks: ["A00", "A05", "A06", "B00", "C02", "D07", "X09", "X10", "X11", "X12"] }
    ]
  },
  
  {
    id: "usshhn",
    name: "Trường Đại học Khoa học Xã hội và Nhân văn - ĐHQG Hà Nội",
    code: "QHX",
    shortName: "VNU-USSH",
    location: "Hà Nội",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e5/VNU_Logo.png",
    majors: [
      { code: "7320104", name: "Báo chí", blocks: ["C00", "D01", "D04", "D78"] },
      { code: "7810103", name: "Quản trị dịch vụ du lịch và lữ hành", blocks: ["C00", "D01", "D78"] },
      { code: "7310201", name: "Chính trị học", blocks: ["C00", "D01", "D78"] },
      { code: "7320106", name: "Quan hệ công chúng", blocks: ["C00", "D01", "D78"] },
      { code: "7810201", name: "Quản trị khách sạn", blocks: ["C00", "D01", "D78"] },
      { code: "7310601", name: "Đông Nam Á học", blocks: ["C00", "D01", "D04", "D78"] },
      { code: "7310608", name: "Đông phương học", blocks: ["C00", "D01", "D04", "D78"] },
      { code: "7310614", name: "Hàn Quốc học", blocks: ["C00", "D01", "D04", "D78"] },
      { code: "7310630", name: "Khoa học Quản lý", blocks: ["C00", "D01", "D78"] },
      { code: "7229001", name: "Lịch sử", blocks: ["C00", "D01", "D78"] },
      { code: "7320303", name: "Lưu trữ học", blocks: ["C00", "D01", "D78"] },
      { code: "7229020", name: "Ngôn ngữ học", blocks: ["C00", "D01", "D78"] },
      { code: "7310401", name: "Nhân học", blocks: ["C00", "D01", "D78"] },
      { code: "7310604", name: "Nhật Bản học", blocks: ["C00", "D01", "D78"] },
      { code: "7340405", name: "Quản lý thông tin", blocks: ["C00", "D01", "D78"] },
      { code: "7810101", name: "Quản trị khách sạn", blocks: ["C00", "D01", "D78"] },
      { code: "7810101", name: "Quản trị khách sạn", blocks: ["C00", "D01", "D78"] },
      { code: "7810101", name: "Quản trị dịch vụ du lịch và lữ hành", blocks: ["C00", "D01", "D78"] },
      { code: "7310302", name: "Triết học", blocks: ["C00", "D01", "D78"] },
      { code: "7320201", name: "Thông tin - Thư viện", blocks: ["C00", "D01", "D78"] },
      { code: "7310201", name: "Tôn giáo học", blocks: ["C00", "D01", "D78"] },
      { code: "7229030", name: "Văn học", blocks: ["C00", "D01", "D78"] },
      { code: "7310630", name: "Văn hóa học", blocks: ["C00", "D01", "D78"] },
      { code: "7310633", name: "Việt Nam học", blocks: ["C00", "D01", "D78"] },
      { code: "7310301", name: "Xã hội học", blocks: ["C00", "D01", "D78"] },
      { code: "7340404", name: "Quản trị văn phòng", blocks: ["C00", "D01", "D78"] },
      { code: "7760101", name: "Công tác xã hội", blocks: ["C00", "D01", "D78"] }
    ]
  },
  
  {
    id: "ueb",
    name: "Trường Đại học Kinh tế - ĐHQG Hà Nội",
    code: "QHE",
    shortName: "VNU-UEB",
    location: "Hà Nội",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e5/VNU_Logo.png",
    majors: [
      { code: "7310101", name: "Kinh tế quốc tế", blocks: ["A01", "D01", "D09", "D10"] },
      { code: "7340101", name: "Quản trị kinh doanh", blocks: ["A01", "D01", "D09", "D10"] },
      { code: "7340201", name: "Tài chính - Ngân hàng", blocks: ["A01", "D01", "D09", "D10"] },
      { code: "7340301", name: "Kế toán", blocks: ["A01", "D01", "D09", "D10"] },
      { code: "7340405", name: "Hệ thống thông tin quản lý", blocks: ["A01", "D01", "D09", "D10"] },
      { code: "7310108", name: "Toán kinh tế", blocks: ["A01", "D01", "D09", "D10"] },
      { code: "7340120", name: "Kinh doanh quốc tế", blocks: ["A01", "D01", "D09", "D10"] },
      { code: "7340122", name: "Thương mại điện tử", blocks: ["A01", "D01", "D09", "D10"] },
      { code: "7340205", name: "Công nghệ tài chính", blocks: ["A01", "D01", "D09", "D10"] },
      { code: "7380101", name: "Luật", blocks: ["A01", "D01", "D09", "D10"] }
    ]
  },


  {
    id: "ulis",
    name: "Trường Đại học Ngoại ngữ - ĐHQG Hà Nội",
    code: "QHF",
    shortName: "VNU-ULIS",
    location: "Hà Nội",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e5/VNU_Logo.png",
    majors: [
      { code: "7220201", name: "Ngôn ngữ Anh", blocks: ["D01", "D08", "A01", "D15", "D14", "D07"] },
      { code: "7220202", name: "Ngôn ngữ Nga", blocks: ["D42", "D62", "D02", "D01", "D08", "A01"] },
      { code: "7220203", name: "Ngôn ngữ Pháp", blocks: ["D44", "D64", "D03", "D01", "D08", "A01"] },
      { code: "7220204", name: "Ngôn ngữ Trung Quốc", blocks: ["D45", "D65", "D04", "D01", "D08", "A01"] },
      { code: "7220205", name: "Ngôn ngữ Đức", blocks: ["D41", "D61", "D05", "D01", "D08", "A01"] },
      { code: "7220209", name: "Ngôn ngữ Nhật", blocks: ["D43", "D63", "D06", "D01", "D08", "A01"] },
      { code: "7220210", name: "Ngôn ngữ Hàn Quốc", blocks: ["D01", "D07", "D08", "A01"] },
      { code: "7220211", name: "Ngôn ngữ Ả Rập", blocks: ["D01", "D08", "A01"] },
      { code: "7220212", name: "Văn hóa và truyền thông xuyên quốc gia", blocks: ["D01", "D08", "A01"] },
      { code: "7220101", name: "Tiếng Việt và Văn hóa Việt Nam", blocks: ["D01", "D08", "A01"] },
      { code: "7310401", name: "Tâm lí học giáo dục liên văn hoá", blocks: ["D01", "D08", "A01"] },
      { code: "7220206", name: "Ngôn ngữ Ý", blocks: ["D01", "D08", "A01"] },
      { code: "7220207", name: "Ngôn ngữ Tây Ban Nha", blocks: ["D01", "D08", "A01"] },
      { code: "7220208", name: "Ngôn ngữ Bồ Đào Nha", blocks: ["D01", "D08", "A01"] },
      { code: "7220213", name: "Ngôn ngữ Thái Lan", blocks: ["D01", "D08", "A01"] }
    ]
  },

  // ====================================================
  // KHỐI 2: ĐẠI HỌC QUỐC GIA TP.HCM (VNUHCM)
  // ====================================================
  
  {
    id: "hcmut",
    name: "Trường Đại học Bách khoa - ĐHQG TP.HCM",
    code: "QSB",
    shortName: "HCMUT",
    location: "TP. HCM",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Logo_HCMUT.PNG",
    majors: [
      { code: "101", name: "Khoa học Máy tính", blocks: ["A00", "A01"] },
      { code: "102", name: "Kỹ thuật Máy tính", blocks: ["A00", "A01"] },
      { code: "103", name: "Vật lý Kỹ thuật", blocks: ["A00", "A01"] },
      { code: "104", name: "Cơ kỹ thuật", blocks: ["A00", "A01"] },
      { code: "105", name: "Kỹ thuật Điện - Điện tử", blocks: ["A00", "A01"] },
      { code: "106", name: "Kỹ thuật Điều khiển và Tự động hóa", blocks: ["A00", "A01"] },
      { code: "107", name: "Kỹ thuật Cơ điện tử", blocks: ["A00", "A01"] },
      { code: "108", name: "Kỹ thuật Cơ khí", blocks: ["A00", "A01"] },
      { code: "109", name: "Kỹ thuật Hóa học", blocks: ["A00", "B00"] },
      { code: "110", name: "Công nghệ Thực phẩm", blocks: ["A00", "B00"] },
      { code: "111", name: "Kỹ thuật Xây dựng", blocks: ["A00", "A01"] },
      { code: "112", name: "Kỹ thuật Môi trường", blocks: ["A00", "B00"] },
      { code: "113", name: "Quản lý Công nghiệp", blocks: ["A00", "A01", "D01"] },
      { code: "114", name: "Logistics và Quản lý chuỗi cung ứng", blocks: ["A00", "A01", "D01"] },
      { code: "115", name: "Công nghệ Sinh học", blocks: ["A00", "B00"] },
      { code: "116", name: "Kiến trúc", blocks: ["V00", "V01"] },
      { code: "117", name: "Kỹ thuật Năng lượng", blocks: ["A00", "A01"] },
      { code: "118", name: "Kỹ thuật Dầu khí", blocks: ["A00", "A01"] },
      { code: "119", name: "Thiết kế Vi mạch", blocks: ["A00", "A01"] },
      { code: "120", name: "Công nghệ Vật liệu", blocks: ["A00", "B00"] }
    ]
  },
  
  {
    id: "uit",
    name: "Trường Đại học Công nghệ Thông tin - ĐHQG TP.HCM",
    code: "QSC",
    shortName: "UIT",
    location: "TP. HCM",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/14/Logo_UIT.png",
    majors: [
      { code: "7480101", name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01", "D07"] },
      { code: "7480104", name: "Hệ thống thông tin", blocks: ["A00", "A01", "D01", "D07"] },
      { code: "7480101", name: "Khoa học máy tính", blocks: ["A00", "A01", "D01", "D07"] },
      { code: "7480103", name: "Kỹ thuật phần mềm", blocks: ["A00", "A01", "D01", "D07"] },
      { code: "7480106", name: "Kỹ thuật máy tính", blocks: ["A00", "A01", "D01", "D07"] },
      { code: "7480102", name: "Mạng máy tính và truyền thông dữ liệu", blocks: ["A00", "A01", "D01", "D07"] },
      { code: "7480201", name: "An toàn thông tin", blocks: ["A00", "A01", "D01", "D07"] },
      { code: "7340122", name: "Thương mại điện tử", blocks: ["A00", "A01", "D01", "D07"] },
      { code: "7480109", name: "Khoa học dữ liệu", blocks: ["A00", "A01", "D01", "D07"] },
      { code: "7480120", name: "Trí tuệ nhân tạo", blocks: ["A00", "A01", "D01", "D07"] },
      { code: "7480108", name: "Thiết kế vi mạch", blocks: ["A00", "A01", "D01", "D07"] },
      { code: "7320106", name: "Truyền thông đa phương tiện", blocks: ["A00", "A01", "D01", "D07"] }
    ]
  },
  {
    id: "hcmus",
    name: "Trường Đại học Khoa học Tự nhiên - ĐHQG TP.HCM",
    code: "QST",
    shortName: "HCMUS",
    location: "TP. HCM",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/be/Logo_khoa_hoc_tu_nhien_tphcm.png",
    majors: [
      { code: "7480201", name: "Máy tính và Công nghệ thông tin", blocks: ["A00", "A01", "D01", "D07", "D08"] },
      { code: "7460101", name: "Toán học / Toán tin / KHDL", blocks: ["A00", "A01", "D01", "D07"] },
      { code: "7440102", name: "Vật lý học", blocks: ["A00", "A01"] },
      { code: "7440112", name: "Hóa học", blocks: ["A00", "B00", "D07"] },
      { code: "7420201", name: "Công nghệ Sinh học", blocks: ["A00", "B00", "B08", "D07"] },
      { code: "7420101", name: "Sinh học", blocks: ["B00", "B08", "D08"] },
      { code: "7440221", name: "Khoa học Vật liệu", blocks: ["A00", "A01", "B00", "D07"] },
      { code: "7520207", name: "Kỹ thuật Điện tử - Viễn thông", blocks: ["A00", "A01"] }
    ]
  },
  
  {
    id: "uel",
    name: "Trường Đại học Kinh tế - Luật - ĐHQG TP.HCM",
    code: "QSE",
    shortName: "UEL",
    location: "TP. HCM",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e5/VNU_Logo.png",
    majors: [
      { code: "7310101", name: "Kinh tế", blocks: ["A00", "A01", "D01"] },
      { code: "7310106", name: "Kinh tế quốc tế", blocks: ["A00", "A01", "D01"] },
      { code: "7310108", name: "Toán kinh tế", blocks: ["A00", "A01", "D01"] },
      { code: "7340101", name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"] },
      { code: "7340115", name: "Marketing", blocks: ["A00", "A01", "D01"] },
      { code: "7340120", name: "Kinh doanh quốc tế", blocks: ["A00", "A01", "D01"] },
      { code: "7340122", name: "Thương mại điện tử", blocks: ["A00", "A01", "D01"] },
      { code: "7340201", name: "Tài chính - Ngân hàng", blocks: ["A00", "A01", "D01"] },
      { code: "7340205", name: "Công nghệ tài chính", blocks: ["A00", "A01", "D01"] },
      { code: "7340301", name: "Kế toán", blocks: ["A00", "A01", "D01"] },
      { code: "7340302", name: "Kiểm toán", blocks: ["A00", "A01", "D01"] },
      { code: "7340403", name: "Quản lý công", blocks: ["A00", "A01", "D01"] },
      { code: "7340405", name: "Hệ thống thông tin quản lý", blocks: ["A00", "A01", "D01"] },
      { code: "7380101", name: "Luật", blocks: ["A00", "A01", "D01"] },
      { code: "7380107", name: "Luật kinh tế", blocks: ["A00", "A01", "D01"] },
      { code: "7380101", name: "Luật (Chuyên ngành Luật Dân sự)", blocks: ["A00", "A01", "D01"] },
      { code: "7380101", name: "Luật (Chuyên ngành Luật Tài chính – Ngân hàng)", blocks: ["A00", "A01", "D01"] },
      { code: "7380101", name: "Luật (Chuyên ngành Luật và Chính sách công)", blocks: ["A00", "A01", "D01"] },
      { code: "7380101", name: "Luật (Chuyên ngành Luật và Công nghệ)", blocks: ["A00", "A01", "D01"] },
      { code: "7380107", name: "Luật kinh tế (Chuyên ngành Luật Kinh doanh)", blocks: ["A00", "A01", "D01"] },
      { code: "7380107", name: "Luật kinh tế (Chuyên ngành Luật Thương mại quốc tế)", blocks: ["A00", "A01", "D01"] },
      { code: "7340120", name: "Kinh doanh quốc tế (Chương trình liên kết quốc tế)", blocks: ["A00", "A01", "D01"] },
      { code: "7340101", name: "Quản trị kinh doanh (chuyên ngành Marketing) - Chương trình liên kết quốc tế", blocks: ["A00", "A01", "D01"] }
    ]
  },
  {
    id: "hcmussh",
    name: "Trường Đại học Khoa học Xã hội và Nhân văn - ĐHQG TP.HCM",
    code: "QSX",
    shortName: "USSH",
    location: "TP. HCM",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e5/VNU_Logo.png",
    majors: [
      { code: "7320104", name: "Báo chí", blocks: ["C00", "D01", "D14"] },
      { code: "7310401", name: "Tâm lý học", blocks: ["B00", "C00", "D01", "D14"] },
      { code: "7310608", name: "Đông phương học", blocks: ["C00", "D01", "D04", "D14"] },
      { code: "7310630", name: "Quan hệ Quốc tế", blocks: ["D01", "D14"] },
      { code: "7220201", name: "Ngôn ngữ Anh", blocks: ["D01"] },
      { code: "7220204", name: "Ngôn ngữ Trung Quốc", blocks: ["D01", "D04"] },
      { code: "7810101", name: "Du lịch", blocks: ["C00", "D01", "D14"] }
    ]
  },
  {
    id: "hcmiu",
    name: "Trường Đại học Quốc tế - ĐHQG TP.HCM",
    code: "QSQ",
    shortName: "HCMIU",
    location: "TP. HCM",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e5/VNU_Logo.png",
    majors: [
      { code: "7340101", name: "Quản trị Kinh doanh", blocks: ["A00", "A01", "D01"] },
      { code: "7340201", name: "Tài chính - Ngân hàng", blocks: ["A00", "A01", "D01"] },
      { code: "7510605", name: "Logistics và Quản lý Chuỗi cung ứng", blocks: ["A00", "A01", "D01"] },
      { code: "7480201", name: "Công nghệ Thông tin", blocks: ["A00", "A01", "D01"] },
      { code: "7480109", name: "Khoa học Dữ liệu", blocks: ["A00", "A01", "D01"] },
      { code: "7420201", name: "Công nghệ Sinh học", blocks: ["A00", "B00", "B08"] }
    ]
  },
  {
    id: "agu",
    name: "Trường Đại học An Giang - ĐHQG TP.HCM",
    code: "QSA",
    shortName: "AGU",
    location: "Khác",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e5/VNU_Logo.png",
    majors: [
      { code: "7140209", name: "Sư phạm Toán học", blocks: ["A00", "A01"] },
      { code: "7140231", name: "Sư phạm Tiếng Anh", blocks: ["D01"] },
      { code: "7480201", name: "Công nghệ Thông tin", blocks: ["A00", "A01", "D01"] },
      { code: "7340101", name: "Quản trị Kinh doanh", blocks: ["A00", "A01", "D01"] },
      { code: "7620105", name: "Chăn nuôi", blocks: ["A00", "B00"] }
    ]
  },

  // ====================================================
  // KHỐI 3: TRƯỜNG ĐẦU NGÀNH MIỀN BẮC
  // ====================================================
  {
    id: "hust",
    name: "Đại học Bách khoa Hà Nội",
    code: "BKA",
    shortName: "HUST",
    location: "Hà Nội",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Logo_Hust.png",
    majors: [
      { code: "IT1", name: "Khoa học Máy tính", blocks: ["A00", "A01"] },
      { code: "IT2", name: "Kỹ thuật Máy tính", blocks: ["A00", "A01"] },
      { code: "IT-E6", name: "Công nghệ thông tin (Global ICT)", blocks: ["A00", "A01"] },
      { code: "EE1", name: "Kỹ thuật Điện", blocks: ["A00", "A01"] },
      { code: "EE2", name: "Kỹ thuật Điều khiển và Tự động hóa", blocks: ["A00", "A01"] },
      { code: "ET1", name: "Kỹ thuật Điện tử - Viễn thông", blocks: ["A00", "A01"] },
      { code: "MI1", name: "Toán tin", blocks: ["A00", "A01"] },
      { code: "CH1", name: "Kỹ thuật Hóa học", blocks: ["A00", "B00"] },
      { code: "TE1", name: "Kỹ thuật Cơ khí", blocks: ["A00", "A01"] },
      { code: "TE2", name: "Kỹ thuật Ô tô", blocks: ["A00", "A01"] },
      { code: "EM1", name: "Quản trị Kinh doanh", blocks: ["A00", "A01", "D01"] },
      { code: "EM3", name: "Quản trị Kinh doanh (FIBAs)", blocks: ["A00", "A01", "D01"] },
      { code: "FL1", name: "Tiếng Anh KHKT và Công nghệ", blocks: ["D01"] }
    ]
  },
  {
    id: "neu",
    name: "Trường Đại học Kinh tế Quốc dân",
    code: "KHA",
    shortName: "NEU",
    location: "Hà Nội",
    logo: "https://upload.wikimedia.org/wikipedia/vi/d/d4/Logo_Kinh_t%E1%BA%BF_Qu%E1%BB%91c_d%C3%A2n.png",
    majors: [
      { code: "7310101", name: "Kinh tế học", blocks: ["A00", "A01", "D01", "D07"] },
      { code: "7340101", name: "Quản trị Kinh doanh", blocks: ["A00", "A01", "D01", "D07"] },
      { code: "7340115", name: "Marketing", blocks: ["A00", "A01", "D01", "D07"] },
      { code: "7340201", name: "Tài chính - Ngân hàng", blocks: ["A00", "A01", "D01", "D07"] },
      { code: "7340301", name: "Kế toán", blocks: ["A00", "A01", "D01", "D07"] },
      { code: "7340120", name: "Kinh doanh Quốc tế", blocks: ["A01", "D01", "D07"] },
      { code: "7510605", name: "Logistics và Quản lý chuỗi cung ứng", blocks: ["A00", "A01", "D01", "D07"] },
      { code: "7480201", name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01", "D07"] },
      { code: "7480109", name: "Khoa học dữ liệu trong Kinh tế và Kinh doanh", blocks: ["A00", "A01", "D01", "D07"] }
    ]
  },
  {
    id: "ftu",
    name: "Trường Đại học Ngoại thương (Hà Nội)",
    code: "NTH",
    shortName: "FTU",
    location: "Hà Nội",
    logo: "https://upload.wikimedia.org/wikipedia/vi/4/4e/Logo_FTU.png",
    majors: [
      { code: "NTH01", name: "Kinh tế và Kinh doanh Quốc tế", blocks: ["A00", "A01", "D01", "D07"] },
      { code: "NTH02", name: "Quản trị Kinh doanh & Luật", blocks: ["A00", "A01", "D01", "D03", "D07"] },
      { code: "NTH03", name: "Tài chính - Ngân hàng & Kế toán", blocks: ["A00", "A01", "D01", "D07"] },
      { code: "NTH04", name: "Ngôn ngữ Anh, Pháp, Trung, Nhật", blocks: ["D01", "D03", "D04", "D06"] },
      { code: "NTH05", name: "Kinh tế đối ngoại", blocks: ["A00", "A01", "D01", "D07"] }
    ]
  },
  {
    id: "hmu",
    name: "Trường Đại học Y Hà Nội",
    code: "YHB",
    shortName: "HMU",
    location: "Hà Nội",
    logo: "https://upload.wikimedia.org/wikipedia/vi/1/1d/Logo_YHN.png",
    majors: [
      { code: "7720101", name: "Y khoa", blocks: ["B00", "B08"] },
      { code: "7720110", name: "Răng - Hàm - Mặt", blocks: ["B00"] },
      { code: "7720115", name: "Y học cổ truyền", blocks: ["B00"] },
      { code: "7720301", name: "Điều dưỡng", blocks: ["B00", "B08"] },
      { code: "7720601", name: "Kỹ thuật Xét nghiệm y học", blocks: ["B00", "B08"] }
    ]
  },

  // ====================================================
  // KHỐI 4: TRƯỜNG ĐẦU NGÀNH/NỔI TIẾNG MIỀN NAM
  // ====================================================
  {
    id: "ueh",
    name: "Đại học Kinh tế Thành phố Hồ Chí Minh",
    code: "KSA",
    shortName: "UEH",
    location: "TP. HCM",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Logo_UEH_xanh.png",
    majors: [
      { code: "7340121", name: "Kinh doanh thương mại", blocks: ["A00", "A01", "D01", "D07"] },
      { code: "7340101", name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01", "D07"] },
      { code: "7340115", name: "Marketing", blocks: ["A00", "A01", "D01", "D07"] },
      { code: "7340120", name: "Kinh doanh quốc tế", blocks: ["A00", "A01", "D01", "D07"] },
      { code: "7510605", name: "Logistics và Quản lý chuỗi cung ứng", blocks: ["A00", "A01", "D01", "D07"] },
      { code: "7340201", name: "Tài chính - Ngân hàng", blocks: ["A00", "A01", "D01", "D07"] },
      { code: "7340301", name: "Kế toán", blocks: ["A00", "A01", "D01", "D07"] },
      { code: "7480201", name: "Công nghệ Thông tin", blocks: ["A00", "A01", "D01", "D07"] },
      { code: "7480109", name: "Khoa học Dữ liệu", blocks: ["A00", "A01", "D01", "D07"] }
    ]
  },
  {
    id: "ump",
    name: "Đại học Y Dược TP.HCM",
    code: "YDS",
    shortName: "UMP",
    location: "TP. HCM",
    logo: "https://upload.wikimedia.org/wikipedia/vi/3/3a/Logo_Y_D%C6%B0%E1%BB%A3c_TP_HCM.svg",
    majors: [
      { code: "7720101", name: "Y khoa", blocks: ["B00"] },
      { code: "7720110", name: "Răng - Hàm - Mặt", blocks: ["B00"] },
      { code: "7720201", name: "Dược học", blocks: ["A00", "B00"] },
      { code: "7720115", name: "Y học cổ truyền", blocks: ["B00"] },
      { code: "7720301", name: "Điều dưỡng", blocks: ["B00"] },
      { code: "7720601", name: "Kỹ thuật Xét nghiệm y học", blocks: ["B00"] }
    ]
  },
  {
    id: "pnt",
    name: "Trường Đại học Y khoa Phạm Ngọc Thạch",
    code: "TYS",
    shortName: "PNTU",
    location: "TP. HCM",
    logo: "https://upload.wikimedia.org/wikipedia/vi/b/be/Logo_Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_Y_khoa_Ph%E1%BA%A1m_Ng%E1%BB%8Dc_Th%E1%BA%A1ch.png",
    majors: [
      { code: "7720101", name: "Y khoa", blocks: ["B00"] },
      { code: "7720110", name: "Răng - Hàm - Mặt", blocks: ["B00"] },
      { code: "7720201", name: "Dược học", blocks: ["B00"] },
      { code: "7720301", name: "Điều dưỡng", blocks: ["B00"] },
      { code: "7720601", name: "Kỹ thuật Xét nghiệm y học", blocks: ["B00"] }
    ]
  },
  {
    id: "hcmute",
    name: "Trường Đại học Sư phạm Kỹ thuật TP.HCM",
    code: "SPK",
    shortName: "HCMUTE",
    location: "TP. HCM",
    logo: "https://upload.wikimedia.org/wikipedia/vi/f/f6/Logo_Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_S%C6%B0_ph%E1%BA%A1m_K%E1%BB%B9_thu%E1%BA%ADt_Th%C3%A0nh_ph%E1%BB%91_H%E1%BB%93_Ch%C3%AD_Minh.png",
    majors: [
      { code: "7480101", name: "Công nghệ Thông tin", blocks: ["A00", "A01", "D01"] },
      { code: "7480104", name: "Hệ thống Thông tin", blocks: ["A00", "A01", "D01"] },
      { code: "7510205", name: "Công nghệ Kỹ thuật Ô tô", blocks: ["A00", "A01", "D01"] },
      { code: "7520114", name: "Công nghệ Kỹ thuật Cơ điện tử", blocks: ["A00", "A01", "D01"] },
      { code: "7520201", name: "Công nghệ Kỹ thuật Điện, Điện tử", blocks: ["A00", "A01", "D01"] },
      { code: "7520216", name: "Công nghệ Kỹ thuật Điều khiển và Tự động hóa", blocks: ["A00", "A01", "D01"] },
      { code: "7510406", name: "Công nghệ Môi trường", blocks: ["A00", "B00", "D07"] },
      { code: "7340122", name: "Thương mại điện tử", blocks: ["A00", "A01", "D01"] }
    ]
  },
  
  {
    id: "tdt",
    name: "Trường Đại học Tôn Đức Thắng",
    code: "DTT",
    shortName: "TDTU",
    location: "TP. HCM",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/ea/Logo_TDTU.png",
    majors: [
      { code: "7220201", name: "Ngôn ngữ Anh", blocks: ["D01"] },
      { code: "7220204", name: "Ngôn ngữ Trung Quốc", blocks: ["D01", "D04"] },
      { code: "7810101", name: "Du lịch", blocks: ["C00", "D01", "D14"] },
      { code: "7310301", name: "Xã hội học", blocks: ["C00", "D01"] },
      { code: "7760101", name: "Công tác xã hội", blocks: ["C00", "D01"] },
      { code: "7310206", name: "Quan hệ quốc tế", blocks: ["D01", "D14"] },
      { code: "7340101", name: "Quản trị Kinh doanh", blocks: ["A00", "A01", "D01"] },
      { code: "7340201", name: "Tài chính - Ngân hàng", blocks: ["A00", "A01", "D01"] },
      { code: "7340205", name: "Công nghệ tài chính", blocks: ["A00", "A01", "D01"] },
      { code: "7340301", name: "Kế toán", blocks: ["A00", "A01", "D01"] },
      { code: "7380101", name: "Luật", blocks: ["A00", "A01", "D01", "C00"] },
      { code: "7720201", name: "Dược học", blocks: ["B00", "A00"] },
      { code: "7420204", name: "Khoa học y sinh", blocks: ["B00", "A00"] },
      { code: "7420201", name: "Công nghệ sinh học", blocks: ["B00", "A00"] },
      { code: "7520301", name: "Kỹ thuật hóa học", blocks: ["A00", "B00"] },
      { code: "7480101", name: "Khoa học máy tính", blocks: ["A00", "A01", "D01"] },
      { code: "7480102", name: "Mạng máy tính và truyền thông dữ liệu", blocks: ["A00", "A01", "D01"] },
      { code: "7480103", name: "Kỹ thuật phần mềm", blocks: ["A00", "A01", "D01"] },
      { code: "7480104", name: "Hệ thống thông tin", blocks: ["A00", "A01", "D01"] },
      { code: "7520201", name: "Kỹ thuật điện", blocks: ["A00", "A01"] },
      { code: "7520207", name: "Kỹ thuật điện tử - viễn thông", blocks: ["A00", "A01"] },
      { code: "7520216", name: "Kỹ thuật điều khiển và tự động hóa", blocks: ["A00", "A01"] }
    ]
  },
  {
    id: "sgu",
    name: "Trường Đại học Sài Gòn",
    code: "SGD",
    shortName: "SGU",
    location: "TP. HCM",
    logo: "https://upload.wikimedia.org/wikipedia/vi/d/db/Logo_SGU.png",
    majors: [
      { code: "7140209", name: "Sư phạm Toán học", blocks: ["A00", "A01"] },
      { code: "7140231", name: "Sư phạm Tiếng Anh", blocks: ["D01"] },
      { code: "7140217", name: "Sư phạm Ngữ văn", blocks: ["C00", "D01"] },
      { code: "7480201", name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"] },
      { code: "7480103", name: "Kỹ thuật phần mềm", blocks: ["A00", "A01", "D01"] },
      { code: "7340101", name: "Quản trị Kinh doanh", blocks: ["A00", "A01", "D01"] },
      { code: "7340201", name: "Tài chính - Ngân hàng", blocks: ["A00", "A01", "D01"] }
    ]
  },
  {
    id: "nlu",
    name: "Trường Đại học Nông Lâm TP.HCM",
    code: "NLS",
    shortName: "NLU",
    location: "TP. HCM",
    logo: "https://upload.wikimedia.org/wikipedia/vi/2/23/Logo_nonglam.png",
    majors: [
      { code: "7540101", name: "Công nghệ thực phẩm", blocks: ["A00", "A01", "B00", "D07"] },
      { code: "7620105", name: "Chăn nuôi", blocks: ["A00", "B00"] },
      { code: "7720201", name: "Thú y", blocks: ["A00", "B00", "D07", "D08"] },
      { code: "7620201", name: "Nông học", blocks: ["A00", "B00", "D08"] },
      { code: "7420201", name: "Công nghệ sinh học", blocks: ["A00", "B00"] },
      { code: "7510205", name: "Công nghệ kỹ thuật ô tô", blocks: ["A00", "A01", "D01"] }
    ]
  },
  {
    id: "hcmarc",
    name: "Trường Đại học Kiến trúc TP.HCM",
    code: "KTS",
    shortName: "UAH",
    location: "TP. HCM",
    logo: "https://upload.wikimedia.org/wikipedia/vi/9/9d/Logo_Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_Ki%E1%BA%BFn_tr%C3%BAc_Th%C3%A0nh_ph%E1%BB%91_H%E1%BB%93_Ch%C3%AD_Minh.svg",
    majors: [
      { code: "7580101", name: "Kiến trúc", blocks: ["V00", "V01"] },
      { code: "7580102", name: "Kiến trúc cảnh quan", blocks: ["V00", "V01"] },
      { code: "7580105", name: "Quy hoạch vùng và đô thị", blocks: ["V00", "V01"] },
      { code: "7580201", name: "Kỹ thuật Xây dựng", blocks: ["A00", "A01"] },
      { code: "7210403", name: "Thiết kế Đồ họa", blocks: ["H01", "H06"] },
      { code: "7210404", name: "Thiết kế Nội thất", blocks: ["H01", "H06"] }
    ]
  },

  // ====================================================
  // KHỐI 5: TRƯỜNG ĐỊA PHƯƠNG & TƯ THỤC TIÊU BIỂU MIỀN NAM
  // ====================================================
  {
    id: "ctu",
    name: "Trường Đại học Cần Thơ",
    code: "TGD",
    shortName: "CTU",
    location: "Khác",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/07/Logo_Can_Tho_University.png",
    majors: [
      { code: "7480201", name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01", "D07"] },
      { code: "7480103", name: "Kỹ thuật phần mềm", blocks: ["A00", "A01", "D01", "D07"] },
      { code: "7340101", name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01", "D07"] },
      { code: "7340120", name: "Kinh doanh quốc tế", blocks: ["A00", "A01", "D01", "D07"] },
      { code: "7220201", name: "Ngôn ngữ Anh", blocks: ["D01", "D14", "D15"] },
      { code: "7620201", name: "Nông học", blocks: ["B00", "A00"] },
      { code: "7620301", name: "Nuôi trồng thuỷ sản", blocks: ["B00", "A00"] }
    ]
  },
  {
    id: "tdmu",
    name: "Trường Đại học Thủ Dầu Một",
    code: "TDM",
    shortName: "TDMU",
    location: "Khác",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Logo_Thu_Dau_Mot_University_2020.jpg",
    majors: [
      { code: "7480201", name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"] },
      { code: "7480103", name: "Kỹ thuật phần mềm", blocks: ["A00", "A01", "D01"] },
      { code: "7340101", name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01", "C00"] },
      { code: "7340301", name: "Kế toán", blocks: ["A00", "A01", "D01", "C00"] },
      { code: "7140231", name: "Sư phạm Tiếng Anh", blocks: ["D01"] }
    ]
  },
  {
    id: "dnu",
    name: "Trường Đại học Đồng Nai",
    code: "DND",
    shortName: "DNU",
    location: "Khác",
    logo: "https://upload.wikimedia.org/wikipedia/vi/thumb/9/91/Logo_Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_%C4%90%E1%BB%93ng_Nai.svg/1200px-Logo_Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BB%93ng_Nai.svg.png",
    majors: [
      { code: "7140209", name: "Sư phạm Toán học", blocks: ["A00", "A01"] },
      { code: "7140217", name: "Sư phạm Ngữ văn", blocks: ["C00", "D01"] },
      { code: "7220201", name: "Ngôn ngữ Anh", blocks: ["D01", "D14", "D15"] },
      { code: "7340101", name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"] },
      { code: "7340301", name: "Kế toán", blocks: ["A00", "A01", "D01"] }
    ]
  },
  {
    id: "fpt",
    name: "Trường Đại học FPT TP.HCM",
    code: "FPT",
    shortName: "FPTU",
    location: "TP. HCM",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/11/FPT_logo_2010.svg",
    majors: [
      { code: "7480201", name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01", "D90"] },
      { code: "7480103", name: "Kỹ thuật phần mềm", blocks: ["A00", "A01", "D01", "D90"] },
      { code: "7480202", name: "An toàn thông tin", blocks: ["A00", "A01", "D01", "D90"] },
      { code: "7480120", name: "Trí tuệ nhân tạo", blocks: ["A00", "A01", "D01", "D90"] },
      { code: "7340101", name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01", "D90"] },
      { code: "7210403", name: "Thiết kế Đồ họa", blocks: ["A00", "A01", "D01", "D90"] }
    ]
  },
  {
    id: "hutech",
    name: "Trường Đại học Công nghệ TP.HCM",
    code: "DKC",
    shortName: "HUTECH",
    location: "TP. HCM",
    logo: "https://upload.wikimedia.org/wikipedia/vi/2/23/Logo_HUTECH.png",
    majors: [
      { code: "7480201", name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01", "C01"] },
      { code: "7480104", name: "Hệ thống thông tin", blocks: ["A00", "A01", "D01", "C01"] },
      { code: "7510205", name: "Công nghệ Kỹ thuật Ô tô", blocks: ["A00", "A01", "D01", "C01"] },
      { code: "7340101", name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01", "C00"] },
      { code: "7340115", name: "Marketing", blocks: ["A00", "A01", "D01", "C00"] },
      { code: "7220201", name: "Ngôn ngữ Anh", blocks: ["D01", "D14", "D15", "A01"] }
    ]
  },
  {
    id: "vlu",
    name: "Trường Đại học Văn Lang",
    code: "DVL",
    shortName: "VLU",
    location: "TP. HCM",
    logo: "https://upload.wikimedia.org/wikipedia/vi/5/52/Logo_Van_Lang_University.png",
    majors: [
      { code: "7340101", name: "Quản trị Kinh doanh", blocks: ["A00", "A01", "D01", "C00"] },
      { code: "7320106", name: "Quan hệ công chúng", blocks: ["A00", "A01", "D01", "C00"] },
      { code: "7210403", name: "Thiết kế Đồ họa", blocks: ["H01", "H02", "H03", "H04", "H06"] },
      { code: "7580101", name: "Kiến trúc", blocks: ["V00", "V01", "H01"] },
      { code: "7480201", name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"] },
      { code: "7720101", name: "Y khoa", blocks: ["B00", "B08", "A00", "D08"] }
    ]
  },
  {
    id: "uef",
    name: "Đại học Kinh tế - Tài chính TP.HCM",
    code: "KTC",
    shortName: "UEF",
    location: "TP. HCM",
    logo: "https://upload.wikimedia.org/wikipedia/vi/5/59/Logo_Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_Kinh_t%E1%BA%BF_-_T%C3%A0i_ch%C3%ADnh_Th%C3%A0nh_ph%E1%BB%91_H%E1%BB%93_Ch%C3%AD_Minh.png",
    majors: [
      { code: "7340101", name: "Quản trị Kinh doanh", blocks: ["A00", "A01", "D01", "C00"] },
      { code: "7340120", name: "Kinh doanh quốc tế", blocks: ["A00", "A01", "D01", "C00"] },
      { code: "7340201", name: "Tài chính - Ngân hàng", blocks: ["A00", "A01", "D01", "C00"] },
      { code: "7340115", name: "Marketing", blocks: ["A00", "A01", "D01", "C00"] },
      { code: "7220201", name: "Ngôn ngữ Anh", blocks: ["D01", "D14", "D15", "A01"] }
    ]
  }
];

export function getLogoFallbackLetters(universityName: string): string {
  if (!universityName) return "ĐH";
  const normalized = universityName.replace("Trường Đại học ", "").replace("Đại học ", "").replace("Học viện ", "");
  const words = normalized.split(/\s+/).filter(w => w.length > 0);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return normalized.substring(0, 2).toUpperCase();
}