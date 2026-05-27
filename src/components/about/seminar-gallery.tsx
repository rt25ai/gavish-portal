import { PhotoGallery } from "@/components/gallery/photo-gallery";
import { seminarPhotos } from "./seminar-gallery.data";

export function SeminarGallery() {
  return (
    <PhotoGallery
      eyebrow="גלריה · סמינר הפתיחה"
      title={
        <>
          איך זה נראה
          <br />
          <span className="outline-text">כשהקהילה נפגשת.</span>
        </>
      }
      photos={seminarPhotos}
      subject="מסמינר הפתיחה של תוכנית גביש"
      theme="light"
    />
  );
}
