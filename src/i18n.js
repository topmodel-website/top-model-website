import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    tr: {
        translation: {
            nav: {
                home: "Anasayfa",
                universe: "Universe",
                turkiye: "Türkiye",
                apply: "Başvuru",
                management: "Yönetim",
                media: "Medya",
                gallery: "Galeri",
                contact: "İletişim"
            },
            home: {
                heroTitle: "Güzelliğin Ötesinde",
                heroSubtitle: "Keşfedilmek hayaliniz değil, mutluluğunuz olsun!",
                explore: "Yarışmayı Keşfet",
                exploreUniverse: "Universe'i Keşfet",
                exploreTurkiye: "Türkiye'yi Keşfet",
                introTitle: "Zarafet ve Yeteneğin Mirası",
                introText: "Top Model of Universe ve Top Model of Türkiye, sadece güzellik yarışmaları değil; küresel moda endüstrisinin geleceğini şekillendiren, yetenek, zarafet ve kültürel çeşitliliğin kutlamasıdır.",
                stats: {
                    years: "Yıllık Mükemmellik",
                    countries: "Katılımcı Ülke",
                    candidates: "Aday"
                }
            },
            yearSection: {
                hosts: "Sunucular",
                winners: "Kazananlar",
                top5Men: "İlk 5 Erkek",
                top5Women: "İlk 5 Kadın",
                top3Men: "İlk 3 Erkek",
                top3Women: "İlk 3 Kadın",
                specialAwards: "Özel Ödüller",
                viewGallery: "Galeriye Git",
                location: "Konum",
                date: "Tarih"
            },
            gallery: {
                title: "Galeri",
                subtitle: "Prestijli etkinliklerimizden, podyum şovlarından ve sahne arkasından öne çıkanlar.",
                allPhotos: "Tüm Fotoğraflar",
                noPhotos: "Henüz fotoğraf bulunamadı. Lütfen galeri klasörüne fotoğraf ekleyiniz."
            },
            management: {
                title: "Yönetim",
                role: "Yönetim Kurulu Başkanı",
                bio1: "Top Model of Universe ve Top Model of Türkiye'nin vizyoneri olarak Ali Durgut, kariyerini dünya çapında yetenekleri keşfetmeye ve geliştirmeye adamıştır.",
                bio2: "Moda ve eğlence sektöründeki yılların deneyimiyle, kültürleri birleştiren ve güzelliği her haliyle kutlayan prestijli organizasyonlara imza atmıştır.",
                bio3: "Yönetim felsefesi, profesyonel gelişim, disiplin ve gelecek vadeden modeller için uluslararası fırsatlar yaratmaya odaklanmaktadır.",
                contactTitle: "Yönetim İletişim"
            },
            media: {
                title: "Medya Merkezi",
                subtitle: "En son videolar, basın bültenleri ve öne çıkanlar.",
                videos: "Videolar",
                news: "Basın & Haberler",
                eventHighlight: "Etkinlik Özeti",
                recap: "Büyük final gecesinin resmi özeti.",
                pressTag: "Basın Bülteni",
                newsItemTitle: "Top Model of Universe 2025 Duyuruldu",
                newsItemDesc: "Gelecek sezon, 50'den fazla ülkeden yarışmacıyla şimdiye kadarki en görkemli sezon olmayı vaat ediyor..."
            },
            apply: {
                title: "Top Model Yarışması Başvurusu",
                subtitle: "Modellik kariyerinize ilk adımı atın. Başvuru formunu doldurun.",
                sections: {
                    personalInfo: "Kişisel Bilgiler",
                    physicalStats: "Fiziksel Özellikler",
                    contactInfo: "İletişim Bilgileri",
                    experience: "Deneyim & Diğer"
                },
                form: {
                    nameSurname: "İsim Soyadı *",
                    age: "Yaş *",
                    gender: "Cinsiyet *",
                    genderOptions: {
                        placeholder: "Seçiniz...",
                        female: "Kadın",
                        male: "Erkek"
                    },
                    height: "Boy (cm) *",
                    weight: "Kilo (kg) *",
                    education: "Eğitim *",
                    educationOptions: {
                        placeholder: "Seçiniz...",
                        primary: "İlköğretim",
                        highSchool: "Lise",
                        associate: "Ön Lisans",
                        bachelor: "Lisans",
                        master: "Yüksek Lisans",
                        phd: "Doktora",
                        other: "Diğer"
                    },
                    city: "Yaşadığınız Şehir *",
                    instagram: "Instagram *",
                    tshirtSize: "T-shirt Bedeni *",
                    swimsuitSize: "Mayo Bedeni *",
                    shoeSize: "Ayakkabı Numarası *",
                    hasPassport: "Pasaportunuz var mı? *",
                    yes: "Evet",
                    no: "Hayır",
                    passportExpiry: "Pasaportunuzun Geçerlilik Süresi *",
                    hasExperience: "Modellik ve oyunculuk konusunda tecrübeniz var mı? *",
                    experience: "Lütfen tecrübenizi açıklayınız *",
                    hasAgency: "Bağlı olduğunuz bir ajans var mı? *",
                    agency: "Ajans Adı *",
                    hasPastContests: "Daha önce bir yarışmaya katıldınız mı? *",
                    pastContests: "Yarışma Adı ve Dereceniz *",
                    phone: "Telefon Numarası *",
                    email: "E-posta Adresi *",
                    photos: "Fotoğraflar (2 Yüz, 2 Boy) *",
                    uploadText: "Fotoğraf yüklemek için tıklayın",
                    maxSize: "Maks 4 fotoğraf",
                    kvkkConsent: "KVKK Aydınlatma Metni'ni okudum ve kabul ediyorum.",
                    readKvkk: "Metni Oku",
                    submit: "Başvuruyu Gönder",
                    sending: "Gönderiliyor..."
                },
                messages: {
                    success: "Başvurunuz başarıyla alındı!",
                    error: "Başvuru gönderilirken bir hata oluştu. Lütfen tekrar deneyin.",
                    maxPhotos: "En fazla 4 fotoğraf yükleyebilirsiniz.",
                    minPhoto: "Lütfen 4 fotoğraf (2 yüz, 2 boy) yükleyin.",
                    kvkkRequired: "Lütfen KVKK metnini onaylayın."
                },
                conditions: {
                    title: "Top Model of Türkiye 2026 Katılım Koşulları",
                    items: [
                        "Başvurular 15 Aralık 2025'te başlayacaktır.",
                        "Adayların 18 yaşından gün almış olması ve 28 yaşından büyük olmaması gerekmektedir.",
                        "Başvurular 15 Şubat tarihinde kapatılacaktır.",
                        "Yarışmanın prensibi yeni yüz ve isimleri keşfetmek üzerine kurulmuştur. Bu nedenle daha önce başka bir yarışmanın finalinde yer almış hiçbir model TMT finaline alınmayacaktır. (Daha önce TMT'de yarışmış kendi modellerimize bu kural uygulanmayacaktır.)",
                        "Başvuru formuna iki adet yüz ve iki adet boy fotoğrafı eklenecektir.",
                        "Ön eleme süreci fotoğraflar üzerinden yapılacaktır. Daha sonra uygun görülen adaylar yarı final görüşmesine davet edileceklerdir.",
                        "Yarışma başvurusu ücretsizdir. Ancak yarı finale kalan adaylardan fotoğraf çekimi (photo shooting) ücreti alınacaktır.",
                        "2026 Yarı Finali Nisan ayında İstanbul’da yapılacaktır. Jüri oylaması sonucu 25 erkek ve 25 kadın model adayı adını BÜYÜK finale yazdıracaktır.",
                        "Yarışma finali halka açık ve noter huzurunda yapılacaktır. Dereceye giren ilk beş modelimizle iki senelik anlaşma yapılacaktır.",
                        "Sponsor durumuna göre finale kalan modellerimiz, yurt dışındaki defile ve organizasyonlarda ülkemizi temsil etme imkanına sahip olacaklardır.",
                        "Yarışma büyük finalinde ONLİNE oylama (Halk Oylaması) YAPILACAKTIR. Burada ilk ikiye giren modellerin yarışmadaki jüri oyları sırasıyla %40 ve %20 artırılarak üst sıralarda yer alma şansı ve avantajı verilecektir. Oranlar noter tarafından final oylarına eklenecektir."
                    ],
                    footer: "Keşfedilmek hayaliniz değil, mutluluğunuz olmalıdır.\nTüm katılımcılara iyi şanslar diliyoruz."
                }
            },
            contact: {
                title: "İletişim",
                subtitle: "Sorularınız için bizimle iletişime geçin.",
                getInTouch: "Bize Ulaşın",
                description: "Sponsorluk, katılım veya basın ile ilgili sorularınız için lütfen aşağıdaki bilgileri kullanarak bizimle iletişime geçin.",
                phone: "Telefon",
                emailUs: "Bize E-posta Gönderin",
                locationTitle: "Konum",
                location: "İstanbul, Türkiye",
                followUs: "Bizi Takip Edin"
            },
            footer: {
                rights: "Tüm hakları saklıdır.",
                description: "Güzelliği, zerafeti ve yeteneği evren genelinde kutluyoruz.",
                followUs: "Bizi Takip Edin",
                contact: "İletişim"
            },
            universe: {
                title: "Top Model of Universe",
                description: "Uluslararası güzellik ve yetenek mirası. Prestijli yarışmamızın tarihini keşfedin."
            },
            turkiye: {
                title: "Top Model of Türkiye",
                description: "Ulusal gurur. Türkiye'nin en iyi modellerini kutluyoruz."
            }
        }
    },
    en: {
        translation: {
            nav: {
                home: "Home",
                universe: "Universe",
                turkiye: "Türkiye",
                apply: "Apply",
                management: "Management",
                media: "Media",
                gallery: "Gallery",
                contact: "Contact"
            },
            home: {
                heroTitle: "Beyond Beauty",
                heroSubtitle: "Let being discovered be your happiness, not just your dream!",
                explore: "Explore Competition",
                exploreUniverse: "Explore Universe",
                exploreTurkiye: "Explore Türkiye",
                introTitle: "A Legacy of Elegance",
                introText: "Top Model of Universe and Top Model of Türkiye are not just beauty pageants; they are celebrations of talent, grace, and cultural diversity, shaping the future of the global fashion industry.",
                stats: {
                    years: "Years of Excellence",
                    countries: "Participating Countries",
                    candidates: "Candidates"
                }
            },
            yearSection: {
                hosts: "Hosts",
                winners: "Winners",
                top5Men: "Top 5 Men",
                top5Women: "Top 5 Women",
                top3Men: "Top 3 Men",
                top3Women: "Top 3 Women",
                specialAwards: "Special Awards",
                viewGallery: "View Gallery",
                location: "Location",
                date: "Date"
            },
            gallery: {
                title: "Gallery",
                subtitle: "Highlights from our prestigious events, runway shows, and backstage moments.",
                allPhotos: "All Photos",
                noPhotos: "No photos found yet. Please add images to the gallery folder."
            },
            apply: {
                title: "Top Model Competition Application",
                subtitle: "Take the first step towards your modeling career. Fill out the application form.",
                sections: {
                    personalInfo: "Personal Information",
                    physicalStats: "Physical Stats",
                    contactInfo: "Contact Information",
                    experience: "Experience & Other"
                },
                form: {
                    nameSurname: "Name Surname *",
                    age: "Age *",
                    gender: "Gender *",
                    genderOptions: {
                        placeholder: "Select...",
                        female: "Female",
                        male: "Male"
                    },
                    height: "Height (cm) *",
                    weight: "Weight (kg) *",
                    education: "Education *",
                    educationOptions: {
                        placeholder: "Select...",
                        primary: "Primary Education",
                        highSchool: "High School",
                        associate: "Associate Degree",
                        bachelor: "Bachelor's Degree",
                        master: "Master's Degree",
                        phd: "PhD",
                        other: "Other"
                    },
                    city: "City of Residence *",
                    instagram: "Instagram *",
                    tshirtSize: "T-shirt Size *",
                    swimsuitSize: "Swimsuit Size *",
                    shoeSize: "Shoe Size *",
                    hasPassport: "Do you have a passport? *",
                    yes: "Yes",
                    no: "No",
                    passportExpiry: "Passport Validity Period *",
                    hasExperience: "Do you have experience in modeling or acting? *",
                    experience: "Please describe your experience *",
                    hasAgency: "Do you have an agency? *",
                    agency: "Agency Name *",
                    hasPastContests: "Have you participated in a contest before? *",
                    pastContests: "Contest Name and Rank *",
                    phone: "Phone Number *",
                    email: "Email Address *",
                    photos: "Photos (2 Face, 2 Body) *",
                    uploadText: "Click to upload photos",
                    maxSize: "Max 4 photos",
                    kvkkConsent: "I have read and accept the KVKK Clarification Text.",
                    readKvkk: "Read Text",
                    submit: "Submit Application",
                    sending: "Sending..."
                },
                messages: {
                    success: "Application submitted successfully!",
                    error: "Error submitting application. Please try again.",
                    maxPhotos: "You can upload a maximum of 4 photos.",
                    minPhoto: "Please upload 4 photos (2 face, 2 body).",
                    kvkkRequired: "Please accept the KVKK text."
                },
                conditions: {
                    title: "Top Model of Türkiye 2026 Participation Conditions",
                    items: [
                        "Applications will start on December 15, 2025.",
                        "Candidates must be at least 18 years old and not older than 28 years.",
                        "Applications will close on February 15.",
                        "The principle of the contest is to discover new faces and names. Therefore, no model who has previously taken part in the final of another contest will be accepted to the TMT final. (This rule will not apply to our own models who have competed in TMT before.)",
                        "Two face and two full-body photos must be added to the application form.",
                        "The preliminary elimination process will be done through photos. Afterwards, eligible candidates will be invited to the semi-final interview.",
                        "Application to the contest is free. However, a photo shooting fee will be charged from the candidates who make it to the semi-finals.",
                        "The 2026 Semi-Final will be held in Istanbul in April. As a result of the jury vote, 25 male and 25 female model candidates will print their names in the GRAND final.",
                        "The competition final will be held open to the public and in the presence of a notary. A two-year agreement will be made with our top five models.",
                        "According to the sponsor situation, our finalists will have the opportunity to represent our country in fashion shows and organizations abroad.",
                        "ONLINE voting (Public Voting) WILL BE HELD in the grand final of the competition. Here, the jury votes of the models who enter the top two will be increased by 40% and 20% respectively, giving them the chance and advantage to take place in the top ranks. The rates will be added to the final votes by the notary."
                    ],
                    footer: "Being discovered should not be your dream, but your happiness.\nWe wish good luck to all participants."
                }
            },
            contact: {
                title: "Contact",
                subtitle: "Get in touch with us for any inquiries.",
                getInTouch: "Get in Touch",
                description: "For inquiries regarding sponsorship, participation, or press, please contact us using the information below.",
                phone: "Phone",
                emailUs: "Email Us",
                locationTitle: "Location",
                location: "Istanbul, Turkiye",
                followUs: "Follow Us"
            },
            management: {
                title: "Management",
                role: "Chairman",
                bio1: "As the visionary behind Top Model of Universe and Top Model of Türkiye, Ali Durgut has dedicated his career to discovering and nurturing world-class talent.",
                bio2: "With years of experience in the fashion and entertainment industry, he has successfully organized prestigious events that bridge cultures and celebrate beauty in all its forms.",
                bio3: "His management philosophy focuses on professional development, discipline, and creating international opportunities for aspiring models.",
                contactTitle: "Contact for Management"
            },
            media: {
                title: "Media Center",
                subtitle: "Latest videos, press releases, and highlights.",
                videos: "Videos",
                news: "Press & News",
                eventHighlight: "Event Highlight",
                recap: "Official recap of the grand finale night.",
                pressTag: "Press Release",
                newsItemTitle: "Top Model of Universe 2025 Announced",
                newsItemDesc: "The upcoming season promises to be the most spectacular yet, with contestants from over 50 countries..."
            },
            footer: {
                rights: "All rights reserved.",
                description: "Celebrating beauty, elegance, and talent across the universe.",
                followUs: "Follow Us",
                contact: "Contact"
            },
            universe: {
                title: "Top Model of Universe",
                description: "A legacy of international beauty and talent. Discover the history of our prestigious competition."
            },
            turkiye: {
                title: "Top Model of Türkiye",
                description: "The national pride. Celebrating the best models from Turkey."
            }
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "tr", // Default language
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
