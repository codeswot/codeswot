import 'package:codeswot/config/theme/colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';

class CodeSwotLogo extends StatelessWidget {
  const CodeSwotLogo({
    this.fontSize = 18,
    super.key,
  });
  final double fontSize;
  @override
  Widget build(BuildContext context) {
    return RichText(
      text: TextSpan(
        text: '{C}',
        style: GoogleFonts.sourceCodePro(
          color: AppColors.primaryColor,
          fontSize: fontSize.sp + 2,
          fontWeight: FontWeight.bold,
        ),
        children: [
          TextSpan(
            text: 'odeswot',
            style: GoogleFonts.nunito(
              color: AppColors.textColor,
              fontSize: fontSize.sp,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }
}
