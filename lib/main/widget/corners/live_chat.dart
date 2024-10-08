import 'package:codeswot/config/theme/colors.dart';
import 'package:codeswot/main/widget/local_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class BottomAnchorStyleLgMd extends StatelessWidget {
  const BottomAnchorStyleLgMd({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return LocalImage(
      imgPath: 'public/png/crox.png',
      width: 120.w,
      color: AppColors.primaryColor.withOpacity(0.1),
    );
  }
}
