
# Airalo API - Common Attributes

This document describes the common attributes used throughout the Airalo Partner API.

| Attribute | Description |
| --- | --- |
| activation_code | Information that can be used during manual eSIM installation (requires SMDP+ address and activation code) |
| activation_policy | Defines the policy under which the eSIM activation is managed, whether it is activated immediately after the installation or after the connection to any supported network |
| airalo_code | Order number, can be found also on the invoices |
| amount | Amount of the data included in the plan in MBytes |
| apn | Provides the information regarding the APN settings |
| apn_type | Automatic/Manual. In case of "automatic" the apn is always set automatically on the OS - always use the mobile OS Specific value (Android or iOS) |
| apn_value | In case of manual APN type, the user should set the APN manually, and the value given here should be set |
| brand_settings_name | Brand name in case of eSIMs cloud link will be used. In case of empty value is given, either non-branded eSIMs cloud link will be given or the default brand will be used |
| code | Order number (e.g., "20241018-124189"), also can be found on the Get Order endpoint and on the invoices |
| contact_point | Webhook URL that points to the partner webhook implementation or partner email for notifications |
| countries | List of covered countries |
| country_code | 2 chars ISO country code |
| country_id | 2 chars ISO country code |
| coverages | Network coverages |
| created_at | Timestamp when the order and the eSIM has been created (e.g., 2024-06-06 12:26:24) |
| currency | Always USD, we have all prices in USD as of now |
| data | Example "3 GB" indicates the data included in the package together with the "GB" |
| day | Number of days, refers to the validity of the package/plan |
| description | Custom description can be used for the submit order and submit top-up order |
| direct_apple_installation_url | Direct URL for Apple devices to install the eSIM profile (Universal link supported by iOS 17.4 or above) |
| esim_type | Mostly prepared |
| expired_at | When the package expires in date-time format |
| gradient_end | Represents the end colour of a gradient, often used in UI design |
| gradient_start | Represents the start colour of a gradient, often used in UI design |
| iccid | Unique identifier for the eSIM |
| id | Can refer to package id, top-up package id or order id |
| installation_guides | Contains link to installation guides |
| installation_manual | Step-by-step guides for the manual installation - multi-lingual |
| installation_via_qr_code | Step-by-step guides for the QR code based installation - multi-lingual |
| instructions | List of instructions on the requested language for various OS (iOS, Android) and mobile devices |
| is_kyc_verify | Flag about if the package requires eKYC |
| is_prepaid | Indicates if the package or plan is prepaid |
| is_roaming | Specifies whether the package requires roaming services |
| is_unlimited | Indicates if the data package provides unlimited usage |
| language | Language of the installation instruction |
| lpa | Also known as SMDP address, can be used for manual installation |
| matching_id | Also known as Activation code, can be used for manual installation |
| msisdn | Phone number in case the plan contains voice option |
| name | Used in various areas, such as network name, country name, user name |
| net_price | Refers to the wholesale price |
| network_setup | Provides information about if the network setup is required during the installations |
| networks | List of supported networks |
| notification | Details about the opt-in/out notification |
| operators | List of operators that offers the plans/packages |
| other_info | Further information about the eSIM plan |
| package | Example "3 GB - 30 Days" - provides information/title for a package |
| package_id | Id of the eSIM plan, can be used for package ordering (always unique id) |
| packages | List of packages / plans provided by the operators |
| plan_type | Informs about the eSIM plan type (data, data-voice, data-voice-text) |
| price | Always refers to Recommended retail price |
| qr_code_data | Data that can be used to generate the custom QR code |
| qr_code_url | URL for the QR code |
| qr_installation | Contains instructions about the QR based installations |
| qrcode | Data that can be used to generate the custom QR code |
| qrcode_installation | Contains instructions about the QR based installations |
| qrcode_url | URL for the QR code |
| quantity | Number of eSIMs or data packages associated with the transaction |
| rechargeability | Indicates whether the eSIM or plan can be recharged |
| remaining | Data usage, remaining data |
| remaining_text | Data usage remaining text/sms |
| remaining_voice | Data usage, remaining voice/calls in minutes |
| short_info | Short summary information on eSIM packages |
| smdp_address | SMDP Address that can be used during the manual installations |
| smdp_address_and_activation_code | SMDP Address and the activation code together |
| status | Provides information about the eSIM package status |
| steps | Steps within the installations (manual, QR, network setup) |
| style | Design of the operator (optional) |
| text | Number of SMS messages included in the plan |
| total | Total amount of the data package |
| total_text | Number of SMS as part of the package |
| total_voice | Minutes can be used for voice call as part of the package |
| type | Indicates the type of the package, either eSIM or top-up |
| types | Network types for the operators, such as 3G, 4G, 5G |
| url | Refers to the url of the optionally used images |
| validity | The plan validity in days |
| version | iOS or Android version |
| voice | Number of minutes contained in the plan |
| voucher_code | Voucher code that can be shared with users |
| width | The width dimension, usually used in images |
