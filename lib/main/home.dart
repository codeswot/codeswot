import 'package:codeswot/config/theme/colors.dart';
import 'package:codeswot/main/widget/app_bar.dart';
import 'package:codeswot/main/widget/corners/email.dart';
import 'package:codeswot/main/widget/corners/live_chat.dart';
import 'package:codeswot/main/widget/corners/social.dart';
import 'package:codeswot/main/widget/local_image.dart';
import 'package:codeswot/main/widget/main_desktop.dart';
import 'package:codeswot/main/widget/under_construction.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:responsive_framework/responsive_framework.dart';

class HomeMain extends ConsumerStatefulWidget {
  const HomeMain({super.key});

  @override
  ConsumerState<ConsumerStatefulWidget> createState() => _HomeMainState();
}

class _HomeMainState extends ConsumerState<HomeMain> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final isDesktopAbove = ResponsiveBreakpoints.of(context).largerThan(TABLET);
    return Scaffold(
      backgroundColor: AppColors.backgroundColor,
      appBar: isDesktopAbove ? const CodeswotAppBar() : null,
      body: isDesktopAbove
          ? SizedBox(
              width: 1.sw,
              height: 1.sh,
              child: const Row(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  BottomSocialLgMd(),
                  MainPageLgMd(),
                  Column(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      EmailLgMd(),
                      BottomAnchorStyleLgMd(),
                    ],
                  ),
                ],
              ),
            )
          : const Undercontruction(),
      floatingActionButton: isDesktopAbove
          ? FloatingActionButton(
              backgroundColor: AppColors.textColor.withOpacity(0.10),
              onPressed: () {},
              child: LocalImage(
                imgPath: 'icons/png/chat_bg.png',
                width: 30.w,
              ),
            )
          : null,
    );
  }
}
