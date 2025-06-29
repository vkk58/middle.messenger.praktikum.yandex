export class Global {
  changePicture(e:Event, className:string): void {
    const roundImg = document.getElementsByClassName(className)[0] as HTMLImageElement;
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target?.result) {
          roundImg.src = event.target.result as string;
        }
      };

      if (reader) {
        reader.readAsDataURL(file);
      }
    }
  }
}
