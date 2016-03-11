package th.co.ais.cordova.plugin;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import th.co.ais.COA.CordovaApp;
import th.co.ais.COA.R;

import android.app.Activity;
import android.util.Log;

import com.ais.fungus.admin.Debugger;
import com.ais.fungus.data.FungusParameter;
import com.ais.fungus.developer.Developer;
import com.ais.fungus.service.ResponseStatus;
import com.ais.fungus.service.pushnotification.ServicePushRegister;
import com.ais.fungus.service.pushnotification.ServiceSubscribe;
import com.ais.fungus.service.pushnotification.ServiceUnsubscribe;
import com.ais.fungus.service.pushnotification.callback.CallbackServicePushRegister;
import com.ais.fungus.service.pushnotification.callback.CallbackServiceSubscribe;
import com.ais.fungus.service.pushnotification.callback.CallbackServiceUnsubscribe;
import com.ais.fungus.service.pushnotification.callback.NotificationListener;

public class PluginFungusPushNotification extends CordovaPlugin implements NotificationListener {
	private static final String TAG = "Push Plugin";
    
	private Activity myContext;

    private String userId = "";

    private final String PLUGIN_ACTION_SUBSCRIBE = "subscribePlugin";
    private final String PLUGIN_ACTION_UNSUBSCRIBE = "unsubscribePlugin";
    
    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
    }

    
    @Override
    public boolean execute(String action, final JSONArray args, final CallbackContext callbackContext) throws JSONException {
    	boolean retVal = false;
    	myContext = this.cordova.getActivity();

    	try {
    		userId = args.getString(0);
    		Log.i(TAG, "User ID: " + userId);
    	} catch (JSONException ex) {
    		callbackContext.error("Missing paramteter User ID");
    		return retVal;
    	}
		
    	if (FungusParameter.getInstance() == null) {
    		String serviceNumber = myContext.getResources().getString(R.string.fungus_param_service_number);
    		String icpId = myContext.getResources().getString(R.string.fungus_param_icpid);
    		String appVersion = myContext.getResources().getString(R.string.fungus_param_app_version);
    		String certification = myContext.getResources().getString(R.string.fungus_param_certificate);
    		Developer.setFungusParameter(serviceNumber, icpId, appVersion, certification);
    		Log.i(PluginFungusPushNotification.class.getName(), serviceNumber + ", " + icpId + ", " + appVersion + ", " + certification);
    	}
    	
        if (action.equals(PLUGIN_ACTION_SUBSCRIBE)) {
        	Runnable run = new Runnable() {
    			public void run() {
    				initialPushService(callbackContext);
					requestPushNitification(args);
					
    				/*if (PushUtil.getServicePushRegister() == null) {
    					initialPushService(callbackContext);
    					requestPushNitification(args);
    				} else {
    					requestSubscribe(callbackContext);
    				}*/
    			}
    		};
    		this.cordova.getActivity().runOnUiThread(run);
        	retVal = true;
        } else if (action.equals(PLUGIN_ACTION_UNSUBSCRIBE)) {
        	Runnable run = new Runnable() {
    			public void run() {
    				requestUnsubscribe(callbackContext);
    			}
    		};
    		this.cordova.getActivity().runOnUiThread(run);
        	retVal = true;
        }
        
        return retVal;
    }
    
    public void initialPushService(final CallbackContext callbackContext) {
		ServicePushRegister push = ServicePushRegister.createInstance(myContext, new CallbackServicePushRegister() {
			@Override
			public void callbackServiceSuccessed() {
	    		Log.i(TAG, "Registeration Successed !!");
				requestSubscribe(callbackContext);
			}
			
			@Override
			public void callbackServiceError(ResponseStatus status) {
	    		Log.i(TAG, "Registeration Failed: " + status.getDescription());
				callbackContext.error(status.getDescription());
			}
		});
		PushUtil.setServicePushRegister(push);
		PushUtil.setPushNotificationListener(this);
    }
    
    private void requestPushNitification(final JSONArray args) {
    	PushUtil.getServicePushRegister().setParameter(userId);
    	PushUtil.getServicePushRegister().setShowProgress(false);
    	PushUtil.getServicePushRegister().fungusRequest();
    }
    
	public static void onResume() {
		if (PushUtil.getServicePushRegister() != null) PushUtil.getServicePushRegister().onResume();
	}
	
	public static void onPause() {
		if (PushUtil.getServicePushRegister() != null) PushUtil.getServicePushRegister().onPause();
	}
	
	@Override
	public void onDestroy() {
		super.onDestroy();
		if (PushUtil.getServicePushRegister() != null) PushUtil.getServicePushRegister().onDestroy();
		Developer.clearParameter();
	}
    
    private void requestSubscribe(final CallbackContext callbackContext) {
    	ServiceSubscribe service = new ServiceSubscribe(myContext, new CallbackServiceSubscribe() {
			@Override
			public void callbackServiceSuccessed() {
	    		Log.i(TAG, "Subscribe Successed !!");
				callbackContext.success();
			}

			@Override
			public void callbackServiceError(ResponseStatus status) {
	    		Log.i(TAG, "Subscribe Failed: " + status.getDescription());
				callbackContext.error(status.getDescription());
			}
    	});
    	service.setShowProgress(false);
    	service.fungusRequest();
    }
    
    private void requestUnsubscribe(final CallbackContext callbackContext) {
    	ServiceUnsubscribe service = new ServiceUnsubscribe(myContext, new CallbackServiceUnsubscribe() {
			@Override
			public void callbackServiceSuccessed() {
	    		Log.i(TAG, "Unsubscribe Successed !!");
				callbackContext.success();
			}

			@Override
			public void callbackServiceError(ResponseStatus status) {
	    		Log.i(TAG, "Unsubscribe Failed: " + status.getDescription());
				callbackContext.error(status.getDescription());
			}
    	});
    	service.setShowProgress(false);
    	service.fungusRequest();
    }

	@Override
	public void onRecieved(String arg0) {
		Debugger.log(TAG, "onRecieveNotification: " + arg0);
		try {
			JSONObject jsonObj = new JSONObject(arg0);
			String sound = jsonObj.getString("sound");
			String message = jsonObj.getString("alert");
			String badge = jsonObj.getString("badge");
			Log.i(TAG, "Notification:\nSound: " + sound + "\nMessage: " + message + "\nBadge: " + badge);
			
			CordovaApp.callJavaScript(String.format("callbackMessage('%s');", message));
		} catch (JSONException e) {
			e.printStackTrace();
		}
	}
}
