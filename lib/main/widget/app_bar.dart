import 'dart:ui';

import 'package:codeswot/config/theme/colors.dart';
import 'package:codeswot/main/widget/awesome_logo.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class CodeswotAppBar extends StatelessWidget implements PreferredSizeWidget {
  const CodeswotAppBar({super.key});

  @override
  Widget build(BuildContext context) {
    return ClipRect(
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 10.0, sigmaY: 10.0),
        child: Container(
          height: preferredSize.height,
          width: preferredSize.width,
          decoration: BoxDecoration(
            color: AppColors.accent.withOpacity(0.3),
          ),
          child: Padding(
            padding: EdgeInsets.symmetric(horizontal: 16.w),
            child: const Row(
              children: [
                CodeSwotLogo(),
              ],
            ),
          ),
        ),
      ),
    );
  }

  @override
  Size get preferredSize => Size(1.sw, 60.w);
}
