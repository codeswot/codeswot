import 'package:codeswot/main/widget/local_image.dart';
import 'package:codeswot/main/widget/main_desktop.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';

class EmailLgMd extends StatelessWidget {
  const EmailLgMd({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(top: 20.w, right: 10.w),
      child: Stack(
        children: [
          LocalImage(
            width: 120.w,
            imgPath: 'icons/png/plane.png',
          ),
          Padding(
            padding: EdgeInsets.only(left: 70.w),
            child: RotatedBox(
              quarterTurns: 1,
              child: InkWell(
                onTap: () => startLaunchUrl('mailto:mubarak@codeswot.dev'),
                onLongPress: () {
                  Clipboard.setData(const ClipboardData(text: 'mubarak@codeswot.dev')).then((_) {
                    // Optional: Show a confirmation message
                    // ignore: use_build_context_synchronously
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                          content: Text(
                        'Copied to clipboard',
                        style: GoogleFonts.nunito(
                          fontSize: 20.sp,
                        ),
                      )),
                    );
                  });
                },
                borderRadius: BorderRadius.circular(8.w),
                child: Padding(
                  padding: EdgeInsets.all(2.sp),
                  child: Text(
                    'mubarak@codeswot.dev',
                    style: TextStyle(
                      fontSize: 15.sp,
                      color: const Color(0xffE6F1FF).withOpacity(0.5),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
