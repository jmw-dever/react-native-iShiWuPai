package com.upgrade;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.text.Html;
import com.ishiwupai.R;

import android.widget.Toast;
public class UpdateDialog {

     static void show(final Context context, String content, final String downloadUrl) {
         if (isContextValid(context)) {
             AlertDialog.Builder builder = new AlertDialog.Builder(context);
             builder.setTitle(R.string.android_auto_update_dialog_title);
             builder.setMessage(Html.fromHtml(content))
                     .setPositiveButton(R.string.android_auto_update_dialog_btn_download, new DialogInterface.OnClickListener() {
                         public void onClick(DialogInterface dialog, int id) {
                             goToDownload(context, downloadUrl);
                         }
                     })
                     .setNegativeButton(R.string.android_auto_update_dialog_btn_cancel, new DialogInterface.OnClickListener() {
                         public void onClick(DialogInterface dialog, int id) {
                         }
                     });

             AlertDialog dialog = builder.create();
             //点击对话框外面,对话框不消失
             dialog.setCanceledOnTouchOutside(false);
             dialog.show();
         }else{
            Toast.makeText(context.getApplicationContext(), "false" ,Toast.LENGTH_SHORT).show();
         }
     }

    private static boolean isContextValid(Context context) {
        return context instanceof Activity && !((Activity) context).isFinishing();
    }

    public static void goToDownload(Context context, String downloadUrl) {
        Intent intent = new Intent(context, DownloadService.class);
        intent.putExtra(Constants.APK_DOWNLOAD_URL, downloadUrl);
        intent.setAction("android.intent.action.RESPOND_VIA_MESSAGE");
        Toast.makeText(context, intent.toString(), Toast.LENGTH_SHORT).show();
        context.startService(intent);
    }
}
