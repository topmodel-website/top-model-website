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
                    nameSurname: "İsim Soyadı *",
                    age: "Yaş *",
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
                    success: "Başvurunuz başarıyla alındı! E-posta adresinize bir onay mesajı gönderildi.",
                    error: "Başvuru gönderilirken bir hata oluştu. Lütfen tekrar deneyin.",
                    maxPhotos: "En fazla 4 fotoğraf yükleyebilirsiniz.",
                    minPhoto: "Lütfen 4 fotoğraf (2 yüz, 2 boy) yükleyin.",
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
                    nameSurname: "Name Surname *",
                    age: "Age *",
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
                    success: "Application submitted successfully! A confirmation email has been sent to you.",
                    error: "Error submitting application. Please try again.",
                    maxPhotos: "You can upload a maximum of 4 photos.",
                    minPhoto: "Please upload 4 photos (2 face, 2 body).",
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
