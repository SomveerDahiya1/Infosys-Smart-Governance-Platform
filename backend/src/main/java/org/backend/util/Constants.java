package org.backend.util;

public final class Constants {


    private Constants() {
    }

    public static final String ROLE_ADMIN = "ADMIN";
    public static final String ROLE_OFFICER = "OFFICER";
    public static final String ROLE_CITIZEN = "CITIZEN";

    public static final String STATUS_PENDING = "PENDING";
    public static final String STATUS_ASSIGNED = "ASSIGNED";
    public static final String STATUS_IN_PROGRESS = "IN_PROGRESS";
    public static final String STATUS_RESOLVED = "RESOLVED";
    public static final String STATUS_CLOSED = "CLOSED";
    public static final String STATUS_REJECTED = "REJECTED";

    public static final String NOTIFICATION_TYPE_COMPLAINT_UPDATE =
            "COMPLAINT_UPDATE";

    public static final String NOTIFICATION_TYPE_SYSTEM =
            "SYSTEM";

    public static final String NOTIFICATION_TYPE_REMINDER =
            "REMINDER";


}
