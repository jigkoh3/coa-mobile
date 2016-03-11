package th.co.ais.cordova.plugin;

import com.ais.fungus.service.pushnotification.ServicePushRegister;
import com.ais.fungus.service.pushnotification.callback.NotificationListener;

public class PushUtil {
	//Push Notification
    public static ServicePushRegister servicePush;
    public static void setServicePushRegister(ServicePushRegister service) {
    	servicePush = service;
    }
    public static ServicePushRegister getServicePushRegister() {
    	return servicePush;
    }
    public static void setPushNotificationListener(NotificationListener listener) {
    	if (servicePush == null) {
			throw new RuntimeException("ServicePushRegister object has not been created. You must call ServicePushRegister.createInstance first.");
    	}
    	servicePush.setNotificationListener(listener);
    }
}
