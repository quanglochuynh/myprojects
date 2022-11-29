import numpy as np
import matplotlib.pyplot as plt
import os
import cv2
fol_dir = ''

if __name__ == "__main__":
    fol_dir = input("Kéo folder chứa hình vô đây. LẸ!!   ")
    im_dir = os.listdir(fol_dir)
    print(im_dir)
    wm_dir = input('Kéo file watermark vô đây (nhớ bỏ dấu " ): ')
    wm = cv2.imread(wm_dir);
    wm = wm[:,:,0:3]
    wm = cv2.resize(wm, dsize=None, fx=0.5, fy=0.5)

    for dir in im_dir:
        print(dir)
        logo = wm
        img = cv2.imread(fol_dir + '/' + dir)
        # calculating dimensions
        # height and width of the logo
        h_logo, w_logo, c = logo.shape
        # height and width of the image
        h_img, w_img, c = img.shape
        # calculating coordinates of center
        # calculating center, where we are going to 
        # place our watermark
        center_y = int(h_img - h_logo/2) #int(h_img/2)
        center_x = int(w_logo/2)
        # calculating from top, bottom, right and left
        top_y = center_y - int(h_logo/2)
        left_x = center_x - int(w_logo/2)
        bottom_y = top_y + h_logo
        right_x = left_x + w_logo
        # adding watermark to the image
        destination = img[top_y:bottom_y, left_x:right_x]
        result = cv2.addWeighted(destination, 1, logo, 0.5, 0)
        # displaying and saving image
        img[top_y:bottom_y, left_x:right_x] = result
        cv2.imwrite(fol_dir + '/' + dir[0:len(dir)-4] + '_watermarked.jpeg',img);

    pass