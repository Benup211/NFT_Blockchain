"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

type LanguageContextType = {
  language: 'english' | 'nepali'
  setLanguage: (lang: 'english' | 'nepali') => void
  t: (key: string, params?: Record<string, string>) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations: Record<'english' | 'nepali', Record<string, string>> = {
  english: {
    "dashboard": "Dashboard",
    "settings": "Settings",
    "language": "Language",
    "english": "English",
    "nepali": "Nepali",
    "save_language_preference": "Save language preference",
    "language_settings_updated": "Language settings updated",
    "language_preference_set": "Your language preference has been set to {language}.",
    "choose_language": "Choose your preferred language for the application interface.",
    "search_properties": "Search properties...",
    "profile": "Profile",
    "log_out": "Log out",
    "my_properties": "My Properties",
    "market": "Market",
    "transactions": "Transactions",
    "help": "Help",
    "notifications": "Notifications",
    "display": "Display",
    "security": "Security",
    "wallets": "Wallets",
    "privacy": "Privacy",
    "api": "API",
    "manage_account_settings": "Manage your account settings and preferences.",
    "profile_updated": "Profile updated",
    "profile_update_success": "Your profile has been updated successfully.",
    "manage_profile_info": "Manage your public profile information.",
    "change_avatar": "Change Avatar",
    "avatar_description": "JPG, GIF or PNG. Max size of 2MB.",
    "username": "Username",
    "username_description": "This is your public display name.",
    "email": "Email",
    "email_description": "This is the email associated with your account.",
    "bio": "Bio",
    "bio_description": "Brief description for your profile. URLs are hyperlinked.",
    "update_profile": "Update profile",
    "notification_preferences_updated": "Notification preferences updated",
    "notification_settings_saved": "Your notification settings have been saved.",
    "manage_notification_preferences": "Manage your notification preferences.",
    "welcome_back": "Welcome back, {name}",
    "add_property": "Add Property",
    "new_transaction": "New Transaction",
    "create_new_transaction_description": "Create a new transaction for your NFT property.",
    "property_portfolio_value": "Property Portfolio Value",
    "recent_activity": "Recent Activity",
    "listed_properties": "Listed Properties",
    "recent_transactions": "Recent Transactions",
    "view_all": "View all",
    "total_assets": "Total Assets",
    "assets_change": "{change} from last month",
    "portfolio_value": "Portfolio Value",
    "value_change": "{change} from last month",
    "wallet_balance": "Wallet Balance",
    "eth_to_usd": "≈ ${amount} USD",
    "monthly_revenue": "Monthly Revenue",
    "revenue_change": "{change} from last month",
    "Jan": "Jan",
    "Feb": "Feb",
    "Mar": "Mar",
    "Apr": "Apr",
    "May": "May",
    "Jun": "Jun",
    "activity_property_sold": "Property {property} sold for ${amount}",
    "activity_new_offer": "New offer received for Property {property}",
    "activity_property_listed": "Property {property} listed for sale",
    "activity_rent_collected": "Rent collected for Property {property}",
    "2_hours_ago": "2 hours ago",
    "5_hours_ago": "5 hours ago",
    "1_day_ago": "1 day ago",
    "2_days_ago": "2 days ago",
    "owned": "Owned",
    "rented": "Rented",
    "price": "Price",
    "status": "Status",
    "edition": "Edition",
    "description": "Description",
    "close": "Close",
    "available": "Available",
    "pending": "Pending",
    "time_left": "Time Left",
    "date": "Date",
    "property": "Property",
    "amount": "Amount",
    "type": "Type",
    "purchase": "Purchase",
    "sale": "Sale",
    "listed": "Listed",
    "list_on_marketplace": "List on Marketplace",
    "unlist_from_marketplace": "Unlist from Marketplace",
    "property_action_success": "Property Action Successful",
    "property_action_description": "Property {title} has been {action} the marketplace.",
  },
  nepali: {
    "dashboard": "ड्यासबोर्ड",
    "settings": "सेटिङहरू",
    "language": "भाषा",
    "english": "अंग्रेजी",
    "nepali": "नेपाली",
    "save_language_preference": "भाषा प्राथमिकता सुरक्षित गर्नुहोस्",
    "language_settings_updated": "भाषा सेटिङहरू अपडेट गरियो",
    "language_preference_set": "तपाईंको भाषा प्राथमिकता {language} मा सेट गरिएको छ।",
    "choose_language": "एप्लिकेसन इन्टरफेसको लागि तपाईंको मनपर्ने भाषा छान्नुहोस्।",
    "search_properties": "सम्पत्तिहरू खोज्नुहोस्...",
    "profile": "प्रोफाइल",
    "log_out": "लग आउट",
    "my_properties": "मेरो सम्पत्तिहरू",
    "market": "बजार",
    "transactions": "लेनदेनहरू",
    "help": "मद्दत",
    "notifications": "सूचनाहरू",
    "display": "प्रदर्शन",
    "security": "सुरक्षा",
    "wallets": "वालेटहरू",
    "privacy": "गोपनीयता",
    "api": "एपीआई",
    "manage_account_settings": "तपाईंको खाता सेटिङहरू र प्राथमिकताहरू व्यवस्थापन गर्नुहोस्।",
    "profile_updated": "प्रोफाइल अपडेट गरियो",
    "profile_update_success": "तपाईंको प्रोफाइल सफलतापूर्वक अपडेट गरिएको छ।",
    "manage_profile_info": "तपाईंको सार्वजनिक प्रोफाइल जानकारी व्यवस्थापन गर्नुहोस्।",
    "change_avatar": "अवतार परिवर्तन गर्नुहोस्",
    "avatar_description": "JPG, GIF वा PNG। अधिकतम साइज 2MB।",
    "username": "प्रयोगकर्ता नाम",
    "username_description": "यो तपाईंको सार्वजनिक प्रदर्शन नाम हो।",
    "email": "इमेल",
    "email_description": "यो तपाईंको खातासँग सम्बन्धित इमेल हो।",
    "bio": "जीवनी",
    "bio_description": "तपाईंको प्रोफाइलको लागि संक्षिप्त विवरण। URL हरू हाइपरलिंक गरिएका छन्।",
    "update_profile": "प्रोफाइल अपडेट गर्नुहोस्",
    "notification_preferences_updated": "सूचना प्राथमिकताहरू अपडेट गरियो",
    "notification_settings_saved": "तपाईंको सूचना सेटिङहरू सुरक्षित गरिएको छ।",
    "manage_notification_preferences": "तपाईंको सूचना प्राथमिकताहरू व्यवस्थापन गर्नुहोस्।",
    "welcome_back": "स्वागत छ, {name}",
    "add_property": "सम्पत्ति थप्नुहोस्",
    "new_transaction": "नयाँ लेनदेन",
    "create_new_transaction_description": "तपाईंको NFT सम्पत्तिको लागि नयाँ लेनदेन सिर्जना गर्नुहोस्।",
    "property_portfolio_value": "सम्पत्ति पोर्टफोलियो मूल्य",
    "recent_activity": "हालैको गतिविधि",
    "listed_properties": "सूचीबद्ध सम्पत्तिहरू",
    "recent_transactions": "हालैका लेनदेनहरू",
    "view_all": "सबै हेर्नुहोस्",
    "total_assets": "कुल सम्पत्तिहरू",
    "assets_change": "गत महिनाबाट {change}",
    "portfolio_value": "पोर्टफोलियो मूल्य",
    "value_change": "गत महिनाबाट {change}",
    "wallet_balance": "वालेट ब्यालेन्स",
    "eth_to_usd": "≈ ${amount} USD",
    "monthly_revenue": "मासिक आम्दानी",
    "revenue_change": "गत महिनाबाट {change}",
    "Jan": "जनवरी",
    "Feb": "फेब्रुअरी",
    "Mar": "मार्च",
    "Apr": "अप्रिल",
    "May": "मे",
    "Jun": "जून",
    "activity_property_sold": "सम्पत्ति {property} ${amount} मा बिक्री भयो",
    "activity_new_offer": "सम्पत्ति {property} को लागि नयाँ प्रस्ताव प्राप्त भयो",
    "activity_property_listed": "सम्पत्ति {property} बिक्रीको लागि सूचीबद्ध गरियो",
    "activity_rent_collected": "सम्पत्ति {property} को भाडा संकलन गरियो",
    "2_hours_ago": "2 घण्टा अघि",
    "5_hours_ago": "5 घण्टा अघि",
    "1_day_ago": "1 दिन अघि",
    "2_days_ago": "2 दिन अघि",
    "owned": "स्वामित्व",
    "rented": "भाडामा",
    "price": "मूल्य",
    "status": "स्थिति",
    "edition": "संस्करण",
    "description": "विवरण",
    "close": "बन्द गर्नुहोस्",
    "available": "उपलब्ध",
    "pending": "प्रक्रियामा",
    "time_left": "बाँकी समय",
    "date": "मिति",
    "property": "सम्पत्ति",
    "amount": "रकम",
    "type": "प्रकार",
    "purchase": "खरिद",
    "sale": "बिक्री",
    "listed": "सूचीबद्ध",
    "list_on_marketplace": "मार्केटप्लेसमा सूचीबद्ध गर्नुहोस्",
    "unlist_from_marketplace": "मार्केटप्लेसबाट हटाउनुहोस्",
    "property_action_success": "सम्पत्ति कार्य सफल भयो",
    "property_action_description": "सम्पत्ति {title} मार्केटप्लेसमा {action} गरिएको छ।",
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<'english' | 'nepali'>('english')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as 'english' | 'nepali'
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const t = (key: string, params?: Record<string, string>) => {
    let translation = translations[language][key as keyof typeof translations['english']] || key
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation.replace(`{${param}}`, value)
      })
    }
    return translation
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

