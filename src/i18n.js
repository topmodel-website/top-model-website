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
                gallery: "Fotoğraflar",
                videos: "Videolar",
                contact: "İletişim",
                contactInfo: "İletişim Bilgileri",
                contactInfo: "İletişim Bilgileri",
                sponsors: "Sponsorlar"
            },
            sponsors: {
                description: "Bu yolculukta bize destek olan değerli iş ortaklarımız."
            },
            home: {
                heroTitle: "Güzelliğin ve Zarafetin Zirvesi",
                heroSubtitle: "Keşfedilmek Hayaliniz Değil, Mutluluğunuz Olsun!",
                explore: "Bu Eşsiz Yolculuğu Keşfet",
                exploreUniverse: "Universe Dünyası",
                exploreTurkiye: "Türkiye Etabı",
                introTitle: "Kusursuzluğun Mirası",
                introText: "Top Model of Universe ve Top Model of Türkiye; moda dünyasının kalbinde atan, estetiği ve karakteri buluşturan, sınırların ötesinde bir prestij platformudur. Burası sadece bir yarışma değil, geleceğin ikonlarının doğduğu yerdir.",
                stats: {
                    years: "Yıllık Tecrübe",
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
                title: "Özel Koleksiyon",
                subtitle: "Podyumun ışıltısı, kulisin gizemi ve objektiflere yansıyan en özel kareler.",
                allPhotos: "Tüm Koleksiyonu Gör",
                noPhotos: "Henüz fotoğraf bulunamadı. Galeri yakında güncellenecektir."
            },
            videos: {
                title: "Videolar",
                subtitle: "En özel anlar, podyum şovları ve sahne arkası görüntüleri.",
                allVideos: "Tüm Videolar",
                noVideos: "Henüz video bulunamadı."
            },
            management: {
                title: "Yönetim",
                role: "Yönetim Kurulu Başkanı",
                intro: "Ali Durgut, İzmir Dokuz Eylül Üniversitesi'nden mezun olmuş, kariyerine havacılık sektörünün önde gelen kuruluşlarında üst düzey yönetici olarak başlamıştır. Turkish Airlines, Atlasglobal ve Air France gibi uluslararası havayolu şirketlerinde kritik roller üstlenmiştir.",
                eurovisionTitle: "Eurovision'daki Öncü Rolü",
                eurovisionText: "Profesyonel yaşamının yanı sıra, çocukluğundan itibaren uluslararası organizasyonlara büyük bir ilgi duyan Durgut, bu tutkusunu özellikle Eurovision Şarkı Yarışması alanında zirveye taşımıştır. 1996 yılından itibaren Türkiye Kulübü Başkanlığı görevini üstlenmiş ve TRT'nin Eurovision delegasyonlarında aktif rol almıştır. Bir dönem, ülkenin tanınmış sunucularından Bülend Özveren'in asistanlığını yapmış, aynı zamanda Eurovision'da Türkiye'yi temsil eden birçok sanatçının da danışmanlığını üstlenmiştir. Türk şarkılarının ve sanatçılarının Avrupa'daki tanıtım (promosyon) süreçlerini yönetmiş ve Türkiye Eurovision fan kulüplerinin kuruluşuna liderlik etmiştir.",
                fashionTitle: "Moda ve Model Organizasyonlarında Yeni Bir Dönem",
                fashionText1: "Paris'te yaşadığı dönemde Miss France ve Miss Universe gibi yarışmalar üzerine yaptığı çalışmalar vesilesiyle Türk model yarışmalarının sahipleriyle tanışmış ve bu organizasyonlara sponsorluk ve Proje Yönetmenliği desteği sağlamıştır. Ancak, bu yarışmalarda aradığı uluslararası kalite standartlarını bulamayınca, kendi projelerini hayata geçirme kararı almıştır.",
                fashionText2: "Bu vizyonla, \"Top Model of Turkey\" ve \"Top Model Of Universe\" yarışmalarının isim haklarını alarak kurucusu olmuş ve Türk moda sektörünü ile model camiasını dünya çapında temsil etme misyonunu üstlenmiştir.",
                fashionText3: "2022 yılından itibaren, dünyanın çeşitli ülkelerinden modacıları, modelleri ve basın mensuplarını İstanbul'da ağırlayarak Türkiye'nin küresel moda sahnesindeki etkinliğini artırmıştır. Top Model Of Turkey finallerinde derece alan modellerin yurt dışındaki yarışmalara katılımlarını sağlamış ve birçoğunun sponsorluğunu üstlenerek onların uluslararası başarıları için çaba göstermiştir. Bu alandaki ilk büyük başarısı, 2022'de bir Türk modelin (Defne Şentürk) dünya birinciliğini kazanması olmuştur. Sonraki yıllarda da moda sektöründe Türkiye'ye dünya birincilikleri ve ikincilikleri kazandırarak ülkenin adını başarıyla duyurmuştur.",
                visionTitle: "Vizyonu ve Hedefleri",
                visionText: "Türkiye'nin adını uluslararası alanda başarılarla duyurma mücadelesinden büyük bir keyif aldığını belirten Ali Durgut, vizyonunu şu sözlerle özetlemektedir:",
                quote: "\"Amacım, Türk gençlerini ve modacılarını dünya podyumlarına taşımak, yarışmalara ve şovlara farklılıklar ve yenilikler getirmektir.\"",
                readMore: "Devamını Oku",
                showLess: "Daha Az Göster",
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
                title: "Top Model Olma Yolculuğu",
                subtitle: "Kariyerinizin dönüm noktası burada başlıyor. Başvuru formunu doldurun ve ışığınızı yansıtın.",
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
                    maxSize: "Tam olarak 4 fotoğraf (2 yüz, 2 boy)",
                    kvkkConsent: "KVKK Aydınlatma Metni'ni okudum ve kabul ediyorum.",
                    readKvkk: "Metni Oku",
                    submit: "Başvuruyu Gönder",
                    sending: "Gönderiliyor..."
                },
                messages: {
                    success: "Başvurunuz başarıyla alındı!",
                    error: "Başvuru gönderilirken bir hata oluştu. Lütfen tekrar deneyin.",
                    maxPhotos: "En fazla 4 fotoğraf yükleyebilirsiniz.",
                    minPhoto: "Lütfen tam olarak 4 fotoğraf (2 yüz, 2 boy) yükleyiniz.",
                    kvkkRequired: "Lütfen KVKK metnini onaylayın."
                },
                conditions: {
                    title: "Top Model of Türkiye 2026 Katılım Koşulları",
                    items: [
                        "Yarışmaya başvuracak adayların 18 yaşını doldurmuş, 28 yaşından gün almamış olmaları gerekmektedir.",
                        "Başvurular 15 Aralık – 15 Şubat 2026 tarihleri arasında kabul edilecektir.",
                        "Yarışmanın temel amacı yeni yüzler ve yeni isimler keşfetmektir. Bu doğrultuda, daha önce başka bir modellik yarışmasının finalinde yer almış adaylar TMT Büyük Finali’ne kabul edilmeyecektir.",
                        "Ancak daha önce TMT’de yarışmış olan kendi modellerimiz bu kuraldan muaftır.",
                        "Yarışmaya başvuru ücretsizdir. Yarı finale veya büyük finale kalmaya hak kazanan adaylardan fotoğraf çekimi (photo shooting) ve katılım bedeli talep edilecektir.",
                        "Başvuru formuna iki adet yüz fotoğrafı ve iki adet boy fotoğrafı yüklenmesi zorunludur.",
                        "Ön eleme süreci, başvuru sırasında iletilen fotoğraflar üzerinden gerçekleştirilecektir. Ön elemeyi geçen adaylar yarı final görüşmesine davet edilecektir.",
                        "Yarışmanın yarı finali ve büyük finali İstanbul’da gerçekleştirilecektir. Jüri değerlendirmesi sonucunda 25 erkek ve 25 kadın model adayı büyük finale katılmaya hak kazanacaktır.",
                        "Büyük finalde dereceye giren ilk beş model adayı ile iki (2) yıllık profesyonel sözleşme imzalanacaktır.",
                        "Sponsor koşullarına bağlı olarak, finale kalan adaylar yurt dışındaki defile ve organizasyonlarda ülkemizi temsil etme fırsatı elde edebilecektir.",
                        "Yarışma büyük finali halka açık olarak ve noter huzurunda gerçekleştirilecektir.",
                        "Büyük final kapsamında online halk oylaması yapılacaktır. Halk oylamasında ilk iki sırada yer alan adayların jüri puanları; Birinci olan aday için %40, İkinci olan aday için %20 oranında artırılacaktır. Bu oranlar noter tarafından resmî jüri oylarına eklenecektir."
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
                description: "Güzelliği, zarafeti ve yeteneği evrensel bir dille kutluyoruz.",
                followUs: "Sosyal Medya",
                contact: "Bize Ulaşın"
            },
            universe: {
                title: "Top Model of Universe",
                description: "Kıtaları birleştiren güzellik. Dünyanın en seçkin modellerinin buluşma noktası."
            },
            turkiye: {
                title: "Top Model of Türkiye",
                description: "Zarafetin ve asilliğin ulusal simgesi. Türkiye'nin yıldızlarını dünya sahnesine hazırlıyoruz."
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
                gallery: "Photos",
                videos: "Videos",
                contact: "Contact",
                contactInfo: "Contact Info",
                contactInfo: "Contact Info",
                sponsors: "Sponsors"
            },
            sponsors: {
                description: "Our valued partners who support us in this journey."
            },
            home: {
                heroTitle: "The Peak of Beauty & Grace",
                heroSubtitle: "Let Discovery Be Your Future, Not Just A Dream.",
                explore: "Discover the Journey",
                exploreUniverse: "World of Universe",
                exploreTurkiye: "Stage of Türkiye",
                introTitle: "A Legacy of Perfection",
                introText: "Top Model of Universe and Top Model of Türkiye are not merely pageants; they are the global stage where aesthetics meet character, creating a legacy of prestige beyond borders. This is where future icons are born.",
                stats: {
                    years: "Years of Experience",
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
                title: "Exclusive Collection",
                subtitle: "The glitter of the runway, the mystery of backstage, and exclusive moments captured through the lens.",
                allPhotos: "View Full Collection",
                noPhotos: "No photos found yet. Gallery will be updated soon."
            },
            videos: {
                title: "Videos",
                subtitle: "Special moments, runway shows, and backstage highlights.",
                allVideos: "All Videos",
                noVideos: "No videos found yet."
            },
            apply: {
                title: "Journey to Becoming a Top Model",
                subtitle: "Your career's turning point starts here. Fill out the form and let your light shine.",
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
                    maxSize: "Exactly 4 photos (2 face, 2 body)",
                    kvkkConsent: "I have read and accept the KVKK Clarification Text.",
                    readKvkk: "Read Text",
                    submit: "Submit Application",
                    sending: "Sending..."
                },
                messages: {
                    success: "Application submitted successfully!",
                    error: "Error submitting application. Please try again.",
                    maxPhotos: "You can upload a maximum of 4 photos.",
                    minPhoto: "Please upload exactly 4 photos (2 face, 2 body).",
                    kvkkRequired: "Please accept the KVKK text."
                },
                conditions: {
                    title: "Top Model of Türkiye 2026 Participation Conditions",
                    items: [
                        "Candidates must be at least 18 years old and not older than 28 years.",
                        "Applications will be accepted between December 15 and February 15, 2026.",
                        "The main purpose of the competition is to discover new faces and new names. Accordingly, candidates who have previously taken part in the final of another modeling competition will not be accepted to the TMT Grand Final.",
                        "However, our own models who have previously competed in TMT are exempt from this rule.",
                        "Application to the competition is free. Candidates eligible for the semi-finals or grand final will be required to pay a photo shooting and participation fee.",
                        "It is mandatory to upload two face photos and two full-body photos to the application form.",
                        "The preliminary elimination process will be conducted based on the photos submitted during the application. Candidates who pass the preliminary round will be invited to a semi-final interview.",
                        "The semi-final and grand final of the competition will be held in Istanbul. As a result of jury evaluation, 25 male and 25 female model candidates will qualify for the grand final.",
                        "A two (2) year professional contract will be signed with the top five model candidates in the grand final.",
                        "Depending on sponsor conditions, finalists may have the opportunity to represent our country in fashion shows and organizations abroad.",
                        "The grand final of the competition will be open to the public and held in the presence of a notary.",
                        "Online public voting will be held within the scope of the grand final. The jury scores of the candidates ranking in the top two in public voting will be increased by 40% for the first candidate and 20% for the second candidate. These rates will be added to the official jury votes by the notary."
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
                intro: "Graduating from İzmir Dokuz Eylül University, Ali Durgut began his career as a senior executive in leading organizations of the aviation sector. He has undertaken critical roles in international airlines such as Turkish Airlines, Atlasglobal, and Air France.",
                eurovisionTitle: "Pioneering Role in Eurovision",
                eurovisionText: "Alongside his professional life, Durgut has had a keen interest in international organizations since childhood, carrying this passion to the peak in the field of the Eurovision Song Contest. Since 1996, he has served as the President of the Turkey Club and played an active role in TRT's Eurovision delegations. For a period, he worked as an assistant to one of the country's renowned presenters, Bülend Özveren, and also acted as a consultant for many artists representing Turkey in Eurovision. He managed the promotion processes of Turkish songs and artists in Europe and led the establishment of Turkish Eurovision fan clubs.",
                fashionTitle: "A New Era in Fashion and Model Organizations",
                fashionText1: "During his time in Paris, through his work on competitions like Miss France and Miss Universe, he met the owners of Turkish model competitions and provided sponsorship and Project Management support to these organizations. However, unable to find the international quality standards he sought in these competitions, he decided to bring his own projects to life.",
                fashionText2: "With this vision, he acquired the naming rights for \"Top Model of Turkey\" and \"Top Model Of Universe\" competitions, becoming their founder and undertaking the mission of representing the Turkish fashion sector and modeling community worldwide.",
                fashionText3: "Since 2022, he has increased Turkey's effectiveness on the global fashion stage by hosting fashion designers, models, and press members from various countries in Istanbul. He ensured the participation of models ranking in Top Model Of Turkey finals in international competitions abroad and undertook the sponsorship of many, striving for their international success. His first major success in this field was a Turkish model (Defne Şentürk) winning the world championship in 2022. In the following years, he successfully made the country's name heard by bringing world championships and runner-up titles to Turkey in the fashion sector.",
                visionTitle: "Vision and Goals",
                visionText: "Stating that he takes great pleasure in the struggle to announce Turkey's name with successes in the international arena, Ali Durgut summarizes his vision with these words:",
                quote: "\"My goal is to carry Turkish youth and fashion designers to world podiums and to bring differences and innovations to competitions and shows.\"",
                readMore: "Read More",
                showLess: "Show Less",
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
                description: "Celebrating beauty, grace, and talent with a universal language.",
                followUs: "Social Media",
                contact: "Contact Us"
            },
            universe: {
                title: "Top Model of Universe",
                description: "Beauty uniting continents. The meeting point of the world's most elite models."
            },
            turkiye: {
                title: "Top Model of Türkiye",
                description: "The national symbol of grace and nobility. Preparing Turkey's stars for the world stage."
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
