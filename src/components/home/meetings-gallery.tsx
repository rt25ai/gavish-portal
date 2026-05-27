import { PhotoGallery } from "@/components/gallery/photo-gallery";
import { meetingPhotos } from "./meetings-gallery.data";

export function MeetingsGallery() {
  return (
    <PhotoGallery
      id="gallery"
      eyebrow="גלריה · מהמפגשים"
      title={
        <>
          הקהילה,
          <br />
          <span className="outline-text">פנים אל פנים.</span>
        </>
      }
      photos={meetingPhotos}
      subject="ממפגשי קהילת גביש"
      theme="dark"
    />
  );
}
