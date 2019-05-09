package com.plugin;

import android.os.Handler;
import android.os.Message;
import android.text.TextUtils;
import android.util.Log;

import com.alipay.sdk.app.PayTask;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class AlipayPlugin extends CordovaPlugin {

    private static final String TAG = "AlipayPlugin";
    private static final int SDK_PAY_FLAG = 1;
    private String mOrderData;

    private Handler mHandler = new Handler() {
        public void handleMessage(Message msg) {
            Map<String, Object> mObj = (Map<String, Object>) msg.obj;
            Map<String, String> result = (Map<String, String>) mObj.get("result");
            CallbackContext ct = (CallbackContext) mObj.get("callback");
            PayResult payResult = new PayResult(result);
            try {
                ct.success(payResult.getMessage());
            } catch (JSONException e) {
                e.printStackTrace();
                ct.error("JSONException");
            }
        }
    };

    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("pay")) {
            Log.d(TAG, "调用支付方法");
            mOrderData = args.getString(0);
            doPay(callbackContext);
        }
        return true;
    }

    private void doPay(final CallbackContext callbackContext) {

        Runnable payRunnable = new Runnable() {

            @Override
            public void run() {
                PayTask task = new PayTask(cordova.getActivity());
                Map<String, String> result = task.payV2(mOrderData, true);
                Message msg = new Message();
                Map<String, Object> mObj = new HashMap<String, Object>();
                mObj.put("result", result);
                mObj.put("callback", callbackContext);
                msg.what = SDK_PAY_FLAG;
                msg.obj = mObj;
                mHandler.sendMessage(msg);
            }
        };
        Thread payThread = new Thread(payRunnable);
        payThread.start();
    }

    public class PayResult {
        private String resultStatus;
        private String result;
        private String memo;

        PayResult(Map<String, String> rawResult) {
            if (rawResult == null) {
                return;
            }

            for (String key : rawResult.keySet()) {
                if (TextUtils.equals(key, "resultStatus")) {
                    resultStatus = rawResult.get(key);
                } else if (TextUtils.equals(key, "result")) {
                    result = rawResult.get(key);
                } else if (TextUtils.equals(key, "memo")) {
                    memo = rawResult.get(key);
                }
            }
        }

        public JSONObject getMessage() throws JSONException {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("resultStatus", this.resultStatus);
            jsonObject.put("memo", this.memo);
            jsonObject.put("result", this.result);
            return jsonObject;
        }
    }
}