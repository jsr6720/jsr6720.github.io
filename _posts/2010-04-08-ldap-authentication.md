---
layout: post
author: James Rowe
title:  "LDAP Authentication"
date:   "2010-04-08 00:00:00 -0400"
tags: wordpress, txcowboycoder, "Java", "flex", "Java", "ldap"
uid: ec7b94d8-d72c-4fb0-9b7a-6b488df527e3
---


## LDAP Authentication


Recently I needed a way to build authentication into a Flex application.


Instead of using a model baked into the Flex code that need recompilation, or other security concerns with flat files, I built a simple LDAP authentication java file, paired with a .properties file and is called via [RemoteObject](http://livedocs.adobe.com/flex/3/langref/mx/rpc/remoting/mxml/RemoteObject.html "RemoteObject") in flex.


I’ve posted code that uses simple authentication (no encryption over the wire) as this is an internal application, but it can be enhanced to do so.


The constructor builds an object that can connect to a LDAP source, all LDAP configuration is managed via the .properties file.


The heavy lifting is done by an authenticate method, returns a hash table (serialized as an object in flex). This allows me to see a) if they are authenticated, and b) what groups they are in using dot notation. 



```
// Pseudocode -- remote object has a handler method, doesn't actually return an object (java code returns HashTable, serialized as object)
ldapAuthObj:Object = remoteObject.authenticate("username","password");

// now we can look at the object
if (ldapAuthObj.authenticated) { /** user was validated */ }
if (ldapAuthObj.GROUP_<name>) { /** user was in group */ }

```

java file



```
import javax.naming.*;
import javax.naming.directory.*;

import java.util.Hashtable;
import java.util.Properties;
import java.util.Enumeration;
import java.util.Map;
import java.util.HashMap;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

/**
 * This class to be used for authenticating against an LDAP server
*/
public class LDAPAuthenticationService {

	/** import these attributes from the config file */
	private static String INITIAL_CONTEXT_FACTORY;
	private static String PROVIDER_URL;
	private static String SECURITY_AUTHENTICATION;
	private static String BASE_DN;
	private static String LDAP_USERS_LOC;
	private static String LDAP_GROUPS_LOC;
	private static boolean LDAP_OVERRIDE;
	private static String LDAP_OVERRIDE_UNAME;
	private static String LDAP_OVERRIDE_PWORD;
	private static Map<String, String> groups;

	/** to allow connections from multiple methods */
	private DirContext ctx;

	/** track error messages */
	private String errorStack =""; // init to not null

	/** default constructor */
	public LDAPAuthenticationService() {
		// read in the properties file
		try {
			// go get the properties for this LDAP connection
			Properties configFile = new Properties();
			// load the file from the class path (moved there by ant task)
			configFile.load(this.getClass().getClassLoader().getResourceAsStream("/ldap.properties"));

			// send ouput to console
		//	enumerateContents(configFile.propertyNames());

			this.INITIAL_CONTEXT_FACTORY = configFile.getProperty("INITIAL_CONTEXT_FACTORY");
			this.PROVIDER_URL = configFile.getProperty("PROVIDER_URL");
			this.SECURITY_AUTHENTICATION = configFile.getProperty("SECURITY_AUTHENTICATION");
			this.BASE_DN = configFile.getProperty("BASE_DN");
			this.LDAP_USERS_LOC = configFile.getProperty("LDAP_USERS_LOC");
			this.LDAP_GROUPS_LOC = configFile.getProperty("LDAP_GROUPS_LOC");

			// get override info
			this.LDAP_OVERRIDE = Boolean.parseBoolean(configFile.getProperty("LDAP_OVERRIDE"));
			this.LDAP_OVERRIDE_UNAME = configFile.getProperty("LDAP_OVERRIDE_UNAME");
			this.LDAP_OVERRIDE_PWORD = configFile.getProperty("LDAP_OVERRIDE_PWORD");

			// init the array list
			groups = new HashMap<String, String>();
			// load the groups into a String array
			for (Enumeration e = configFile.propertyNames() ; e.hasMoreElements() ;) {
				String key = e.nextElement().toString();
				if (key.indexOf("GROUP_") == 0) { // ie key in key=value pair matches "GROUP_"
					// append the group name to the array list for checking later
					groups.put(key,configFile.getProperty(key));
				}
			}

		}
		catch (FileNotFoundException e) {
		//	e.printStackTrace();
			System.err.println("FileNotFoundException: "+e.getMessage());
			errorStack+=e.getMessage()+"\n";
		}
		catch (IOException e) {
			// TODO set defaults, or just give up?
		//	e.printStackTrace();
			System.err.println("IOException: "+e.getMessage());
			errorStack+=e.getMessage()+"\n";
		}

	}

	/**
	 * This method will test if a user has access to the LDAP, if so
	 * it will then check the list of groups and check for is access
	 *
	 * @param String username as named via a uid in the LDAP
	 * @param String password clear text in LDAP
	 * @return Hashtable authenticate object
	*/
	public Hashtable authenticate (String username, String password) {

		Hashtable<String,Boolean> authHT = new Hashtable<String,Boolean>();

		// assume they will not pass the test
		boolean authenticated = false;

		// first check to see if we even need to hit LDAP (not overridden)
		if (this.LDAP_OVERRIDE) {
			System.out.println("Override Authentication");
			// just check against stored username/password, put in all groups
			if (username.equals(this.LDAP_OVERRIDE_UNAME) && password.equals(this.LDAP_OVERRIDE_PWORD)) {
				authenticated = true;
				// just add then to each group
				for(String key : groups.keySet()) {
					// push the name of the group and access to it boolean
					authHT.put(key,true); // method throws NamingException
				}
			}

		}
		else { // authenticate agianst LDAP
			System.err.println("LDAP Authentication: " + username);
			// build a hash table to pass as a bindable event
			// Set up environment for creating initial context
			Hashtable<String,String> env = new Hashtable<String,String>();

			env.put(Context.INITIAL_CONTEXT_FACTORY,this.INITIAL_CONTEXT_FACTORY);
			env.put(Context.PROVIDER_URL, this.PROVIDER_URL);

			env.put(Context.SECURITY_AUTHENTICATION, this.SECURITY_AUTHENTICATION);
			// we take the uid to authenticate, pair it with the username, and append the base location
			env.put(Context.SECURITY_PRINCIPAL, "uid="+username+","+this.LDAP_USERS_LOC+this.BASE_DN);
			env.put(Context.SECURITY_CREDENTIALS, password);

			// send ouput to console
		//	enumerateContents(env.elements());

			try {
				// first we want to connect to the LDAP Server and create initial context
				// making sure the user name and password are valid
			    ctx = new InitialDirContext(env); // Throws AuthenticationException if not valid username/password
				// WE NEVER GO PAST HERE IF AuthenticationException THROWN
				System.err.println("made init connect");
				// made it past the
				authenticated = true;

				// now that we have verified they are a valid user, lets see what type of access they have
				// groups are specified in the config file as "GROUP_<name>" key=value pairs where value is the LDAP group name
				// and key is what we are looking for in the scheduling app
			    for(String key : groups.keySet()) {
					// push the name of the group and access to it boolean
					authHT.put(key,new Boolean(userInGroup(username,groups.get(key)))); // method throws NamingException
				}

			    // Close the context when we're done
			    ctx.close();
			}
			catch (AuthenticationException e) {
				// binding to LDAP server with provided username/password failed
				// e.printStackTrace();
				System.err.println("AuthenticationException: "+e.getMessage()); // outputs -> [LDAP: error code 49 - Invalid Credentials]
				errorStack+=e.getMessage()+"\n";
			}
			catch (NamingException e) {
				// catches invalid DN. Should not be thrown unless changes made to DN
				// Could also fail from the context of the called method userInGroup
				System.err.println("NamingException: "+e.getMessage());
				//e.printStackTrace();
				errorStack+=e.getMessage()+"\n";
			}
		}

		// push whether or not it was authenticated
		authHT.put("authenticated",new Boolean(authenticated));

		/** spill contents to catalina.out file
		enumerateContents(authHT.keys());
		enumerateContents(authHT.elements());*/

		return(authHT);
	}

	/** return any failure codes. Since we only return boolean from
	 * authenticate method. Good idea to have way to see error
	 */
	public String getAuthenticateError () {
		System.err.println(errorStack); // send to catalina.out log file
		return errorStack;
	}

	/**
	 * after a user has successfully logged in we want to build
	 * an access object for use in the scheduling system
	 *
	 * @param String username
	 * @param String group a group name to check for username in (via memberUid string)
	 * @return boolean yes or no in the group
	 * @throws NamingException when the search fails by DN this will be thrown
	 */
	private boolean userInGroup (String username, String group) throws NamingException {
		// assume they are not
		boolean inGroup = false;

		// Specify the attributes to match
		Attributes matchAttrs = new BasicAttributes(true); // ignore attribute name case
		// set the common name for the group
		matchAttrs.put(new BasicAttribute("cn",group)); // named group for access rights

		// Search for objects that have those matching attributes in the specified group location
		NamingEnumeration answer = ctx.search(this.LDAP_GROUPS_LOC+this.BASE_DN, matchAttrs);

		// search for that user id in the member list
		while (answer.hasMore()) {
		    SearchResult sr = (SearchResult)answer.next();
		    if ((sr.getAttributes().get("memberuid").toString()).indexOf(username) >= 0) {
				// this user is in the specified group
				inGroup = true;
			}
		}
		System.err.println(username + " in " + group + ": "+new Boolean(inGroup).toString());
		return inGroup;
	}

	/** useful for diagnostic infomration, spit out a set of elements
	  * say in a hashtable or properties file
	  */
	private void enumerateContents(Enumeration e) {
		while (e.hasMoreElements()) {
			System.err.println(e.nextElement());
		}
	}
}

```

.properties file



```
# This is a config file for specifing some generic information
# about the LDAP location to avoid recompiling the source code

# most of these key=value pairs use a Context.<name> as a key

INITIAL_CONTEXT_FACTORY=com.sun.jndi.ldap.LdapCtxFactory

# space separated values for more than one ldap server
PROVIDER_URL=<url>

# supports none, simple, strong
SECURITY_AUTHENTICATION=simple

# start a name with the base DN (where all LDAP objs are)
BASE_DN=<dn>

# Name other Locations
# TRAILING COMMA REQUIRED. so LDAP_USERS_LOC + BASE_DN = fully qualified name
# allows for ease of sub directory traversing if needed in the future

# from BASE_DN where are all users stored
LDAP_USERS_LOC=<users>,
# from BASE_DN where are all the groups
LDAP_GROUPS_LOC=<groups>,

### In case of LDAP communication failure (or manual override, say for local development)
LDAP_OVERRIDE=false
LDAP_OVERRIDE_UNAME=dev
LDAP_OVERRIDE_PWORD=user

### IMPORTANT: All group names need to start with "GROUP_" that is how the
### java class knows what groups to authenticate for. IE it goes though all
### the file's attributes, looks for GROUP_ the value is the group name in LDAP

### Left side (key) is name in Flex app to verify against
### Right side (value) is group name in LDAP server
### So java uses the "GROUP_" key/values in a HashMap and verifies the user
### is in the LDAP group (value) and assigns a boolean to the key

# groups
GROUP_A=<ldap group>
GROUP_B=<ldap group>
GROUP_C=<ldap group>

```



---

##### Author's Note

Initial `md` Generated using [https://github.com/jsr6720/wordpress-html-scraper-to-md](https://github.com/jsr6720/wordpress-html-scraper-to-md)

Original Wordpress categories: ['Java']

Original Wordpress tags: "Java", "flex", "Java", "ldap"

Original Wordpress comments: <a href="https://txcowboycoder.wordpress.com/2010/04/08/ldap-authentication/#comments">2 Comments</a>

##### Significant revisions

tags: {{ page.tags | join: ", " }} <!-- todo move this somewhere -->

- {{ "2024-05-06 22:47:18" | date_to_string: "ordinal", "US" }} Converted to jekyll markdown format and copied to personal site
- {{ page.date | date_to_string: "ordinal", "US" }} Originally published on [txcowboycoder wordpress site](https://txcowboycoder.wordpress.com/2010/04/08/ldap-authentication/)

##### EOF/Footnotes

