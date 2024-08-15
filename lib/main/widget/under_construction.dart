import 'package:codeswot/main/widget/awesome_logo.dart';
import 'package:codeswot/main/widget/main_desktop.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';

class Undercontruction extends StatelessWidget {
  const Undercontruction({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(100.w),
      width: 1.sw,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          CodeSwotLogo(
            fontSize: 100.sp,
          ),
          SizedBox(height: 40.w),
          Container(
            padding: EdgeInsets.all(30.w),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.1),
              borderRadius: BorderRadius.circular(10.w),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Under Construction 👷🏾‍♂️\nYou can check back later when i\'m done brewing coffee ☕️',
                  style: GoogleFonts.nunito(
                    color: Colors.white,
                    fontSize: 50.sp,
                  ),
                ),
                SizedBox(height: 20.w),
                InkWell(
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
                        fontSize: 30.sp,
                        color: const Color(0xff64FFDA).withOpacity(0.6),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
