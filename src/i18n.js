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
                contact: "İletişim"
            },
            home: {
                heroTitle: "Güzelliğin Ötesinde",
                heroSubtitle: "Dünyanın en prestijli modellik yarışması",
                explore: "Yarışmayı Keşfet",
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
                specialAwards: "Özel Ödüller",
                viewGallery: "Galeriye Git",
                location: "Konum",
                date: "Tarih"
            },
            apply: {
                title: "Top Model of Türkiye Başvurusu",
                subtitle: "Modellik kariyerinize ilk adımı atın. Yarışmaya katılmak için formu doldurun.",
                form: {
                    name: "Ad *",
                    surname: "Soyad *",
                    gender: "Cinsiyet *",
                    selectGender: "Cinsiyet Seçin",
                    female: "Kadın",
                    male: "Erkek",
                    birthDate: "Doğum Tarihi *",
                    height: "Boy (cm) *",
                    weight: "Kilo (kg) *",
                    phone: "Telefon Numarası *",
                    email: "E-posta Adresi *",
                    instagram: "Instagram *",
                    photos: "Fotoğraflar (Maks 3) *",
                    uploadText: "Fotoğraf yüklemek için tıklayın",
                    maxSize: "Maks 3 fotoğraf",
                    kvkkConsent: "KVKK Aydınlatma Metni'ni okudum ve kabul ediyorum.",
                    readKvkk: "Metni Oku",
                    submit: "Başvuruyu Gönder",
                    sending: "Gönderiliyor..."
                },
                messages: {
                    success: "Başvurunuz başarıyla alındı! E-posta adresinize bir onay mesajı gönderildi.",
                    error: "Başvuru gönderilirken bir hata oluştu. Lütfen tekrar deneyin.",
                    maxPhotos: "En fazla 3 fotoğraf yükleyebilirsiniz.",
                    minPhoto: "Lütfen en az bir fotoğraf yükleyin.",
                    kvkkRequired: "Lütfen KVKK metnini onaylayın."
                }
            },
            contact: {
                title: "İletişim",
                subtitle: "Sorularınız için bizimle iletişime geçin.",
                getInTouch: "Bize Ulaşın",
                contactInfo: "İletişim Bilgileri",
                followUs: "Bizi Takip Edin",
                form: {
                    name: "Adınız",
                    email: "E-posta Adresiniz",
                    message: "Mesajınız",
                    send: "Mesaj Gönder"
                }
            },
            management: {
                title: "Yönetim",
                biography: "Biyografi",
                contactBtn: "Yönetim İletişim"
            },
            media: {
                title: "Medya & Haberler",
                videos: "Genel Videolar",
                news: "Basında Biz"
            },
            footer: {
                rights: "Tüm hakları saklıdır."
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
                contact: "Contact"
            },
            home: {
                heroTitle: "Beyond Beauty",
                heroSubtitle: "The world's most prestigious modeling competition",
                explore: "Explore Competition",
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
                specialAwards: "Special Awards",
                viewGallery: "View Gallery",
                location: "Location",
                date: "Date"
            },
            apply: {
                title: "Apply for Top Model of Türkiye",
                subtitle: "Take the first step towards your modeling career. Fill out the form below to join the competition.",
                form: {
                    name: "Name *",
                    surname: "Surname *",
                    gender: "Gender *",
                    selectGender: "Select Gender",
                    female: "Female",
                    male: "Male",
                    birthDate: "Birth Date *",
                    height: "Height (cm) *",
                    weight: "Weight (kg) *",
                    phone: "Phone Number *",
                    email: "Email Address *",
                    instagram: "Instagram *",
                    photos: "Photos (Max 3) *",
                    uploadText: "Click to upload photos",
                    maxSize: "Max 3 photos",
                    kvkkConsent: "I have read and accept the KVKK Clarification Text.",
                    readKvkk: "Read Text",
                    submit: "Submit Application",
                    sending: "Sending..."
                },
                messages: {
                    success: "Application submitted successfully! A confirmation email has been sent to you.",
                    error: "Error submitting application. Please try again.",
                    maxPhotos: "You can upload a maximum of 3 photos.",
                    minPhoto: "Please upload at least one photo.",
                    kvkkRequired: "Please accept the KVKK text."
                }
            },
            contact: {
                title: "Contact",
                subtitle: "Get in touch with us for any inquiries.",
                getInTouch: "Get in Touch",
                contactInfo: "Contact Information",
                followUs: "Follow Us",
                form: {
                    name: "Your Name",
                    email: "Your Email",
                    message: "Your Message",
                    send: "Send Message"
                }
            },
            management: {
                title: "Management",
                biography: "Biography",
                contactBtn: "Contact Management"
            },
            media: {
                title: "Media & News",
                videos: "General Videos",
                news: "Press & News"
            },
            footer: {
                rights: "All rights reserved."
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
