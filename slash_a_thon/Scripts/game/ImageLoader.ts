namespace Game {

    export class ImageLoader {
        private images = {};
        private requests = {};

        onReady: ()=>void = () => {};
        
        loadImage(path: string, callback: (img: HTMLImageElement) => void): void {
            let img: HTMLImageElement;
            if (path in this.images) {
                img = this.images[path];
                callback(img);
            } else if (path in this.requests) {
                img = this.requests[path];
                const callbackList = img["callbacks"];
                callbackList.push(callback);

            } else {
                console.debug(`Queueing image for ${path}`);

                const callbackList = new Array<(img: HTMLImageElement) => void>();
                callbackList.push(callback);

                img = document.createElement("img");
                img["callbacks"] = callbackList;
                this.requests[path] = img;

                img.addEventListener("load", () => {
                    this.images[path] = img;
                    delete this.requests[path];

                    for (let c of callbackList) {
                        c(img);
                    }

                    if (Object.keys(this.requests).length === 0) {
                        this.onReady();
                    }
                });
                img.src = path;
            }
        }

        static instance = new ImageLoader();
    }

}