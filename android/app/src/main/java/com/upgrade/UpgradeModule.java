package com.upgrade;

import android.content.Context;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.ishiwupai.MainActivity;

import android.widget.Toast;

/**
 * Created by Song on 2017/7/10.
 */
public class UpgradeModule extends ReactContextBaseJavaModule {

    private Context context;

    public UpgradeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
    }

    @Override
    public String getName() {
        return "UpgradeAndroid";
    }

    @ReactMethod
    public void upgradeApk(String apkUrl) {
        UpdateDialog.show(MainActivity.getMainActivity(),"该版本不是最新版本，是否下载最新版本", apkUrl);
    }

}
