const menu = [
    {
      nama_section: "Penerbitan Dokumen Perjalanan",
      isi_section: [
        // {
        //   jenis: "Paspor Biasa 48 Halaman",
        //   has_child: true,
        //   child_section: [
        //     {
        //       judul: "Masa Berlaku 5 Tahun",
        //       data_name: "paspor_biasa_5_tahun"
        //     },
        //     {
        //       judul: "Masa Berlaku 10 Tahun",
        //       data_name: "paspor_biasa_10_tahun"
        //     }
        //   ]
        // },
        {
          jenis: "Paspor Elektronik",
          has_child: true,
          child_section: [
            {
              judul: "Masa Berlaku 5 Tahun",
              data_name: "paspor_elektronik_5_tahun"
            },
            {
              judul: "Masa Berlaku 10 Tahun",
              data_name: "paspor_elektronik_10_tahun"
            }
          ]
        },
        // {
        //   jenis: "Layanan Percepatan Paspor",
        //   has_child: false,
        //   data_name: "layanan_percepatan_paspor"
        // },
      ]
    },
    {
      nama_section: "Penerbitan Izin Tinggal",
      isi_section: [
        {
          jenis: "Izin Tinggal Kunjungan",
          has_child: true,
          child_section: [
            {
              judul: "Masa Berlaku Paling Lama 7 Hari",
              data_name: "izin_tinggal_kunjungan_7_hari"
            },
            {
              judul: "Masa Berlaku Paling Lama 14 Hari",
              data_name: "izin_tinggal_kunjungan_14_hari"
            },
            {
              judul: "Masa Berlaku Paling Lama 30 Hari",
              data_name: "izin_tinggal_kunjungan_30_hari"
            },
            {
              judul: "Masa Berlaku Paling Lama 60 Hari",
              data_name: "izin_tinggal_kunjungan_60_hari"
            },
            {
              judul: "Masa Berlaku Paling Lama 90 Hari",
              data_name: "izin_tinggal_kunjungan_90_hari"
            },
            {
              judul: "Masa Berlaku Paling Lama 180 Hari",
              data_name: "izin_tinggal_kunjungan_180_hari"
            }
          ]
        },
        {
          jenis: "Izin Tinggal Terbatas",
          has_child: true,
          child_section: [
            {
              judul: "Masa Berlaku Paling Lama 30 Hari",
              data_name: "izin_tinggal_Terbatas_30_hari"
            },
            {
              judul: "Masa Berlaku Paling Lama 60 Hari",
              data_name: "izin_tinggal_Terbatas_60_hari"
            },
            {
              judul: "Masa Berlaku Paling Lama 90 Hari",
              data_name: "izin_tinggal_Terbatas_90_hari"
            },
            {
              judul: "Masa Berlaku Paling Lama 6 Bulan",
              data_name: "izin_tinggal_Terbatas_6_bulan"
            },
            {
              judul: "Masa Berlaku Paling Lama 1 Tahun",
              data_name: "izin_tinggal_Terbatas_1_tahun"
            },
            {
              judul: "Masa Berlaku Paling Lama 2 Tahun",
              data_name: "izin_tinggal_Terbatas_2_tahun"
            },
            {
              judul: "Masa Berlaku Paling Lama 5 Tahun",
              data_name: "izin_tinggal_Terbatas_5_tahun"
            },
            {
              judul: "Masa Berlaku Paling Lama 10 Tahun",
              data_name: "izin_tinggal_Terbatas_10_tahun"
            },
          ]
        },
        {
          jenis: "Izin Tinggal Tetap",
          has_child: true,
          child_section: [
            {
              judul: "Masa Berlaku Paling Lama 5 Tahun",
              data_name: "izin_tetap_tetap_5_tahun"
            },
            {
              judul: "Masa Berlaku Paling Lama 10 Tahun",
              data_name: "izin_tetap_tetap_10_tahun"
            },
            {
              judul: "Untuk Jangka Waktu Tidak Terbatas",
              data_name: "izin_tetap_tetap_tak_terbatas"
            },
          ]
        }
      ]
    },
    {
        nama_section: "Berita Acara Pemeriksaan",
        isi_section: [
            {
                jenis: "Paspor Rusak",
                has_child: false,
                data_name: "paspor_rusak"
            },
            {
                jenis: "Paspor Hilang",
                has_child: false,
                data_name: "paspor_hilang"
            },            {
                jenis: "Paspor Beda Data",
                has_child: false,
                data_name: "paspor_beda_data"
            },
        ]
    }
  ];
  
  function getFullMenuName(dataName) {
    for (const section of menu) {
      if (section.isi_section) {
        for (const subSection of section.isi_section) {
          if (subSection.has_child) {
            for (const child of subSection.child_section) {
              if (child.data_name === dataName) {
                return `${subSection.jenis} ${child.judul}`;
              }
            }
          } else {
            if (subSection.data_name === dataName) {
              return subSection.jenis;
            }
          }
        }
      }
    }
    return "Data tidak ditemukan";
  }
  
  function getAllDataNames() {
    const dataNames = [];
    for (const section of menu) {
      if (section.isi_section) {
        for (const subSection of section.isi_section) {
          if (subSection.has_child) {
            for (const child of subSection.child_section) {
              dataNames.push(child.data_name);
            }
          } else {
            dataNames.push(subSection.data_name);
          }
        }
      }
    }
    return dataNames;
  }

  function getDataNamePairs() {
    const pairs = {};
    
    for (const section of menu) {
      if (section.isi_section) {
        for (const subSection of section.isi_section) {
          if (subSection.has_child) {
            for (const child of subSection.child_section) {
              pairs[child.data_name] = `${subSection.jenis} ${child.judul}`;
            }
          } else {
            pairs[subSection.data_name] = subSection.jenis;
          }
        }
      }
    }
    
    return pairs;
  }
  
  export { menu, getFullMenuName, getAllDataNames, getDataNamePairs };
  