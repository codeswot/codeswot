import 'package:codeswot/config/theme/colors.dart';
import 'package:codeswot/main/widget/local_image.dart';
import 'package:codeswot/main/widget/main_desktop.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class BottomSocialLgMd extends StatelessWidget {
  const BottomSocialLgMd({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Positioned(
          bottom: -5.w,
          child: LocalImage(
            imgPath: 'icons/png/hash.png',
            width: 120.w,
          ),
        ),
        const LinkedCirclesColumn(),
      ],
    );
  }
}

class LinkedCirclesColumn extends StatelessWidget {
  const LinkedCirclesColumn({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(left: 35.w, right: 50.w),
      child: SizedBox(
        width: 40.w,
        height: 150.w,
        child: Stack(
          children: [
            Align(
              child: SizedBox(
                height: 50.w,
                child: VerticalDivider(
                  thickness: 0.5.w,
                  color: AppColors.primaryColor,
                ),
              ),
            ),
            Align(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  InkWell(
                    borderRadius: BorderRadius.circular(50.w),
                    onTap: () => startLaunchUrl('https://github.com/codeswot/'),
                    child: CircleAvatar(
                      radius: 15.w,
                      backgroundColor: const Color(0xff64FFDA),
                      child: LocalImage(
                        imgPath: 'icons/png/git.png',
                        width: 18.w, 
                      ),
                    ),
                  ),
                  InkWell(
                    borderRadius: BorderRadius.circular(50.w),
                    onTap: () => startLaunchUrl('https://x.com/codeswot/'),
                    child: CircleAvatar(
                      radius: 15.w,
                      backgroundColor: AppColors.primaryColor,
                      child: LocalImage(
                        imgPath: 'icons/png/tweet.png',
                        width: 18.w,
                      ),
                    ),
                  ),
                  InkWell(
                    borderRadius: BorderRadius.circular(50.w),
                    onTap: () => startLaunchUrl('https://www.linkedin.com/in/codeswot/'),
                    child: CircleAvatar(
                      radius: 15.w,
backgroundColor: AppColors.primaryColor,
                      child: LocalImage(
                        imgPath: 'icons/png/linked.png',
                        width: 18.w,
                      ),
                    ),
                  ),
                ],
              ),
            ),
         
          ],
        ),
      ),
    );
  }
}
