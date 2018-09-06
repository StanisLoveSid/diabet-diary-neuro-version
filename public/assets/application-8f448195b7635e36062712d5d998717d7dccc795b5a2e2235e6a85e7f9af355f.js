/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
if(!window['googleLT_']){window['googleLT_']=(new Date()).getTime();}if (!window['google']) {
window['google'] = {};
}
if (!window['google']['loader']) {
window['google']['loader'] = {};
google.loader.ServiceBase = 'https://www.google.com/uds';
google.loader.GoogleApisBase = 'https://ajax.googleapis.com/ajax';
google.loader.ApiKey = 'notsupplied';
google.loader.KeyVerified = true;
google.loader.LoadFailure = false;
google.loader.Secure = true;
google.loader.GoogleLocale = 'www.google.com';
google.loader.ClientLocation = null;
google.loader.AdditionalParams = '';
(function() {function g(a){return a in l?l[a]:l[a]=-1!=navigator.userAgent.toLowerCase().indexOf(a)}var l={};function m(a,b){var c=function(){};c.prototype=b.prototype;a.ca=b.prototype;a.prototype=new c}function n(a,b,c){var d=Array.prototype.slice.call(arguments,2)||[];return function(){return a.apply(b,d.concat(Array.prototype.slice.call(arguments)))}}function p(a){a=Error(a);a.toString=function(){return this.message};return a}
function q(a,b){a=a.split(/\./);for(var c=window,d=0;d<a.length-1;d++)c[a[d]]||(c[a[d]]={}),c=c[a[d]];c[a[a.length-1]]=b}function r(a,b,c){a[b]=c}if(!t)var t=q;if(!u)var u=r;google.loader.F={};t("google.loader.callbacks",google.loader.F);var v={},w={};google.loader.eval={};t("google.loader.eval",google.loader.eval);
google.load=function(a,b,c){function d(a){var b=a.split(".");if(2<b.length)throw p("Module: '"+a+"' not found!");"undefined"!=typeof b[1]&&(e=b[0],c.packages=c.packages||[],c.packages.push(b[1]))}var e=a;c=c||{};if(a instanceof Array||a&&"object"==typeof a&&"function"==typeof a.join&&"function"==typeof a.reverse)for(var f=0;f<a.length;f++)d(a[f]);else d(a);if(a=v[":"+e]){c&&!c.language&&c.locale&&(c.language=c.locale);c&&"string"==typeof c.callback&&(f=c.callback,f.match(/^[[\]A-Za-z0-9._]+$/)&&(f=
window.eval(f),c.callback=f));if((f=c&&null!=c.callback)&&!a.D(b))throw p("Module: '"+e+"' must be loaded before DOM onLoad!");f?a.u(b,c)?window.setTimeout(c.callback,0):a.load(b,c):a.u(b,c)||a.load(b,c)}else throw p("Module: '"+e+"' not found!");};t("google.load",google.load);
google.ba=function(a,b){b?(0==x.length&&(y(window,"load",z),!g("msie")&&!g("safari")&&!g("konqueror")&&g("mozilla")||window.opera?window.addEventListener("DOMContentLoaded",z,!1):g("msie")?document.write("<script defer onreadystatechange='google.loader.domReady()' src=//:>\x3c/script>"):(g("safari")||g("konqueror"))&&window.setTimeout(B,10)),x.push(a)):y(window,"load",a)};t("google.setOnLoadCallback",google.ba);
function y(a,b,c){if(a.addEventListener)a.addEventListener(b,c,!1);else if(a.attachEvent)a.attachEvent("on"+b,c);else{var d=a["on"+b];a["on"+b]=null!=d?C([c,d]):c}}function C(a){return function(){for(var b=0;b<a.length;b++)a[b]()}}var x=[];google.loader.W=function(){var a=window.event.srcElement;"complete"==a.readyState&&(a.onreadystatechange=null,a.parentNode.removeChild(a),z())};t("google.loader.domReady",google.loader.W);var D={loaded:!0,complete:!0};
function B(){D[document.readyState]?z():0<x.length&&window.setTimeout(B,10)}function z(){for(var a=0;a<x.length;a++)x[a]();x.length=0}
google.loader.f=function(a,b,c){if(c){var d;"script"==a?(d=document.createElement("script"),d.type="text/javascript",d.src=b):"css"==a&&(d=document.createElement("link"),d.type="text/css",d.href=b,d.rel="stylesheet");(a=document.getElementsByTagName("head")[0])||(a=document.body.parentNode.appendChild(document.createElement("head")));a.appendChild(d)}else"script"==a?document.write('<script src="'+b+'" type="text/javascript">\x3c/script>'):"css"==a&&document.write('<link href="'+b+'" type="text/css" rel="stylesheet"></link>')};
t("google.loader.writeLoadTag",google.loader.f);google.loader.Z=function(a){w=a};t("google.loader.rfm",google.loader.Z);google.loader.aa=function(a){for(var b in a)"string"==typeof b&&b&&":"==b.charAt(0)&&!v[b]&&(v[b]=new E(b.substring(1),a[b]))};t("google.loader.rpl",google.loader.aa);google.loader.$=function(a){if((a=a.specs)&&a.length)for(var b=0;b<a.length;++b){var c=a[b];"string"==typeof c?v[":"+c]=new F(c):(c=new G(c.name,c.baseSpec,c.customSpecs),v[":"+c.name]=c)}};t("google.loader.rm",google.loader.$);
google.loader.loaded=function(a){v[":"+a.module].o(a)};t("google.loader.loaded",google.loader.loaded);google.loader.V=function(){return"qid="+((new Date).getTime().toString(16)+Math.floor(1E7*Math.random()).toString(16))};t("google.loader.createGuidArg_",google.loader.V);q("google_exportSymbol",q);q("google_exportProperty",r);google.loader.a={};t("google.loader.themes",google.loader.a);google.loader.a.K="//www.google.com/cse/static/style/look/bubblegum.css";u(google.loader.a,"BUBBLEGUM",google.loader.a.K);
google.loader.a.M="//www.google.com/cse/static/style/look/greensky.css";u(google.loader.a,"GREENSKY",google.loader.a.M);google.loader.a.L="//www.google.com/cse/static/style/look/espresso.css";u(google.loader.a,"ESPRESSO",google.loader.a.L);google.loader.a.O="//www.google.com/cse/static/style/look/shiny.css";u(google.loader.a,"SHINY",google.loader.a.O);google.loader.a.N="//www.google.com/cse/static/style/look/minimalist.css";u(google.loader.a,"MINIMALIST",google.loader.a.N);google.loader.a.P="//www.google.com/cse/static/style/look/v2/default.css";
u(google.loader.a,"V2_DEFAULT",google.loader.a.P);function F(a){this.b=a;this.B=[];this.A={};this.l={};this.g={};this.s=!0;this.c=-1}
F.prototype.i=function(a,b){var c="";void 0!=b&&(void 0!=b.language&&(c+="&hl="+encodeURIComponent(b.language)),void 0!=b.nocss&&(c+="&output="+encodeURIComponent("nocss="+b.nocss)),void 0!=b.nooldnames&&(c+="&nooldnames="+encodeURIComponent(b.nooldnames)),void 0!=b.packages&&(c+="&packages="+encodeURIComponent(b.packages)),null!=b.callback&&(c+="&async=2"),void 0!=b.style&&(c+="&style="+encodeURIComponent(b.style)),void 0!=b.noexp&&(c+="&noexp=true"),void 0!=b.other_params&&(c+="&"+b.other_params));
if(!this.s){google[this.b]&&google[this.b].JSHash&&(c+="&sig="+encodeURIComponent(google[this.b].JSHash));b=[];for(var d in this.A)":"==d.charAt(0)&&b.push(d.substring(1));for(d in this.l)":"==d.charAt(0)&&this.l[d]&&b.push(d.substring(1));c+="&have="+encodeURIComponent(b.join(","))}return google.loader.ServiceBase+"/?file="+this.b+"&v="+a+google.loader.AdditionalParams+c};
F.prototype.H=function(a){var b=null;a&&(b=a.packages);var c=null;if(b)if("string"==typeof b)c=[a.packages];else if(b.length)for(c=[],a=0;a<b.length;a++)"string"==typeof b[a]&&c.push(b[a].replace(/^\s*|\s*$/,"").toLowerCase());c||(c=["default"]);b=[];for(a=0;a<c.length;a++)this.A[":"+c[a]]||b.push(c[a]);return b};
F.prototype.load=function(a,b){var c=this.H(b),d=b&&null!=b.callback;if(d)var e=new H(b.callback);for(var f=[],h=c.length-1;0<=h;h--){var k=c[h];d&&e.R(k);this.l[":"+k]?(c.splice(h,1),d&&this.g[":"+k].push(e)):f.push(k)}if(c.length){b&&b.packages&&(b.packages=c.sort().join(","));for(h=0;h<f.length;h++)k=f[h],this.g[":"+k]=[],d&&this.g[":"+k].push(e);if(b||null==w[":"+this.b]||null==w[":"+this.b].versions[":"+a]||google.loader.AdditionalParams||!this.s)b&&b.autoloaded||google.loader.f("script",this.i(a,
b),d);else{a=w[":"+this.b];google[this.b]=google[this.b]||{};for(var A in a.properties)A&&":"==A.charAt(0)&&(google[this.b][A.substring(1)]=a.properties[A]);google.loader.f("script",google.loader.ServiceBase+a.path+a.js,d);a.css&&google.loader.f("css",google.loader.ServiceBase+a.path+a.css,d)}this.s&&(this.s=!1,this.c=(new Date).getTime(),1!=this.c%100&&(this.c=-1));for(h=0;h<f.length;h++)k=f[h],this.l[":"+k]=!0}};
F.prototype.o=function(a){-1!=this.c&&(I("al_"+this.b,"jl."+((new Date).getTime()-this.c),!0),this.c=-1);this.B=this.B.concat(a.components);google.loader[this.b]||(google.loader[this.b]={});google.loader[this.b].packages=this.B.slice(0);for(var b=0;b<a.components.length;b++){this.A[":"+a.components[b]]=!0;this.l[":"+a.components[b]]=!1;var c=this.g[":"+a.components[b]];if(c){for(var d=0;d<c.length;d++)c[d].U(a.components[b]);delete this.g[":"+a.components[b]]}}};
F.prototype.u=function(a,b){return 0==this.H(b).length};F.prototype.D=function(){return!0};function H(a){this.T=a;this.v={};this.C=0}H.prototype.R=function(a){this.C++;this.v[":"+a]=!0};H.prototype.U=function(a){this.v[":"+a]&&(this.v[":"+a]=!1,this.C--,0==this.C&&window.setTimeout(this.T,0))};function G(a,b,c){this.name=a;this.S=b;this.w=c;this.G=this.j=!1;this.m=[];google.loader.F[this.name]=n(this.o,this)}m(G,F);G.prototype.load=function(a,b){var c=b&&null!=b.callback;c?(this.m.push(b.callback),b.callback="google.loader.callbacks."+this.name):this.j=!0;b&&b.autoloaded||google.loader.f("script",this.i(a,b),c)};G.prototype.u=function(a,b){return b&&null!=b.callback?this.G:this.j};G.prototype.o=function(){this.G=!0;for(var a=0;a<this.m.length;a++)window.setTimeout(this.m[a],0);this.m=[]};
var J=function(a,b){return a.string?encodeURIComponent(a.string)+"="+encodeURIComponent(b):a.regex?b.replace(/(^.*$)/,a.regex):""};G.prototype.i=function(a,b){return this.X(this.I(a),a,b)};
G.prototype.X=function(a,b,c){var d="";a.key&&(d+="&"+J(a.key,google.loader.ApiKey));a.version&&(d+="&"+J(a.version,b));b=google.loader.Secure&&a.ssl?a.ssl:a.uri;if(null!=c)for(var e in c)a.params[e]?d+="&"+J(a.params[e],c[e]):"other_params"==e?d+="&"+c[e]:"base_domain"==e&&(b="http://"+c[e]+a.uri.substring(a.uri.indexOf("/",7)));google[this.name]={};-1==b.indexOf("?")&&d&&(d="?"+d.substring(1));return b+d};G.prototype.D=function(a){return this.I(a).deferred};
G.prototype.I=function(a){if(this.w)for(var b=0;b<this.w.length;++b){var c=this.w[b];if((new RegExp(c.pattern)).test(a))return c}return this.S};function E(a,b){this.b=a;this.h=b;this.j=!1}m(E,F);E.prototype.load=function(a,b){this.j=!0;google.loader.f("script",this.i(a,b),!1)};E.prototype.u=function(){return this.j};E.prototype.o=function(){};
E.prototype.i=function(a,b){if(!this.h.versions[":"+a]){if(this.h.aliases){var c=this.h.aliases[":"+a];c&&(a=c)}if(!this.h.versions[":"+a])throw p("Module: '"+this.b+"' with version '"+a+"' not found!");}return google.loader.GoogleApisBase+"/libs/"+this.b+"/"+a+"/"+this.h.versions[":"+a][b&&b.uncompressed?"uncompressed":"compressed"]};E.prototype.D=function(){return!1};var K=!1,L=[],M=(new Date).getTime(),O=function(){K||(y(window,"unload",N),K=!0)},Q=function(a,b){O();if(!(google.loader.Secure||google.loader.Options&&!1!==google.loader.Options.csi)){for(var c=0;c<a.length;c++)a[c]=encodeURIComponent(a[c].toLowerCase().replace(/[^a-z0-9_.]+/g,"_"));for(c=0;c<b.length;c++)b[c]=encodeURIComponent(b[c].toLowerCase().replace(/[^a-z0-9_.]+/g,"_"));window.setTimeout(n(P,null,"//gg.google.com/csi?s=uds&v=2&action="+a.join(",")+"&it="+b.join(",")),1E4)}},I=function(a,b,
c){c?Q([a],[b]):(O(),L.push("r"+L.length+"="+encodeURIComponent(a+(b?"|"+b:""))),window.setTimeout(N,5<L.length?0:15E3))},N=function(){if(L.length){var a=google.loader.ServiceBase;0==a.indexOf("http:")&&(a=a.replace(/^http:/,"https:"));P(a+"/stats?"+L.join("&")+"&nc="+(new Date).getTime()+"_"+((new Date).getTime()-M));L.length=0}},P=function(a){var b=new Image,c=P.Y++;P.J[c]=b;b.onload=b.onerror=function(){delete P.J[c]};b.src=a;b=null};P.J={};P.Y=0;q("google.loader.recordCsiStat",Q);
q("google.loader.recordStat",I);q("google.loader.createImageForLogging",P);

}) ();google.loader.rm({"specs":["visualization","payments",{"name":"annotations","baseSpec":{"uri":"http://www.google.com/reviews/scripts/annotations_bootstrap.js","ssl":null,"key":{"string":"key"},"version":{"string":"v"},"deferred":true,"params":{"country":{"string":"gl"},"callback":{"string":"callback"},"language":{"string":"hl"}}}},"language","gdata","wave","spreadsheets","search","orkut","feeds","annotations_v2","picker","identitytoolkit",{"name":"maps","baseSpec":{"uri":"http://maps.google.com/maps?file\u003dgoogleapi","ssl":"https://maps-api-ssl.google.com/maps?file\u003dgoogleapi","key":{"string":"key"},"version":{"string":"v"},"deferred":true,"params":{"callback":{"regex":"callback\u003d$1\u0026async\u003d2"},"language":{"string":"hl"}}},"customSpecs":[{"uri":"http://maps.googleapis.com/maps/api/js","ssl":"https://maps.googleapis.com/maps/api/js","version":{"string":"v"},"deferred":true,"params":{"callback":{"string":"callback"},"language":{"string":"hl"}},"pattern":"^(3|3..*)$"}]},{"name":"friendconnect","baseSpec":{"uri":"http://www.google.com/friendconnect/script/friendconnect.js","ssl":"https://www.google.com/friendconnect/script/friendconnect.js","key":{"string":"key"},"version":{"string":"v"},"deferred":false,"params":{}}},{"name":"sharing","baseSpec":{"uri":"http://www.google.com/s2/sharing/js","ssl":null,"key":{"string":"key"},"version":{"string":"v"},"deferred":false,"params":{"language":{"string":"hl"}}}},"ads",{"name":"books","baseSpec":{"uri":"http://books.google.com/books/api.js","ssl":"https://encrypted.google.com/books/api.js","key":{"string":"key"},"version":{"string":"v"},"deferred":true,"params":{"callback":{"string":"callback"},"language":{"string":"hl"}}}},"elements","earth","ima"]});
google.loader.rfm({":search":{"versions":{":1":"1",":1.0":"1"},"path":"/api/search/1.0/581c068e7ad56cae00e4e2e8f7dc3837/","js":"default+ru.I.js","css":"default+ru.css","properties":{":Version":"1.0",":NoOldNames":false,":JSHash":"581c068e7ad56cae00e4e2e8f7dc3837"}},":language":{"versions":{":1":"1",":1.0":"1"},"path":"/api/language/1.0/791c6d5e15c4ae3f2b7f5a6332e5f25b/","js":"default+ru.I.js","properties":{":Version":"1.0",":JSHash":"791c6d5e15c4ae3f2b7f5a6332e5f25b"}},":annotations":{"versions":{":1":"1",":1.0":"1"},"path":"/api/annotations/1.0/3b0f18d6e7bf8cf053640179ef6d98d1/","js":"default+ru.I.js","properties":{":Version":"1.0",":JSHash":"3b0f18d6e7bf8cf053640179ef6d98d1"}},":wave":{"versions":{":1":"1",":1.0":"1"},"path":"/api/wave/1.0/3b6f7573ff78da6602dda5e09c9025bf/","js":"default.I.js","properties":{":Version":"1.0",":JSHash":"3b6f7573ff78da6602dda5e09c9025bf"}},":picker":{"versions":{":1":"1",":1.0":"1"},"path":"/api/picker/1.0/1c635e91b9d0c082c660a42091913907/","js":"default.I.js","css":"default.css","properties":{":Version":"1.0",":JSHash":"1c635e91b9d0c082c660a42091913907"}},":ima":{"versions":{":3":"1",":3.0":"1"},"path":"/api/ima/3.0/28a914332232c9a8ac0ae8da68b1006e/","js":"default.I.js","properties":{":Version":"3.0",":JSHash":"28a914332232c9a8ac0ae8da68b1006e"}}});
google.loader.rpl({":swfobject":{"versions":{":2.1":{"uncompressed":"swfobject_src.js","compressed":"swfobject.js"},":2.2":{"uncompressed":"swfobject_src.js","compressed":"swfobject.js"}},"aliases":{":2":"2.2"}},":chrome-frame":{"versions":{":1.0.0":{"uncompressed":"CFInstall.js","compressed":"CFInstall.min.js"},":1.0.1":{"uncompressed":"CFInstall.js","compressed":"CFInstall.min.js"},":1.0.2":{"uncompressed":"CFInstall.js","compressed":"CFInstall.min.js"}},"aliases":{":1":"1.0.2",":1.0":"1.0.2"}},":ext-core":{"versions":{":3.1.0":{"uncompressed":"ext-core-debug.js","compressed":"ext-core.js"},":3.0.0":{"uncompressed":"ext-core-debug.js","compressed":"ext-core.js"}},"aliases":{":3":"3.1.0",":3.0":"3.0.0",":3.1":"3.1.0"}},":scriptaculous":{"versions":{":1.8.3":{"uncompressed":"scriptaculous.js","compressed":"scriptaculous.js"},":1.9.0":{"uncompressed":"scriptaculous.js","compressed":"scriptaculous.js"},":1.8.1":{"uncompressed":"scriptaculous.js","compressed":"scriptaculous.js"},":1.8.2":{"uncompressed":"scriptaculous.js","compressed":"scriptaculous.js"}},"aliases":{":1":"1.9.0",":1.8":"1.8.3",":1.9":"1.9.0"}},":webfont":{"versions":{":1.0.12":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.13":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.14":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.15":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.10":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.11":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.27":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.28":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.29":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.23":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.24":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.25":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.26":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.21":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.22":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.3":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.4":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.5":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.6":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.9":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.16":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.17":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.0":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.18":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.1":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.19":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.2":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"}},"aliases":{":1":"1.0.29",":1.0":"1.0.29"}},":mootools":{"versions":{":1.3.0":{"uncompressed":"mootools.js","compressed":"mootools-yui-compressed.js"},":1.2.1":{"uncompressed":"mootools.js","compressed":"mootools-yui-compressed.js"},":1.1.2":{"uncompressed":"mootools.js","compressed":"mootools-yui-compressed.js"},":1.4.0":{"uncompressed":"mootools.js","compressed":"mootools-yui-compressed.js"},":1.3.1":{"uncompressed":"mootools.js","compressed":"mootools-yui-compressed.js"},":1.2.2":{"uncompressed":"mootools.js","compressed":"mootools-yui-compressed.js"},":1.4.1":{"uncompressed":"mootools.js","compressed":"mootools-yui-compressed.js"},":1.3.2":{"uncompressed":"mootools.js","compressed":"mootools-yui-compressed.js"},":1.2.3":{"uncompressed":"mootools.js","compressed":"mootools-yui-compressed.js"},":1.4.2":{"uncompressed":"mootools.js","compressed":"mootools-yui-compressed.js"},":1.2.4":{"uncompressed":"mootools.js","compressed":"mootools-yui-compressed.js"},":1.2.5":{"uncompressed":"mootools.js","compressed":"mootools-yui-compressed.js"},":1.1.1":{"uncompressed":"mootools.js","compressed":"mootools-yui-compressed.js"}},"aliases":{":1":"1.1.2",":1.1":"1.1.2",":1.2":"1.2.5",":1.3":"1.3.2",":1.4":"1.4.2",":1.11":"1.1.1"}},":jqueryui":{"versions":{":1.8.17":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.16":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.15":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.14":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.4":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.13":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.5":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.12":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.6":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.11":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.7":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.10":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.8":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.9":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.6.0":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.7.0":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.5.2":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.0":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.7.1":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.5.3":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.1":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.7.2":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.2":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.7.3":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"}},"aliases":{":1":"1.8.17",":1.8.3":"1.8.4",":1.5":"1.5.3",":1.6":"1.6.0",":1.7":"1.7.3",":1.8":"1.8.17"}},":yui":{"versions":{":2.8.0r4":{"uncompressed":"build/yuiloader/yuiloader.js","compressed":"build/yuiloader/yuiloader-min.js"},":2.9.0":{"uncompressed":"build/yuiloader/yuiloader.js","compressed":"build/yuiloader/yuiloader-min.js"},":2.8.1":{"uncompressed":"build/yuiloader/yuiloader.js","compressed":"build/yuiloader/yuiloader-min.js"},":2.6.0":{"uncompressed":"build/yuiloader/yuiloader.js","compressed":"build/yuiloader/yuiloader-min.js"},":2.7.0":{"uncompressed":"build/yuiloader/yuiloader.js","compressed":"build/yuiloader/yuiloader-min.js"},":3.3.0":{"uncompressed":"build/yui/yui.js","compressed":"build/yui/yui-min.js"},":2.8.2r1":{"uncompressed":"build/yuiloader/yuiloader.js","compressed":"build/yuiloader/yuiloader-min.js"}},"aliases":{":2":"2.9.0",":3":"3.3.0",":2.8.2":"2.8.2r1",":2.8.0":"2.8.0r4",":3.3":"3.3.0",":2.6":"2.6.0",":2.7":"2.7.0",":2.8":"2.8.2r1",":2.9":"2.9.0"}},":prototype":{"versions":{":1.6.1.0":{"uncompressed":"prototype.js","compressed":"prototype.js"},":1.6.0.2":{"uncompressed":"prototype.js","compressed":"prototype.js"},":1.7.0.0":{"uncompressed":"prototype.js","compressed":"prototype.js"},":1.6.0.3":{"uncompressed":"prototype.js","compressed":"prototype.js"}},"aliases":{":1":"1.7.0.0",":1.6.0":"1.6.0.3",":1.6.1":"1.6.1.0",":1.7.0":"1.7.0.0",":1.6":"1.6.1.0",":1.7":"1.7.0.0"}},":jquery":{"versions":{":1.3.0":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.4.0":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.3.1":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.5.0":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.4.1":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.3.2":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.2.3":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.6.0":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.5.1":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.4.2":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.7.0":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.6.1":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.5.2":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.4.3":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.7.1":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.6.2":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.4.4":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.2.6":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.6.3":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.6.4":{"uncompressed":"jquery.js","compressed":"jquery.min.js"}},"aliases":{":1":"1.7.1",":1.2":"1.2.6",":1.3":"1.3.2",":1.4":"1.4.4",":1.5":"1.5.2",":1.6":"1.6.4",":1.7":"1.7.1"}},":dojo":{"versions":{":1.3.0":{"uncompressed":"dojo/dojo.xd.js.uncompressed.js","compressed":"dojo/dojo.xd.js"},":1.4.0":{"uncompressed":"dojo/dojo.xd.js.uncompressed.js","compressed":"dojo/dojo.xd.js"},":1.3.1":{"uncompressed":"dojo/dojo.xd.js.uncompressed.js","compressed":"dojo/dojo.xd.js"},":1.5.0":{"uncompressed":"dojo/dojo.xd.js.uncompressed.js","compressed":"dojo/dojo.xd.js"},":1.4.1":{"uncompressed":"dojo/dojo.xd.js.uncompressed.js","compressed":"dojo/dojo.xd.js"},":1.3.2":{"uncompressed":"dojo/dojo.xd.js.uncompressed.js","compressed":"dojo/dojo.xd.js"},":1.2.3":{"uncompressed":"dojo/dojo.xd.js.uncompressed.js","compressed":"dojo/dojo.xd.js"},":1.6.0":{"uncompressed":"dojo/dojo.xd.js.uncompressed.js","compressed":"dojo/dojo.xd.js"},":1.5.1":{"uncompressed":"dojo/dojo.xd.js.uncompressed.js","compressed":"dojo/dojo.xd.js"},":1.7.0":{"uncompressed":"dojo/dojo.js.uncompressed.js","compressed":"dojo/dojo.js"},":1.6.1":{"uncompressed":"dojo/dojo.xd.js.uncompressed.js","compressed":"dojo/dojo.xd.js"},":1.4.3":{"uncompressed":"dojo/dojo.xd.js.uncompressed.js","compressed":"dojo/dojo.xd.js"},":1.7.1":{"uncompressed":"dojo/dojo.js.uncompressed.js","compressed":"dojo/dojo.js"},":1.7.2":{"uncompressed":"dojo/dojo.js.uncompressed.js","compressed":"dojo/dojo.js"},":1.2.0":{"uncompressed":"dojo/dojo.xd.js.uncompressed.js","compressed":"dojo/dojo.xd.js"},":1.1.1":{"uncompressed":"dojo/dojo.xd.js.uncompressed.js","compressed":"dojo/dojo.xd.js"}},"aliases":{":1":"1.6.1",":1.1":"1.1.1",":1.2":"1.2.3",":1.3":"1.3.2",":1.4":"1.4.3",":1.5":"1.5.1",":1.6":"1.6.1",":1.7":"1.7.2"}}});
}
;
/*
 Highcharts JS v5.0.12 (2017-05-24)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/

(function(K,S){"object"===typeof module&&module.exports?module.exports=K.document?S(K):S:K.Highcharts=S(K)})("undefined"!==typeof window?window:this,function(K){K=function(){var a=window,C=a.document,A=a.navigator&&a.navigator.userAgent||"",G=C&&C.createElementNS&&!!C.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,F=/(edge|msie|trident)/i.test(A)&&!window.opera,m=!G,g=/Firefox/.test(A),k=g&&4>parseInt(A.split("Firefox/")[1],10);return a.Highcharts?a.Highcharts.error(16,!0):{product:"Highcharts",
version:"5.0.12",deg2rad:2*Math.PI/360,doc:C,hasBidiBug:k,hasTouch:C&&void 0!==C.documentElement.ontouchstart,isMS:F,isWebKit:/AppleWebKit/.test(A),isFirefox:g,isTouchDevice:/(Mobile|Android|Windows Phone)/.test(A),SVG_NS:"http://www.w3.org/2000/svg",chartCount:0,seriesTypes:{},symbolSizes:{},svg:G,vml:m,win:a,marginNames:["plotTop","marginRight","marginBottom","plotLeft"],noop:function(){},charts:[]}}();(function(a){var C=[],A=a.charts,G=a.doc,F=a.win;a.error=function(m,g){m=a.isNumber(m)?"Highcharts error #"+
m+": www.highcharts.com/errors/"+m:m;if(g)throw Error(m);F.console&&console.log(m)};a.Fx=function(a,g,k){this.options=g;this.elem=a;this.prop=k};a.Fx.prototype={dSetter:function(){var a=this.paths[0],g=this.paths[1],k=[],q=this.now,v=a.length,u;if(1===q)k=this.toD;else if(v===g.length&&1>q)for(;v--;)u=parseFloat(a[v]),k[v]=isNaN(u)?a[v]:q*parseFloat(g[v]-u)+u;else k=g;this.elem.attr("d",k,null,!0)},update:function(){var a=this.elem,g=this.prop,k=this.now,q=this.options.step;if(this[g+"Setter"])this[g+
"Setter"]();else a.attr?a.element&&a.attr(g,k,null,!0):a.style[g]=k+this.unit;q&&q.call(a,k,this)},run:function(a,g,k){var m=this,v=function(a){return v.stopped?!1:m.step(a)},u;this.startTime=+new Date;this.start=a;this.end=g;this.unit=k;this.now=this.start;this.pos=0;v.elem=this.elem;v.prop=this.prop;v()&&1===C.push(v)&&(v.timerId=setInterval(function(){for(u=0;u<C.length;u++)C[u]()||C.splice(u--,1);C.length||clearInterval(v.timerId)},13))},step:function(m){var g=+new Date,k,q=this.options,v=this.elem,
u=q.complete,h=q.duration,e=q.curAnim;v.attr&&!v.element?m=!1:m||g>=h+this.startTime?(this.now=this.end,this.pos=1,this.update(),k=e[this.prop]=!0,a.objectEach(e,function(a){!0!==a&&(k=!1)}),k&&u&&u.call(v),m=!1):(this.pos=q.easing((g-this.startTime)/h),this.now=this.start+(this.end-this.start)*this.pos,this.update(),m=!0);return m},initPath:function(m,g,k){function q(a){var b,l;for(y=a.length;y--;)b="M"===a[y]||"L"===a[y],l=/[a-zA-Z]/.test(a[y+3]),b&&l&&a.splice(y+1,0,a[y+1],a[y+2],a[y+1],a[y+2])}
function v(a,b){for(;a.length<w;){a[0]=b[w-a.length];var l=a.slice(0,c);[].splice.apply(a,[0,0].concat(l));D&&(l=a.slice(a.length-c),[].splice.apply(a,[a.length,0].concat(l)),y--)}a[0]="M"}function u(a,l){for(var r=(w-a.length)/c;0<r&&r--;)b=a.slice().splice(a.length/H-c,c*H),b[0]=l[w-c-r*c],d&&(b[c-6]=b[c-2],b[c-5]=b[c-1]),[].splice.apply(a,[a.length/H,0].concat(b)),D&&r--}g=g||"";var h,e=m.startX,n=m.endX,d=-1<g.indexOf("C"),c=d?7:3,w,b,y;g=g.split(" ");k=k.slice();var D=m.isArea,H=D?2:1,l;d&&(q(g),
q(k));if(e&&n){for(y=0;y<e.length;y++)if(e[y]===n[0]){h=y;break}else if(e[0]===n[n.length-e.length+y]){h=y;l=!0;break}void 0===h&&(g=[])}g.length&&a.isNumber(h)&&(w=k.length+h*H*c,l?(v(g,k),u(k,g)):(v(k,g),u(g,k)));return[g,k]}};a.Fx.prototype.fillSetter=a.Fx.prototype.strokeSetter=function(){this.elem.attr(this.prop,a.color(this.start).tweenTo(a.color(this.end),this.pos),null,!0)};a.extend=function(a,g){var m;a||(a={});for(m in g)a[m]=g[m];return a};a.merge=function(){var m,g=arguments,k,q={},v=
function(g,h){"object"!==typeof g&&(g={});a.objectEach(h,function(e,n){!a.isObject(e,!0)||a.isClass(e)||a.isDOMElement(e)?g[n]=h[n]:g[n]=v(g[n]||{},e)});return g};!0===g[0]&&(q=g[1],g=Array.prototype.slice.call(g,2));k=g.length;for(m=0;m<k;m++)q=v(q,g[m]);return q};a.pInt=function(a,g){return parseInt(a,g||10)};a.isString=function(a){return"string"===typeof a};a.isArray=function(a){a=Object.prototype.toString.call(a);return"[object Array]"===a||"[object Array Iterator]"===a};a.isObject=function(m,
g){return!!m&&"object"===typeof m&&(!g||!a.isArray(m))};a.isDOMElement=function(m){return a.isObject(m)&&"number"===typeof m.nodeType};a.isClass=function(m){var g=m&&m.constructor;return!(!a.isObject(m,!0)||a.isDOMElement(m)||!g||!g.name||"Object"===g.name)};a.isNumber=function(a){return"number"===typeof a&&!isNaN(a)};a.erase=function(a,g){for(var m=a.length;m--;)if(a[m]===g){a.splice(m,1);break}};a.defined=function(a){return void 0!==a&&null!==a};a.attr=function(m,g,k){var q;a.isString(g)?a.defined(k)?
m.setAttribute(g,k):m&&m.getAttribute&&(q=m.getAttribute(g)):a.defined(g)&&a.isObject(g)&&a.objectEach(g,function(a,g){m.setAttribute(g,a)});return q};a.splat=function(m){return a.isArray(m)?m:[m]};a.syncTimeout=function(a,g,k){if(g)return setTimeout(a,g,k);a.call(0,k)};a.pick=function(){var a=arguments,g,k,q=a.length;for(g=0;g<q;g++)if(k=a[g],void 0!==k&&null!==k)return k};a.css=function(m,g){a.isMS&&!a.svg&&g&&void 0!==g.opacity&&(g.filter="alpha(opacity\x3d"+100*g.opacity+")");a.extend(m.style,
g)};a.createElement=function(m,g,k,q,v){m=G.createElement(m);var u=a.css;g&&a.extend(m,g);v&&u(m,{padding:0,border:"none",margin:0});k&&u(m,k);q&&q.appendChild(m);return m};a.extendClass=function(m,g){var k=function(){};k.prototype=new m;a.extend(k.prototype,g);return k};a.pad=function(a,g,k){return Array((g||2)+1-String(a).length).join(k||0)+a};a.relativeLength=function(a,g){return/%$/.test(a)?g*parseFloat(a)/100:parseFloat(a)};a.wrap=function(a,g,k){var q=a[g];a[g]=function(){var a=Array.prototype.slice.call(arguments),
g=arguments,h=this;h.proceed=function(){q.apply(h,arguments.length?arguments:g)};a.unshift(q);a=k.apply(this,a);h.proceed=null;return a}};a.getTZOffset=function(m){var g=a.Date;return 6E4*(g.hcGetTimezoneOffset&&g.hcGetTimezoneOffset(m)||g.hcTimezoneOffset||0)};a.dateFormat=function(m,g,k){if(!a.defined(g)||isNaN(g))return a.defaultOptions.lang.invalidDate||"";m=a.pick(m,"%Y-%m-%d %H:%M:%S");var q=a.Date,v=new q(g-a.getTZOffset(g)),u=v[q.hcGetHours](),h=v[q.hcGetDay](),e=v[q.hcGetDate](),n=v[q.hcGetMonth](),
d=v[q.hcGetFullYear](),c=a.defaultOptions.lang,w=c.weekdays,b=c.shortWeekdays,y=a.pad,q=a.extend({a:b?b[h]:w[h].substr(0,3),A:w[h],d:y(e),e:y(e,2," "),w:h,b:c.shortMonths[n],B:c.months[n],m:y(n+1),y:d.toString().substr(2,2),Y:d,H:y(u),k:u,I:y(u%12||12),l:u%12||12,M:y(v[q.hcGetMinutes]()),p:12>u?"AM":"PM",P:12>u?"am":"pm",S:y(v.getSeconds()),L:y(Math.round(g%1E3),3)},a.dateFormats);a.objectEach(q,function(a,b){for(;-1!==m.indexOf("%"+b);)m=m.replace("%"+b,"function"===typeof a?a(g):a)});return k?m.substr(0,
1).toUpperCase()+m.substr(1):m};a.formatSingle=function(m,g){var k=/\.([0-9])/,q=a.defaultOptions.lang;/f$/.test(m)?(k=(k=m.match(k))?k[1]:-1,null!==g&&(g=a.numberFormat(g,k,q.decimalPoint,-1<m.indexOf(",")?q.thousandsSep:""))):g=a.dateFormat(m,g);return g};a.format=function(m,g){for(var k="{",q=!1,v,u,h,e,n=[],d;m;){k=m.indexOf(k);if(-1===k)break;v=m.slice(0,k);if(q){v=v.split(":");u=v.shift().split(".");e=u.length;d=g;for(h=0;h<e;h++)d=d[u[h]];v.length&&(d=a.formatSingle(v.join(":"),d));n.push(d)}else n.push(v);
m=m.slice(k+1);k=(q=!q)?"}":"{"}n.push(m);return n.join("")};a.getMagnitude=function(a){return Math.pow(10,Math.floor(Math.log(a)/Math.LN10))};a.normalizeTickInterval=function(m,g,k,q,v){var u,h=m;k=a.pick(k,1);u=m/k;g||(g=v?[1,1.2,1.5,2,2.5,3,4,5,6,8,10]:[1,2,2.5,5,10],!1===q&&(1===k?g=a.grep(g,function(a){return 0===a%1}):.1>=k&&(g=[1/k])));for(q=0;q<g.length&&!(h=g[q],v&&h*k>=m||!v&&u<=(g[q]+(g[q+1]||g[q]))/2);q++);return h=a.correctFloat(h*k,-Math.round(Math.log(.001)/Math.LN10))};a.stableSort=
function(a,g){var k=a.length,q,m;for(m=0;m<k;m++)a[m].safeI=m;a.sort(function(a,h){q=g(a,h);return 0===q?a.safeI-h.safeI:q});for(m=0;m<k;m++)delete a[m].safeI};a.arrayMin=function(a){for(var g=a.length,k=a[0];g--;)a[g]<k&&(k=a[g]);return k};a.arrayMax=function(a){for(var g=a.length,k=a[0];g--;)a[g]>k&&(k=a[g]);return k};a.destroyObjectProperties=function(m,g){a.objectEach(m,function(a,q){a&&a!==g&&a.destroy&&a.destroy();delete m[q]})};a.discardElement=function(m){var g=a.garbageBin;g||(g=a.createElement("div"));
m&&g.appendChild(m);g.innerHTML=""};a.correctFloat=function(a,g){return parseFloat(a.toPrecision(g||14))};a.setAnimation=function(m,g){g.renderer.globalAnimation=a.pick(m,g.options.chart.animation,!0)};a.animObject=function(m){return a.isObject(m)?a.merge(m):{duration:m?500:0}};a.timeUnits={millisecond:1,second:1E3,minute:6E4,hour:36E5,day:864E5,week:6048E5,month:24192E5,year:314496E5};a.numberFormat=function(m,g,k,q){m=+m||0;g=+g;var v=a.defaultOptions.lang,u=(m.toString().split(".")[1]||"").length,
h,e;-1===g?g=Math.min(u,20):a.isNumber(g)||(g=2);e=(Math.abs(m)+Math.pow(10,-Math.max(g,u)-1)).toFixed(g);u=String(a.pInt(e));h=3<u.length?u.length%3:0;k=a.pick(k,v.decimalPoint);q=a.pick(q,v.thousandsSep);m=(0>m?"-":"")+(h?u.substr(0,h)+q:"");m+=u.substr(h).replace(/(\d{3})(?=\d)/g,"$1"+q);g&&(m+=k+e.slice(-g));return m};Math.easeInOutSine=function(a){return-.5*(Math.cos(Math.PI*a)-1)};a.getStyle=function(m,g,k){if("width"===g)return Math.min(m.offsetWidth,m.scrollWidth)-a.getStyle(m,"padding-left")-
a.getStyle(m,"padding-right");if("height"===g)return Math.min(m.offsetHeight,m.scrollHeight)-a.getStyle(m,"padding-top")-a.getStyle(m,"padding-bottom");if(m=F.getComputedStyle(m,void 0))m=m.getPropertyValue(g),a.pick(k,!0)&&(m=a.pInt(m));return m};a.inArray=function(a,g){return g.indexOf?g.indexOf(a):[].indexOf.call(g,a)};a.grep=function(a,g){return[].filter.call(a,g)};a.find=function(a,g){return[].find.call(a,g)};a.map=function(a,g){for(var k=[],q=0,m=a.length;q<m;q++)k[q]=g.call(a[q],a[q],q,a);
return k};a.offset=function(a){var g=G.documentElement;a=a.getBoundingClientRect();return{top:a.top+(F.pageYOffset||g.scrollTop)-(g.clientTop||0),left:a.left+(F.pageXOffset||g.scrollLeft)-(g.clientLeft||0)}};a.stop=function(a,g){for(var k=C.length;k--;)C[k].elem!==a||g&&g!==C[k].prop||(C[k].stopped=!0)};a.each=function(a,g,k){return Array.prototype.forEach.call(a,g,k)};a.objectEach=function(a,g,k){for(var q in a)a.hasOwnProperty(q)&&g.call(k,a[q],q,a)};a.addEvent=function(m,g,k){function q(a){a.target=
a.srcElement||F;k.call(m,a)}var v=m.hcEvents=m.hcEvents||{};m.addEventListener?m.addEventListener(g,k,!1):m.attachEvent&&(m.hcEventsIE||(m.hcEventsIE={}),m.hcEventsIE[k.toString()]=q,m.attachEvent("on"+g,q));v[g]||(v[g]=[]);v[g].push(k);return function(){a.removeEvent(m,g,k)}};a.removeEvent=function(m,g,k){function q(a,d){m.removeEventListener?m.removeEventListener(a,d,!1):m.attachEvent&&(d=m.hcEventsIE[d.toString()],m.detachEvent("on"+a,d))}function v(){var e,d;m.nodeName&&(g?(e={},e[g]=!0):e=h,
a.objectEach(e,function(a,e){if(h[e])for(d=h[e].length;d--;)q(e,h[e][d])}))}var u,h=m.hcEvents,e;h&&(g?(u=h[g]||[],k?(e=a.inArray(k,u),-1<e&&(u.splice(e,1),h[g]=u),q(g,k)):(v(),h[g]=[])):(v(),m.hcEvents={}))};a.fireEvent=function(m,g,k,q){var v;v=m.hcEvents;var u,h;k=k||{};if(G.createEvent&&(m.dispatchEvent||m.fireEvent))v=G.createEvent("Events"),v.initEvent(g,!0,!0),a.extend(v,k),m.dispatchEvent?m.dispatchEvent(v):m.fireEvent(g,v);else if(v)for(v=v[g]||[],u=v.length,k.target||a.extend(k,{preventDefault:function(){k.defaultPrevented=
!0},target:m,type:g}),g=0;g<u;g++)(h=v[g])&&!1===h.call(m,k)&&k.preventDefault();q&&!k.defaultPrevented&&q(k)};a.animate=function(m,g,k){var q,v="",u,h,e;a.isObject(k)||(e=arguments,k={duration:e[2],easing:e[3],complete:e[4]});a.isNumber(k.duration)||(k.duration=400);k.easing="function"===typeof k.easing?k.easing:Math[k.easing]||Math.easeInOutSine;k.curAnim=a.merge(g);a.objectEach(g,function(e,d){a.stop(m,d);h=new a.Fx(m,k,d);u=null;"d"===d?(h.paths=h.initPath(m,m.d,g.d),h.toD=g.d,q=0,u=1):m.attr?
q=m.attr(d):(q=parseFloat(a.getStyle(m,d))||0,"opacity"!==d&&(v="px"));u||(u=e);u&&u.match&&u.match("px")&&(u=u.replace(/px/g,""));h.run(q,u,v)})};a.seriesType=function(m,g,k,q,v){var u=a.getOptions(),h=a.seriesTypes;if(h[m])return a.error(27);u.plotOptions[m]=a.merge(u.plotOptions[g],k);h[m]=a.extendClass(h[g]||function(){},q);h[m].prototype.type=m;v&&(h[m].prototype.pointClass=a.extendClass(a.Point,v));return h[m]};a.uniqueKey=function(){var a=Math.random().toString(36).substring(2,9),g=0;return function(){return"highcharts-"+
a+"-"+g++}}();F.jQuery&&(F.jQuery.fn.highcharts=function(){var m=[].slice.call(arguments);if(this[0])return m[0]?(new (a[a.isString(m[0])?m.shift():"Chart"])(this[0],m[0],m[1]),this):A[a.attr(this[0],"data-highcharts-chart")]});G&&!G.defaultView&&(a.getStyle=function(m,g){var k={width:"clientWidth",height:"clientHeight"}[g];if(m.style[g])return a.pInt(m.style[g]);"opacity"===g&&(g="filter");if(k)return m.style.zoom=1,Math.max(m[k]-2*a.getStyle(m,"padding"),0);m=m.currentStyle[g.replace(/\-(\w)/g,
function(a,g){return g.toUpperCase()})];"filter"===g&&(m=m.replace(/alpha\(opacity=([0-9]+)\)/,function(a,g){return g/100}));return""===m?1:a.pInt(m)});Array.prototype.forEach||(a.each=function(a,g,k){for(var q=0,m=a.length;q<m;q++)if(!1===g.call(k,a[q],q,a))return q});Array.prototype.indexOf||(a.inArray=function(a,g){var k,q=0;if(g)for(k=g.length;q<k;q++)if(g[q]===a)return q;return-1});Array.prototype.filter||(a.grep=function(a,g){for(var k=[],q=0,m=a.length;q<m;q++)g(a[q],q)&&k.push(a[q]);return k});
Array.prototype.find||(a.find=function(a,g){var k,q=a.length;for(k=0;k<q;k++)if(g(a[k],k))return a[k]})})(K);(function(a){var C=a.each,A=a.isNumber,G=a.map,F=a.merge,m=a.pInt;a.Color=function(g){if(!(this instanceof a.Color))return new a.Color(g);this.init(g)};a.Color.prototype={parsers:[{regex:/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,parse:function(a){return[m(a[1]),m(a[2]),m(a[3]),parseFloat(a[4],10)]}},{regex:/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
parse:function(a){return[m(a[1]),m(a[2]),m(a[3]),1]}}],names:{none:"rgba(255,255,255,0)",white:"#ffffff",black:"#000000"},init:function(g){var k,q,m,u;if((this.input=g=this.names[g&&g.toLowerCase?g.toLowerCase():""]||g)&&g.stops)this.stops=G(g.stops,function(h){return new a.Color(h[1])});else if(g&&"#"===g[0]&&(k=g.length,g=parseInt(g.substr(1),16),7===k?q=[(g&16711680)>>16,(g&65280)>>8,g&255,1]:4===k&&(q=[(g&3840)>>4|(g&3840)>>8,(g&240)>>4|g&240,(g&15)<<4|g&15,1])),!q)for(m=this.parsers.length;m--&&
!q;)u=this.parsers[m],(k=u.regex.exec(g))&&(q=u.parse(k));this.rgba=q||[]},get:function(a){var g=this.input,q=this.rgba,m;this.stops?(m=F(g),m.stops=[].concat(m.stops),C(this.stops,function(g,h){m.stops[h]=[m.stops[h][0],g.get(a)]})):m=q&&A(q[0])?"rgb"===a||!a&&1===q[3]?"rgb("+q[0]+","+q[1]+","+q[2]+")":"a"===a?q[3]:"rgba("+q.join(",")+")":g;return m},brighten:function(a){var g,q=this.rgba;if(this.stops)C(this.stops,function(g){g.brighten(a)});else if(A(a)&&0!==a)for(g=0;3>g;g++)q[g]+=m(255*a),0>
q[g]&&(q[g]=0),255<q[g]&&(q[g]=255);return this},setOpacity:function(a){this.rgba[3]=a;return this},tweenTo:function(a,k){var g,m;a.rgba.length?(g=this.rgba,a=a.rgba,m=1!==a[3]||1!==g[3],a=(m?"rgba(":"rgb(")+Math.round(a[0]+(g[0]-a[0])*(1-k))+","+Math.round(a[1]+(g[1]-a[1])*(1-k))+","+Math.round(a[2]+(g[2]-a[2])*(1-k))+(m?","+(a[3]+(g[3]-a[3])*(1-k)):"")+")"):a=a.input||"none";return a}};a.color=function(g){return new a.Color(g)}})(K);(function(a){var C,A,G=a.addEvent,F=a.animate,m=a.attr,g=a.charts,
k=a.color,q=a.css,v=a.createElement,u=a.defined,h=a.deg2rad,e=a.destroyObjectProperties,n=a.doc,d=a.each,c=a.extend,w=a.erase,b=a.grep,y=a.hasTouch,D=a.inArray,H=a.isArray,l=a.isFirefox,B=a.isMS,r=a.isObject,z=a.isString,M=a.isWebKit,p=a.merge,E=a.noop,I=a.objectEach,L=a.pick,f=a.pInt,t=a.removeEvent,R=a.stop,J=a.svg,N=a.SVG_NS,O=a.symbolSizes,P=a.win;C=a.SVGElement=function(){return this};c(C.prototype,{opacity:1,SVG_NS:N,textProps:"direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline".split(" "),
init:function(a,f){this.element="span"===f?v(f):n.createElementNS(this.SVG_NS,f);this.renderer=a},animate:function(x,f,t){f=a.animObject(L(f,this.renderer.globalAnimation,!0));0!==f.duration?(t&&(f.complete=t),F(this,x,f)):(this.attr(x,null,t),f.step&&f.step.call(this));return this},colorGradient:function(x,f,t){var b=this.renderer,l,c,r,Q,e,h,n,y,E,w,J=[],B;x.radialGradient?c="radialGradient":x.linearGradient&&(c="linearGradient");c&&(r=x[c],e=b.gradients,n=x.stops,w=t.radialReference,H(r)&&(x[c]=
r={x1:r[0],y1:r[1],x2:r[2],y2:r[3],gradientUnits:"userSpaceOnUse"}),"radialGradient"===c&&w&&!u(r.gradientUnits)&&(Q=r,r=p(r,b.getRadialAttr(w,Q),{gradientUnits:"userSpaceOnUse"})),I(r,function(a,x){"id"!==x&&J.push(x,a)}),I(n,function(a){J.push(a)}),J=J.join(","),e[J]?w=e[J].attr("id"):(r.id=w=a.uniqueKey(),e[J]=h=b.createElement(c).attr(r).add(b.defs),h.radAttr=Q,h.stops=[],d(n,function(x){0===x[1].indexOf("rgba")?(l=a.color(x[1]),y=l.get("rgb"),E=l.get("a")):(y=x[1],E=1);x=b.createElement("stop").attr({offset:x[0],
"stop-color":y,"stop-opacity":E}).add(h);h.stops.push(x)})),B="url("+b.url+"#"+w+")",t.setAttribute(f,B),t.gradient=J,x.toString=function(){return B})},applyTextOutline:function(x){var f=this.element,t,b,l,c,r;-1!==x.indexOf("contrast")&&(x=x.replace(/contrast/g,this.renderer.getContrast(f.style.fill)));x=x.split(" ");b=x[x.length-1];if((l=x[0])&&"none"!==l&&a.svg){this.fakeTS=!0;x=[].slice.call(f.getElementsByTagName("tspan"));this.ySetter=this.xSetter;l=l.replace(/(^[\d\.]+)(.*?)$/g,function(a,
x,f){return 2*x+f});for(r=x.length;r--;)t=x[r],"highcharts-text-outline"===t.getAttribute("class")&&w(x,f.removeChild(t));c=f.firstChild;d(x,function(a,x){0===x&&(a.setAttribute("x",f.getAttribute("x")),x=f.getAttribute("y"),a.setAttribute("y",x||0),null===x&&f.setAttribute("y",0));a=a.cloneNode(1);m(a,{"class":"highcharts-text-outline",fill:b,stroke:b,"stroke-width":l,"stroke-linejoin":"round"});f.insertBefore(a,c)})}},attr:function(a,f,t,b){var x,l=this.element,c,r=this,d,p;"string"===typeof a&&
void 0!==f&&(x=a,a={},a[x]=f);"string"===typeof a?r=(this[a+"Getter"]||this._defaultGetter).call(this,a,l):(I(a,function(x,f){d=!1;b||R(this,f);this.symbolName&&/^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)$/.test(f)&&(c||(this.symbolAttr(a),c=!0),d=!0);!this.rotation||"x"!==f&&"y"!==f||(this.doTransform=!0);d||(p=this[f+"Setter"]||this._defaultSetter,p.call(this,x,f,l),this.shadows&&/^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(f)&&this.updateShadows(f,x,p))},this),this.afterSetters());
t&&t();return r},afterSetters:function(){this.doTransform&&(this.updateTransform(),this.doTransform=!1)},updateShadows:function(a,f,t){for(var x=this.shadows,b=x.length;b--;)t.call(x[b],"height"===a?Math.max(f-(x[b].cutHeight||0),0):"d"===a?this.d:f,a,x[b])},addClass:function(a,f){var x=this.attr("class")||"";-1===x.indexOf(a)&&(f||(a=(x+(x?" ":"")+a).replace("  "," ")),this.attr("class",a));return this},hasClass:function(a){return-1!==m(this.element,"class").indexOf(a)},removeClass:function(a){m(this.element,
"class",(m(this.element,"class")||"").replace(a,""));return this},symbolAttr:function(a){var x=this;d("x y r start end width height innerR anchorX anchorY".split(" "),function(f){x[f]=L(a[f],x[f])});x.attr({d:x.renderer.symbols[x.symbolName](x.x,x.y,x.width,x.height,x)})},clip:function(a){return this.attr("clip-path",a?"url("+this.renderer.url+"#"+a.id+")":"none")},crisp:function(a,f){var x=this,t={},b;f=f||a.strokeWidth||0;b=Math.round(f)%2/2;a.x=Math.floor(a.x||x.x||0)+b;a.y=Math.floor(a.y||x.y||
0)+b;a.width=Math.floor((a.width||x.width||0)-2*b);a.height=Math.floor((a.height||x.height||0)-2*b);u(a.strokeWidth)&&(a.strokeWidth=f);I(a,function(a,f){x[f]!==a&&(x[f]=t[f]=a)});return t},css:function(a){var x=this.styles,t={},b=this.element,l,r="",d,p=!x,e=["textOutline","textOverflow","width"];a&&a.color&&(a.fill=a.color);x&&I(a,function(a,f){a!==x[f]&&(t[f]=a,p=!0)});p&&(x&&(a=c(x,t)),l=this.textWidth=a&&a.width&&"auto"!==a.width&&"text"===b.nodeName.toLowerCase()&&f(a.width),this.styles=a,l&&
!J&&this.renderer.forExport&&delete a.width,B&&!J?q(this.element,a):(d=function(a,x){return"-"+x.toLowerCase()},I(a,function(a,x){-1===D(x,e)&&(r+=x.replace(/([A-Z])/g,d)+":"+a+";")}),r&&m(b,"style",r)),this.added&&("text"===this.element.nodeName&&this.renderer.buildText(this),a&&a.textOutline&&this.applyTextOutline(a.textOutline)));return this},strokeWidth:function(){return this["stroke-width"]||0},on:function(a,f){var x=this,t=x.element;y&&"click"===a?(t.ontouchstart=function(a){x.touchEventFired=
Date.now();a.preventDefault();f.call(t,a)},t.onclick=function(a){(-1===P.navigator.userAgent.indexOf("Android")||1100<Date.now()-(x.touchEventFired||0))&&f.call(t,a)}):t["on"+a]=f;return this},setRadialReference:function(a){var x=this.renderer.gradients[this.element.gradient];this.element.radialReference=a;x&&x.radAttr&&x.animate(this.renderer.getRadialAttr(a,x.radAttr));return this},translate:function(a,f){return this.attr({translateX:a,translateY:f})},invert:function(a){this.inverted=a;this.updateTransform();
return this},updateTransform:function(){var a=this.translateX||0,f=this.translateY||0,t=this.scaleX,b=this.scaleY,l=this.inverted,c=this.rotation,r=this.element;l&&(a+=this.width,f+=this.height);a=["translate("+a+","+f+")"];l?a.push("rotate(90) scale(-1,1)"):c&&a.push("rotate("+c+" "+(r.getAttribute("x")||0)+" "+(r.getAttribute("y")||0)+")");(u(t)||u(b))&&a.push("scale("+L(t,1)+" "+L(b,1)+")");a.length&&r.setAttribute("transform",a.join(" "))},toFront:function(){var a=this.element;a.parentNode.appendChild(a);
return this},align:function(a,f,t){var x,b,l,c,r={};b=this.renderer;l=b.alignedObjects;var d,p;if(a){if(this.alignOptions=a,this.alignByTranslate=f,!t||z(t))this.alignTo=x=t||"renderer",w(l,this),l.push(this),t=null}else a=this.alignOptions,f=this.alignByTranslate,x=this.alignTo;t=L(t,b[x],b);x=a.align;b=a.verticalAlign;l=(t.x||0)+(a.x||0);c=(t.y||0)+(a.y||0);"right"===x?d=1:"center"===x&&(d=2);d&&(l+=(t.width-(a.width||0))/d);r[f?"translateX":"x"]=Math.round(l);"bottom"===b?p=1:"middle"===b&&(p=
2);p&&(c+=(t.height-(a.height||0))/p);r[f?"translateY":"y"]=Math.round(c);this[this.placed?"animate":"attr"](r);this.placed=!0;this.alignAttr=r;return this},getBBox:function(a,f){var x,t=this.renderer,b,l=this.element,r=this.styles,p,e=this.textStr,n,Q=t.cache,y=t.cacheKeys,E;f=L(f,this.rotation);b=f*h;p=r&&r.fontSize;void 0!==e&&(E=e.toString(),-1===E.indexOf("\x3c")&&(E=E.replace(/[0-9]/g,"0")),E+=["",f||0,p,r&&r.width,r&&r.textOverflow].join());E&&!a&&(x=Q[E]);if(!x){if(l.namespaceURI===this.SVG_NS||
t.forExport){try{(n=this.fakeTS&&function(a){d(l.querySelectorAll(".highcharts-text-outline"),function(x){x.style.display=a})})&&n("none"),x=l.getBBox?c({},l.getBBox()):{width:l.offsetWidth,height:l.offsetHeight},n&&n("")}catch(X){}if(!x||0>x.width)x={width:0,height:0}}else x=this.htmlGetBBox();t.isSVG&&(a=x.width,t=x.height,r&&"11px"===r.fontSize&&17===Math.round(t)&&(x.height=t=14),f&&(x.width=Math.abs(t*Math.sin(b))+Math.abs(a*Math.cos(b)),x.height=Math.abs(t*Math.cos(b))+Math.abs(a*Math.sin(b))));
if(E&&0<x.height){for(;250<y.length;)delete Q[y.shift()];Q[E]||y.push(E);Q[E]=x}}return x},show:function(a){return this.attr({visibility:a?"inherit":"visible"})},hide:function(){return this.attr({visibility:"hidden"})},fadeOut:function(a){var x=this;x.animate({opacity:0},{duration:a||150,complete:function(){x.attr({y:-9999})}})},add:function(a){var x=this.renderer,f=this.element,t;a&&(this.parentGroup=a);this.parentInverted=a&&a.inverted;void 0!==this.textStr&&x.buildText(this);this.added=!0;if(!a||
a.handleZ||this.zIndex)t=this.zIndexSetter();t||(a?a.element:x.box).appendChild(f);if(this.onAdd)this.onAdd();return this},safeRemoveChild:function(a){var x=a.parentNode;x&&x.removeChild(a)},destroy:function(){var a=this,f=a.element||{},t=a.renderer.isSVG&&"SPAN"===f.nodeName&&a.parentGroup,b=f.ownerSVGElement;f.onclick=f.onmouseout=f.onmouseover=f.onmousemove=f.point=null;R(a);a.clipPath&&b&&(d(b.querySelectorAll("[clip-path]"),function(x){-1<x.getAttribute("clip-path").indexOf(a.clipPath.element.id+
")")&&x.removeAttribute("clip-path")}),a.clipPath=a.clipPath.destroy());if(a.stops){for(b=0;b<a.stops.length;b++)a.stops[b]=a.stops[b].destroy();a.stops=null}a.safeRemoveChild(f);for(a.destroyShadows();t&&t.div&&0===t.div.childNodes.length;)f=t.parentGroup,a.safeRemoveChild(t.div),delete t.div,t=f;a.alignTo&&w(a.renderer.alignedObjects,a);I(a,function(x,f){delete a[f]});return null},shadow:function(a,f,t){var x=[],b,l,c=this.element,r,d,p,e;if(!a)this.destroyShadows();else if(!this.shadows){d=L(a.width,
3);p=(a.opacity||.15)/d;e=this.parentInverted?"(-1,-1)":"("+L(a.offsetX,1)+", "+L(a.offsetY,1)+")";for(b=1;b<=d;b++)l=c.cloneNode(0),r=2*d+1-2*b,m(l,{isShadow:"true",stroke:a.color||"#000000","stroke-opacity":p*b,"stroke-width":r,transform:"translate"+e,fill:"none"}),t&&(m(l,"height",Math.max(m(l,"height")-r,0)),l.cutHeight=r),f?f.element.appendChild(l):c.parentNode.insertBefore(l,c),x.push(l);this.shadows=x}return this},destroyShadows:function(){d(this.shadows||[],function(a){this.safeRemoveChild(a)},
this);this.shadows=void 0},xGetter:function(a){"circle"===this.element.nodeName&&("x"===a?a="cx":"y"===a&&(a="cy"));return this._defaultGetter(a)},_defaultGetter:function(a){a=L(this[a],this.element?this.element.getAttribute(a):null,0);/^[\-0-9\.]+$/.test(a)&&(a=parseFloat(a));return a},dSetter:function(a,f,t){a&&a.join&&(a=a.join(" "));/(NaN| {2}|^$)/.test(a)&&(a="M 0 0");t.setAttribute(f,a);this[f]=a},dashstyleSetter:function(a){var x,t=this["stroke-width"];"inherit"===t&&(t=1);if(a=a&&a.toLowerCase()){a=
a.replace("shortdashdotdot","3,1,1,1,1,1,").replace("shortdashdot","3,1,1,1").replace("shortdot","1,1,").replace("shortdash","3,1,").replace("longdash","8,3,").replace(/dot/g,"1,3,").replace("dash","4,3,").replace(/,$/,"").split(",");for(x=a.length;x--;)a[x]=f(a[x])*t;a=a.join(",").replace(/NaN/g,"none");this.element.setAttribute("stroke-dasharray",a)}},alignSetter:function(a){this.element.setAttribute("text-anchor",{left:"start",center:"middle",right:"end"}[a])},opacitySetter:function(a,f,t){this[f]=
a;t.setAttribute(f,a)},titleSetter:function(a){var f=this.element.getElementsByTagName("title")[0];f||(f=n.createElementNS(this.SVG_NS,"title"),this.element.appendChild(f));f.firstChild&&f.removeChild(f.firstChild);f.appendChild(n.createTextNode(String(L(a),"").replace(/<[^>]*>/g,"")))},textSetter:function(a){a!==this.textStr&&(delete this.bBox,this.textStr=a,this.added&&this.renderer.buildText(this))},fillSetter:function(a,f,t){"string"===typeof a?t.setAttribute(f,a):a&&this.colorGradient(a,f,t)},
visibilitySetter:function(a,f,t){"inherit"===a?t.removeAttribute(f):t.setAttribute(f,a)},zIndexSetter:function(a,t){var x=this.renderer,b=this.parentGroup,l=(b||x).element||x.box,c,r=this.element,d;c=this.added;var p;u(a)&&(r.zIndex=a,a=+a,this[t]===a&&(c=!1),this[t]=a);if(c){(a=this.zIndex)&&b&&(b.handleZ=!0);t=l.childNodes;for(p=0;p<t.length&&!d;p++)b=t[p],c=b.zIndex,b!==r&&(f(c)>a||!u(a)&&u(c)||0>a&&!u(c)&&l!==x.box)&&(l.insertBefore(r,b),d=!0);d||l.appendChild(r)}return d},_defaultSetter:function(a,
f,t){t.setAttribute(f,a)}});C.prototype.yGetter=C.prototype.xGetter;C.prototype.translateXSetter=C.prototype.translateYSetter=C.prototype.rotationSetter=C.prototype.verticalAlignSetter=C.prototype.scaleXSetter=C.prototype.scaleYSetter=function(a,f){this[f]=a;this.doTransform=!0};C.prototype["stroke-widthSetter"]=C.prototype.strokeSetter=function(a,f,t){this[f]=a;this.stroke&&this["stroke-width"]?(C.prototype.fillSetter.call(this,this.stroke,"stroke",t),t.setAttribute("stroke-width",this["stroke-width"]),
this.hasStroke=!0):"stroke-width"===f&&0===a&&this.hasStroke&&(t.removeAttribute("stroke"),this.hasStroke=!1)};A=a.SVGRenderer=function(){this.init.apply(this,arguments)};c(A.prototype,{Element:C,SVG_NS:N,init:function(a,f,t,b,c,r){var x;b=this.createElement("svg").attr({version:"1.1","class":"highcharts-root"}).css(this.getStyle(b));x=b.element;a.appendChild(x);-1===a.innerHTML.indexOf("xmlns")&&m(x,"xmlns",this.SVG_NS);this.isSVG=!0;this.box=x;this.boxWrapper=b;this.alignedObjects=[];this.url=(l||
M)&&n.getElementsByTagName("base").length?P.location.href.replace(/#.*?$/,"").replace(/<[^>]*>/g,"").replace(/([\('\)])/g,"\\$1").replace(/ /g,"%20"):"";this.createElement("desc").add().element.appendChild(n.createTextNode("Created with Highcharts 5.0.12"));this.defs=this.createElement("defs").add();this.allowHTML=r;this.forExport=c;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(f,t,!1);var d;l&&a.getBoundingClientRect&&(f=function(){q(a,{left:0,top:0});d=a.getBoundingClientRect();
q(a,{left:Math.ceil(d.left)-d.left+"px",top:Math.ceil(d.top)-d.top+"px"})},f(),this.unSubPixelFix=G(P,"resize",f))},getStyle:function(a){return this.style=c({fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',fontSize:"12px"},a)},setStyle:function(a){this.boxWrapper.css(this.getStyle(a))},isHidden:function(){return!this.boxWrapper.getBBox().width},destroy:function(){var a=this.defs;this.box=null;this.boxWrapper=this.boxWrapper.destroy();e(this.gradients||{});this.gradients=
null;a&&(this.defs=a.destroy());this.unSubPixelFix&&this.unSubPixelFix();return this.alignedObjects=null},createElement:function(a){var f=new this.Element;f.init(this,a);return f},draw:E,getRadialAttr:function(a,f){return{cx:a[0]-a[2]/2+f.cx*a[2],cy:a[1]-a[2]/2+f.cy*a[2],r:f.r*a[2]}},getSpanWidth:function(a,f){var t=a.getBBox(!0).width;!J&&this.forExport&&(t=this.measureSpanWidth(f.firstChild.data,a.styles));return t},applyEllipsis:function(a,f,t,b){var x=this.getSpanWidth(a,f),l=x>b,x=t,c,r=0,d=
t.length,p=function(a){f.removeChild(f.firstChild);a&&f.appendChild(n.createTextNode(a))};if(l){for(;r<=d;)c=Math.ceil((r+d)/2),x=t.substring(0,c)+"\u2026",p(x),x=this.getSpanWidth(a,f),r===d?r=d+1:x>b?d=c-1:r=c;0===d&&p("")}return l},buildText:function(a){var t=a.element,x=this,l=x.forExport,c=L(a.textStr,"").toString(),r=-1!==c.indexOf("\x3c"),p=t.childNodes,e,h,E,y,w=m(t,"x"),B=a.styles,g=a.textWidth,I=B&&B.lineHeight,z=B&&B.textOutline,D=B&&"ellipsis"===B.textOverflow,k=B&&"nowrap"===B.whiteSpace,
u=B&&B.fontSize,R,H,v=p.length,B=g&&!a.added&&this.box,M=function(a){var b;b=/(px|em)$/.test(a&&a.style.fontSize)?a.style.fontSize:u||x.style.fontSize||12;return I?f(I):x.fontMetrics(b,a.getAttribute("style")?a:t).h};R=[c,D,k,I,z,u,g].join();if(R!==a.textCache){for(a.textCache=R;v--;)t.removeChild(p[v]);r||z||D||g||-1!==c.indexOf(" ")?(e=/<.*class="([^"]+)".*>/,h=/<.*style="([^"]+)".*>/,E=/<.*href="([^"]+)".*>/,B&&B.appendChild(t),c=r?c.replace(/<(b|strong)>/g,'\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g,
'\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g,"\x3cspan").replace(/<\/(b|strong|i|em|a)>/g,"\x3c/span\x3e").split(/<br.*?>/g):[c],c=b(c,function(a){return""!==a}),d(c,function(f,b){var c,r=0;f=f.replace(/^\s+|\s+$/g,"").replace(/<span/g,"|||\x3cspan").replace(/<\/span>/g,"\x3c/span\x3e|||");c=f.split("|||");d(c,function(f){if(""!==f||1===c.length){var d={},p=n.createElementNS(x.SVG_NS,"tspan"),B,I;e.test(f)&&(B=f.match(e)[1],m(p,"class",B));h.test(f)&&(I=f.match(h)[1].replace(/(;| |^)color([ :])/,
"$1fill$2"),m(p,"style",I));E.test(f)&&!l&&(m(p,"onclick",'location.href\x3d"'+f.match(E)[1]+'"'),q(p,{cursor:"pointer"}));f=(f.replace(/<(.|\n)*?>/g,"")||" ").replace(/&lt;/g,"\x3c").replace(/&gt;/g,"\x3e");if(" "!==f){p.appendChild(n.createTextNode(f));r?d.dx=0:b&&null!==w&&(d.x=w);m(p,d);t.appendChild(p);!r&&H&&(!J&&l&&q(p,{display:"block"}),m(p,"dy",M(p)));if(g){d=f.replace(/([^\^])-/g,"$1- ").split(" ");B=1<c.length||b||1<d.length&&!k;var z=[],Q,u=M(p),R=a.rotation;for(D&&(y=x.applyEllipsis(a,
p,f,g));!D&&B&&(d.length||z.length);)a.rotation=0,Q=x.getSpanWidth(a,p),f=Q>g,void 0===y&&(y=f),f&&1!==d.length?(p.removeChild(p.firstChild),z.unshift(d.pop())):(d=z,z=[],d.length&&!k&&(p=n.createElementNS(N,"tspan"),m(p,{dy:u,x:w}),I&&m(p,"style",I),t.appendChild(p)),Q>g&&(g=Q)),d.length&&p.appendChild(n.createTextNode(d.join(" ").replace(/- /g,"-")));a.rotation=R}r++}}});H=H||t.childNodes.length}),y&&a.attr("title",a.textStr),B&&B.removeChild(t),z&&a.applyTextOutline&&a.applyTextOutline(z)):t.appendChild(n.createTextNode(c.replace(/&lt;/g,
"\x3c").replace(/&gt;/g,"\x3e")))}},getContrast:function(a){a=k(a).rgba;return 510<a[0]+a[1]+a[2]?"#000000":"#FFFFFF"},button:function(a,f,t,b,l,r,d,e,h){var x=this.label(a,f,t,h,null,null,null,null,"button"),n=0;x.attr(p({padding:8,r:2},l));var E,y,w,J;l=p({fill:"#f7f7f7",stroke:"#cccccc","stroke-width":1,style:{color:"#333333",cursor:"pointer",fontWeight:"normal"}},l);E=l.style;delete l.style;r=p(l,{fill:"#e6e6e6"},r);y=r.style;delete r.style;d=p(l,{fill:"#e6ebf5",style:{color:"#000000",fontWeight:"bold"}},
d);w=d.style;delete d.style;e=p(l,{style:{color:"#cccccc"}},e);J=e.style;delete e.style;G(x.element,B?"mouseover":"mouseenter",function(){3!==n&&x.setState(1)});G(x.element,B?"mouseout":"mouseleave",function(){3!==n&&x.setState(n)});x.setState=function(a){1!==a&&(x.state=n=a);x.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-"+["normal","hover","pressed","disabled"][a||0]);x.attr([l,r,d,e][a||0]).css([E,y,w,J][a||0])};x.attr(l).css(c({cursor:"default"},
E));return x.on("click",function(a){3!==n&&b.call(x,a)})},crispLine:function(a,f){a[1]===a[4]&&(a[1]=a[4]=Math.round(a[1])-f%2/2);a[2]===a[5]&&(a[2]=a[5]=Math.round(a[2])+f%2/2);return a},path:function(a){var f={fill:"none"};H(a)?f.d=a:r(a)&&c(f,a);return this.createElement("path").attr(f)},circle:function(a,f,t){a=r(a)?a:{x:a,y:f,r:t};f=this.createElement("circle");f.xSetter=f.ySetter=function(a,f,t){t.setAttribute("c"+f,a)};return f.attr(a)},arc:function(a,f,t,b,l,c){r(a)?(b=a,f=b.y,t=b.r,a=b.x):
b={innerR:b,start:l,end:c};a=this.symbol("arc",a,f,t,t,b);a.r=t;return a},rect:function(a,f,t,b,l,c){l=r(a)?a.r:l;var x=this.createElement("rect");a=r(a)?a:void 0===a?{}:{x:a,y:f,width:Math.max(t,0),height:Math.max(b,0)};void 0!==c&&(a.strokeWidth=c,a=x.crisp(a));a.fill="none";l&&(a.r=l);x.rSetter=function(a,f,t){m(t,{rx:a,ry:a})};return x.attr(a)},setSize:function(a,f,t){var b=this.alignedObjects,l=b.length;this.width=a;this.height=f;for(this.boxWrapper.animate({width:a,height:f},{step:function(){this.attr({viewBox:"0 0 "+
this.attr("width")+" "+this.attr("height")})},duration:L(t,!0)?void 0:0});l--;)b[l].align()},g:function(a){var f=this.createElement("g");return a?f.attr({"class":"highcharts-"+a}):f},image:function(a,f,t,b,l){var x={preserveAspectRatio:"none"};1<arguments.length&&c(x,{x:f,y:t,width:b,height:l});x=this.createElement("image").attr(x);x.element.setAttributeNS?x.element.setAttributeNS("http://www.w3.org/1999/xlink","href",a):x.element.setAttribute("hc-svg-href",a);return x},symbol:function(a,f,t,b,l,
r){var x=this,p,e=/^url\((.*?)\)$/,h=e.test(a),E=!h&&(this.symbols[a]?a:"circle"),y=E&&this.symbols[E],B=u(f)&&y&&y.call(this.symbols,Math.round(f),Math.round(t),b,l,r),w,J;y?(p=this.path(B),p.attr("fill","none"),c(p,{symbolName:E,x:f,y:t,width:b,height:l}),r&&c(p,r)):h&&(w=a.match(e)[1],p=this.image(w),p.imgwidth=L(O[w]&&O[w].width,r&&r.width),p.imgheight=L(O[w]&&O[w].height,r&&r.height),J=function(){p.attr({width:p.width,height:p.height})},d(["width","height"],function(a){p[a+"Setter"]=function(a,
f){var t={},b=this["img"+f],l="width"===f?"translateX":"translateY";this[f]=a;u(b)&&(this.element&&this.element.setAttribute(f,b),this.alignByTranslate||(t[l]=((this[f]||0)-b)/2,this.attr(t)))}}),u(f)&&p.attr({x:f,y:t}),p.isImg=!0,u(p.imgwidth)&&u(p.imgheight)?J():(p.attr({width:0,height:0}),v("img",{onload:function(){var a=g[x.chartIndex];0===this.width&&(q(this,{position:"absolute",top:"-999em"}),n.body.appendChild(this));O[w]={width:this.width,height:this.height};p.imgwidth=this.width;p.imgheight=
this.height;p.element&&J();this.parentNode&&this.parentNode.removeChild(this);x.imgCount--;if(!x.imgCount&&a&&a.onload)a.onload()},src:w}),this.imgCount++));return p},symbols:{circle:function(a,f,t,b){return this.arc(a+t/2,f+b/2,t/2,b/2,{start:0,end:2*Math.PI,open:!1})},square:function(a,f,t,b){return["M",a,f,"L",a+t,f,a+t,f+b,a,f+b,"Z"]},triangle:function(a,f,t,b){return["M",a+t/2,f,"L",a+t,f+b,a,f+b,"Z"]},"triangle-down":function(a,f,t,b){return["M",a,f,"L",a+t,f,a+t/2,f+b,"Z"]},diamond:function(a,
f,t,b){return["M",a+t/2,f,"L",a+t,f+b/2,a+t/2,f+b,a,f+b/2,"Z"]},arc:function(a,f,t,b,l){var c=l.start,x=l.r||t,r=l.r||b||t,p=l.end-.001;t=l.innerR;b=l.open;var d=Math.cos(c),e=Math.sin(c),h=Math.cos(p),p=Math.sin(p);l=l.end-c<Math.PI?0:1;x=["M",a+x*d,f+r*e,"A",x,r,0,l,1,a+x*h,f+r*p];u(t)&&x.push(b?"M":"L",a+t*h,f+t*p,"A",t,t,0,l,0,a+t*d,f+t*e);x.push(b?"":"Z");return x},callout:function(a,f,t,b,l){var c=Math.min(l&&l.r||0,t,b),r=c+6,p=l&&l.anchorX;l=l&&l.anchorY;var d;d=["M",a+c,f,"L",a+t-c,f,"C",
a+t,f,a+t,f,a+t,f+c,"L",a+t,f+b-c,"C",a+t,f+b,a+t,f+b,a+t-c,f+b,"L",a+c,f+b,"C",a,f+b,a,f+b,a,f+b-c,"L",a,f+c,"C",a,f,a,f,a+c,f];p&&p>t?l>f+r&&l<f+b-r?d.splice(13,3,"L",a+t,l-6,a+t+6,l,a+t,l+6,a+t,f+b-c):d.splice(13,3,"L",a+t,b/2,p,l,a+t,b/2,a+t,f+b-c):p&&0>p?l>f+r&&l<f+b-r?d.splice(33,3,"L",a,l+6,a-6,l,a,l-6,a,f+c):d.splice(33,3,"L",a,b/2,p,l,a,b/2,a,f+c):l&&l>b&&p>a+r&&p<a+t-r?d.splice(23,3,"L",p+6,f+b,p,f+b+6,p-6,f+b,a+c,f+b):l&&0>l&&p>a+r&&p<a+t-r&&d.splice(3,3,"L",p-6,f,p,f-6,p+6,f,t-c,f);return d}},
clipRect:function(f,t,b,l){var c=a.uniqueKey(),r=this.createElement("clipPath").attr({id:c}).add(this.defs);f=this.rect(f,t,b,l,0).add(r);f.id=c;f.clipPath=r;f.count=0;return f},text:function(a,f,t,b){var l=!J&&this.forExport,c={};if(b&&(this.allowHTML||!this.forExport))return this.html(a,f,t);c.x=Math.round(f||0);t&&(c.y=Math.round(t));if(a||0===a)c.text=a;a=this.createElement("text").attr(c);l&&a.css({position:"absolute"});b||(a.xSetter=function(a,f,t){var b=t.getElementsByTagName("tspan"),l,c=
t.getAttribute(f),r;for(r=0;r<b.length;r++)l=b[r],l.getAttribute(f)===c&&l.setAttribute(f,a);t.setAttribute(f,a)});return a},fontMetrics:function(a,t){a=a||t&&t.style&&t.style.fontSize||this.style&&this.style.fontSize;a=/px/.test(a)?f(a):/em/.test(a)?parseFloat(a)*(t?this.fontMetrics(null,t.parentNode).f:16):12;t=24>a?a+3:Math.round(1.2*a);return{h:t,b:Math.round(.8*t),f:a}},rotCorr:function(a,f,t){var b=a;f&&t&&(b=Math.max(b*Math.cos(f*h),4));return{x:-a/3*Math.sin(f*h),y:b}},label:function(f,b,
l,r,e,h,n,E,y){var x=this,B=x.g("button"!==y&&"label"),w=B.text=x.text("",0,0,n).attr({zIndex:1}),J,g,I=0,z=3,D=0,q,k,m,R,H,v={},N,M,L=/^url\((.*?)\)$/.test(r),Q=L,V,U,O,P;y&&B.addClass("highcharts-"+y);Q=L;V=function(){return(N||0)%2/2};U=function(){var a=w.element.style,f={};g=(void 0===q||void 0===k||H)&&u(w.textStr)&&w.getBBox();B.width=(q||g.width||0)+2*z+D;B.height=(k||g.height||0)+2*z;M=z+x.fontMetrics(a&&a.fontSize,w).b;Q&&(J||(B.box=J=x.symbols[r]||L?x.symbol(r):x.rect(),J.addClass(("button"===
y?"":"highcharts-label-box")+(y?" highcharts-"+y+"-box":"")),J.add(B),a=V(),f.x=a,f.y=(E?-M:0)+a),f.width=Math.round(B.width),f.height=Math.round(B.height),J.attr(c(f,v)),v={})};O=function(){var a=D+z,f;f=E?0:M;u(q)&&g&&("center"===H||"right"===H)&&(a+={center:.5,right:1}[H]*(q-g.width));if(a!==w.x||f!==w.y)w.attr("x",a),void 0!==f&&w.attr("y",f);w.x=a;w.y=f};P=function(a,f){J?J.attr(a,f):v[a]=f};B.onAdd=function(){w.add(B);B.attr({text:f||0===f?f:"",x:b,y:l});J&&u(e)&&B.attr({anchorX:e,anchorY:h})};
B.widthSetter=function(f){q=a.isNumber(f)?f:null};B.heightSetter=function(a){k=a};B["text-alignSetter"]=function(a){H=a};B.paddingSetter=function(a){u(a)&&a!==z&&(z=B.padding=a,O())};B.paddingLeftSetter=function(a){u(a)&&a!==D&&(D=a,O())};B.alignSetter=function(a){a={left:0,center:.5,right:1}[a];a!==I&&(I=a,g&&B.attr({x:m}))};B.textSetter=function(a){void 0!==a&&w.textSetter(a);U();O()};B["stroke-widthSetter"]=function(a,f){a&&(Q=!0);N=this["stroke-width"]=a;P(f,a)};B.strokeSetter=B.fillSetter=B.rSetter=
function(a,f){"fill"===f&&a&&(Q=!0);P(f,a)};B.anchorXSetter=function(a,f){e=B.anchorX=a;P(f,Math.round(a)-V()-m)};B.anchorYSetter=function(a,f){h=B.anchorY=a;P(f,a-R)};B.xSetter=function(a){B.x=a;I&&(a-=I*((q||g.width)+2*z));m=Math.round(a);B.attr("translateX",m)};B.ySetter=function(a){R=B.y=Math.round(a);B.attr("translateY",R)};var W=B.css;return c(B,{css:function(a){if(a){var f={};a=p(a);d(B.textProps,function(t){void 0!==a[t]&&(f[t]=a[t],delete a[t])});w.css(f)}return W.call(B,a)},getBBox:function(){return{width:g.width+
2*z,height:g.height+2*z,x:g.x-z,y:g.y-z}},shadow:function(a){a&&(U(),J&&J.shadow(a));return B},destroy:function(){t(B.element,"mouseenter");t(B.element,"mouseleave");w&&(w=w.destroy());J&&(J=J.destroy());C.prototype.destroy.call(B);B=x=U=O=P=null}})}});a.Renderer=A})(K);(function(a){var C=a.attr,A=a.createElement,G=a.css,F=a.defined,m=a.each,g=a.extend,k=a.isFirefox,q=a.isMS,v=a.isWebKit,u=a.pInt,h=a.SVGRenderer,e=a.win,n=a.wrap;g(a.SVGElement.prototype,{htmlCss:function(a){var c=this.element;if(c=
a&&"SPAN"===c.tagName&&a.width)delete a.width,this.textWidth=c,this.updateTransform();a&&"ellipsis"===a.textOverflow&&(a.whiteSpace="nowrap",a.overflow="hidden");this.styles=g(this.styles,a);G(this.element,a);return this},htmlGetBBox:function(){var a=this.element;"text"===a.nodeName&&(a.style.position="absolute");return{x:a.offsetLeft,y:a.offsetTop,width:a.offsetWidth,height:a.offsetHeight}},htmlUpdateTransform:function(){if(this.added){var a=this.renderer,c=this.element,e=this.translateX||0,b=this.translateY||
0,h=this.x||0,n=this.y||0,g=this.textAlign||"left",l={left:0,center:.5,right:1}[g],B=this.styles;G(c,{marginLeft:e,marginTop:b});this.shadows&&m(this.shadows,function(a){G(a,{marginLeft:e+1,marginTop:b+1})});this.inverted&&m(c.childNodes,function(b){a.invertChild(b,c)});if("SPAN"===c.tagName){var r=this.rotation,z=u(this.textWidth),q=B&&B.whiteSpace,p=[r,g,c.innerHTML,this.textWidth,this.textAlign].join();p!==this.cTT&&(B=a.fontMetrics(c.style.fontSize).b,F(r)&&this.setSpanRotation(r,l,B),G(c,{width:"",
whiteSpace:q||"nowrap"}),c.offsetWidth>z&&/[ \-]/.test(c.textContent||c.innerText)&&G(c,{width:z+"px",display:"block",whiteSpace:q||"normal"}),this.getSpanCorrection(c.offsetWidth,B,l,r,g));G(c,{left:h+(this.xCorr||0)+"px",top:n+(this.yCorr||0)+"px"});v&&(B=c.offsetHeight);this.cTT=p}}else this.alignOnAdd=!0},setSpanRotation:function(a,c,h){var b={},d=q?"-ms-transform":v?"-webkit-transform":k?"MozTransform":e.opera?"-o-transform":"";b[d]=b.transform="rotate("+a+"deg)";b[d+(k?"Origin":"-origin")]=
b.transformOrigin=100*c+"% "+h+"px";G(this.element,b)},getSpanCorrection:function(a,c,e){this.xCorr=-a*e;this.yCorr=-c}});g(h.prototype,{html:function(a,c,e){var b=this.createElement("span"),d=b.element,h=b.renderer,w=h.isSVG,l=function(a,b){m(["opacity","visibility"],function(l){n(a,l+"Setter",function(a,l,c,r){a.call(this,l,c,r);b[c]=l})})};b.textSetter=function(a){a!==d.innerHTML&&delete this.bBox;d.innerHTML=this.textStr=a;b.htmlUpdateTransform()};w&&l(b,b.element.style);b.xSetter=b.ySetter=b.alignSetter=
b.rotationSetter=function(a,l){"align"===l&&(l="textAlign");b[l]=a;b.htmlUpdateTransform()};b.attr({text:a,x:Math.round(c),y:Math.round(e)}).css({fontFamily:this.style.fontFamily,fontSize:this.style.fontSize,position:"absolute"});d.style.whiteSpace="nowrap";b.css=b.htmlCss;w&&(b.add=function(a){var c,e=h.box.parentNode,B=[];if(this.parentGroup=a){if(c=a.div,!c){for(;a;)B.push(a),a=a.parentGroup;m(B.reverse(),function(a){var r,p=C(a.element,"class");p&&(p={className:p});c=a.div=a.div||A("div",p,{position:"absolute",
left:(a.translateX||0)+"px",top:(a.translateY||0)+"px",display:a.display,opacity:a.opacity,pointerEvents:a.styles&&a.styles.pointerEvents},c||e);r=c.style;g(a,{on:function(){b.on.apply({element:B[0].div},arguments);return a},translateXSetter:function(b,f){r.left=b+"px";a[f]=b;a.doTransform=!0},translateYSetter:function(b,f){r.top=b+"px";a[f]=b;a.doTransform=!0}});l(a,r)})}}else c=e;c.appendChild(d);b.added=!0;b.alignOnAdd&&b.htmlUpdateTransform();return b});return b}})})(K);(function(a){var C,A,G=
a.createElement,F=a.css,m=a.defined,g=a.deg2rad,k=a.discardElement,q=a.doc,v=a.each,u=a.erase,h=a.extend;C=a.extendClass;var e=a.isArray,n=a.isNumber,d=a.isObject,c=a.merge;A=a.noop;var w=a.pick,b=a.pInt,y=a.SVGElement,D=a.SVGRenderer,H=a.win;a.svg||(A={docMode8:q&&8===q.documentMode,init:function(a,b){var l=["\x3c",b,' filled\x3d"f" stroked\x3d"f"'],c=["position: ","absolute",";"],d="div"===b;("shape"===b||d)&&c.push("left:0;top:0;width:1px;height:1px;");c.push("visibility: ",d?"hidden":"visible");
l.push(' style\x3d"',c.join(""),'"/\x3e');b&&(l=d||"span"===b||"img"===b?l.join(""):a.prepVML(l),this.element=G(l));this.renderer=a},add:function(a){var b=this.renderer,l=this.element,c=b.box,d=a&&a.inverted,c=a?a.element||a:c;a&&(this.parentGroup=a);d&&b.invertChild(l,c);c.appendChild(l);this.added=!0;this.alignOnAdd&&!this.deferUpdateTransform&&this.updateTransform();if(this.onAdd)this.onAdd();this.className&&this.attr("class",this.className);return this},updateTransform:y.prototype.htmlUpdateTransform,
setSpanRotation:function(){var a=this.rotation,b=Math.cos(a*g),c=Math.sin(a*g);F(this.element,{filter:a?["progid:DXImageTransform.Microsoft.Matrix(M11\x3d",b,", M12\x3d",-c,", M21\x3d",c,", M22\x3d",b,", sizingMethod\x3d'auto expand')"].join(""):"none"})},getSpanCorrection:function(a,b,c,d,e){var l=d?Math.cos(d*g):1,r=d?Math.sin(d*g):0,h=w(this.elemHeight,this.element.offsetHeight),n;this.xCorr=0>l&&-a;this.yCorr=0>r&&-h;n=0>l*r;this.xCorr+=r*b*(n?1-c:c);this.yCorr-=l*b*(d?n?c:1-c:1);e&&"left"!==
e&&(this.xCorr-=a*c*(0>l?-1:1),d&&(this.yCorr-=h*c*(0>r?-1:1)),F(this.element,{textAlign:e}))},pathToVML:function(a){for(var b=a.length,l=[];b--;)n(a[b])?l[b]=Math.round(10*a[b])-5:"Z"===a[b]?l[b]="x":(l[b]=a[b],!a.isArc||"wa"!==a[b]&&"at"!==a[b]||(l[b+5]===l[b+7]&&(l[b+7]+=a[b+7]>a[b+5]?1:-1),l[b+6]===l[b+8]&&(l[b+8]+=a[b+8]>a[b+6]?1:-1)));return l.join(" ")||"x"},clip:function(a){var b=this,l;a?(l=a.members,u(l,b),l.push(b),b.destroyClip=function(){u(l,b)},a=a.getCSS(b)):(b.destroyClip&&b.destroyClip(),
a={clip:b.docMode8?"inherit":"rect(auto)"});return b.css(a)},css:y.prototype.htmlCss,safeRemoveChild:function(a){a.parentNode&&k(a)},destroy:function(){this.destroyClip&&this.destroyClip();return y.prototype.destroy.apply(this)},on:function(a,b){this.element["on"+a]=function(){var a=H.event;a.target=a.srcElement;b(a)};return this},cutOffPath:function(a,c){var l;a=a.split(/[ ,]/);l=a.length;if(9===l||11===l)a[l-4]=a[l-2]=b(a[l-2])-10*c;return a.join(" ")},shadow:function(a,c,d){var l=[],r,p=this.element,
e=this.renderer,h,n=p.style,f,t=p.path,y,J,g,B;t&&"string"!==typeof t.value&&(t="x");J=t;if(a){g=w(a.width,3);B=(a.opacity||.15)/g;for(r=1;3>=r;r++)y=2*g+1-2*r,d&&(J=this.cutOffPath(t.value,y+.5)),f=['\x3cshape isShadow\x3d"true" strokeweight\x3d"',y,'" filled\x3d"false" path\x3d"',J,'" coordsize\x3d"10 10" style\x3d"',p.style.cssText,'" /\x3e'],h=G(e.prepVML(f),null,{left:b(n.left)+w(a.offsetX,1),top:b(n.top)+w(a.offsetY,1)}),d&&(h.cutOff=y+1),f=['\x3cstroke color\x3d"',a.color||"#000000",'" opacity\x3d"',
B*r,'"/\x3e'],G(e.prepVML(f),null,null,h),c?c.element.appendChild(h):p.parentNode.insertBefore(h,p),l.push(h);this.shadows=l}return this},updateShadows:A,setAttr:function(a,b){this.docMode8?this.element[a]=b:this.element.setAttribute(a,b)},classSetter:function(a){(this.added?this.element:this).className=a},dashstyleSetter:function(a,b,c){(c.getElementsByTagName("stroke")[0]||G(this.renderer.prepVML(["\x3cstroke/\x3e"]),null,null,c))[b]=a||"solid";this[b]=a},dSetter:function(a,b,c){var l=this.shadows;
a=a||[];this.d=a.join&&a.join(" ");c.path=a=this.pathToVML(a);if(l)for(c=l.length;c--;)l[c].path=l[c].cutOff?this.cutOffPath(a,l[c].cutOff):a;this.setAttr(b,a)},fillSetter:function(a,b,c){var l=c.nodeName;"SPAN"===l?c.style.color=a:"IMG"!==l&&(c.filled="none"!==a,this.setAttr("fillcolor",this.renderer.color(a,c,b,this)))},"fill-opacitySetter":function(a,b,c){G(this.renderer.prepVML(["\x3c",b.split("-")[0],' opacity\x3d"',a,'"/\x3e']),null,null,c)},opacitySetter:A,rotationSetter:function(a,b,c){c=
c.style;this[b]=c[b]=a;c.left=-Math.round(Math.sin(a*g)+1)+"px";c.top=Math.round(Math.cos(a*g))+"px"},strokeSetter:function(a,b,c){this.setAttr("strokecolor",this.renderer.color(a,c,b,this))},"stroke-widthSetter":function(a,b,c){c.stroked=!!a;this[b]=a;n(a)&&(a+="px");this.setAttr("strokeweight",a)},titleSetter:function(a,b){this.setAttr(b,a)},visibilitySetter:function(a,b,c){"inherit"===a&&(a="visible");this.shadows&&v(this.shadows,function(c){c.style[b]=a});"DIV"===c.nodeName&&(a="hidden"===a?"-999em":
0,this.docMode8||(c.style[b]=a?"visible":"hidden"),b="top");c.style[b]=a},xSetter:function(a,b,c){this[b]=a;"x"===b?b="left":"y"===b&&(b="top");this.updateClipping?(this[b]=a,this.updateClipping()):c.style[b]=a},zIndexSetter:function(a,b,c){c.style[b]=a}},A["stroke-opacitySetter"]=A["fill-opacitySetter"],a.VMLElement=A=C(y,A),A.prototype.ySetter=A.prototype.widthSetter=A.prototype.heightSetter=A.prototype.xSetter,A={Element:A,isIE8:-1<H.navigator.userAgent.indexOf("MSIE 8.0"),init:function(a,b,c){var l,
d;this.alignedObjects=[];l=this.createElement("div").css({position:"relative"});d=l.element;a.appendChild(l.element);this.isVML=!0;this.box=d;this.boxWrapper=l;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(b,c,!1);if(!q.namespaces.hcv){q.namespaces.add("hcv","urn:schemas-microsoft-com:vml");try{q.createStyleSheet().cssText="hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "}catch(p){q.styleSheets[0].cssText+="hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "}}},
isHidden:function(){return!this.box.offsetWidth},clipRect:function(a,b,c,e){var l=this.createElement(),p=d(a);return h(l,{members:[],count:0,left:(p?a.x:a)+1,top:(p?a.y:b)+1,width:(p?a.width:c)-1,height:(p?a.height:e)-1,getCSS:function(a){var b=a.element,c=b.nodeName,f=a.inverted,t=this.top-("shape"===c?b.offsetTop:0),l=this.left,b=l+this.width,p=t+this.height,t={clip:"rect("+Math.round(f?l:t)+"px,"+Math.round(f?p:b)+"px,"+Math.round(f?b:p)+"px,"+Math.round(f?t:l)+"px)"};!f&&a.docMode8&&"DIV"===c&&
h(t,{width:b+"px",height:p+"px"});return t},updateClipping:function(){v(l.members,function(a){a.element&&a.css(l.getCSS(a))})}})},color:function(b,c,d,e){var l=this,p,r=/^rgba/,h,n,f="none";b&&b.linearGradient?n="gradient":b&&b.radialGradient&&(n="pattern");if(n){var t,y,w=b.linearGradient||b.radialGradient,g,q,B,x,D,z="";b=b.stops;var k,m=[],u=function(){h=['\x3cfill colors\x3d"'+m.join(",")+'" opacity\x3d"',B,'" o:opacity2\x3d"',q,'" type\x3d"',n,'" ',z,'focus\x3d"100%" method\x3d"any" /\x3e'];
G(l.prepVML(h),null,null,c)};g=b[0];k=b[b.length-1];0<g[0]&&b.unshift([0,g[1]]);1>k[0]&&b.push([1,k[1]]);v(b,function(f,b){r.test(f[1])?(p=a.color(f[1]),t=p.get("rgb"),y=p.get("a")):(t=f[1],y=1);m.push(100*f[0]+"% "+t);b?(B=y,x=t):(q=y,D=t)});if("fill"===d)if("gradient"===n)d=w.x1||w[0]||0,b=w.y1||w[1]||0,g=w.x2||w[2]||0,w=w.y2||w[3]||0,z='angle\x3d"'+(90-180*Math.atan((w-b)/(g-d))/Math.PI)+'"',u();else{var f=w.r,H=2*f,A=2*f,C=w.cx,F=w.cy,T=c.radialReference,K,f=function(){T&&(K=e.getBBox(),C+=(T[0]-
K.x)/K.width-.5,F+=(T[1]-K.y)/K.height-.5,H*=T[2]/K.width,A*=T[2]/K.height);z='src\x3d"'+a.getOptions().global.VMLRadialGradientURL+'" size\x3d"'+H+","+A+'" origin\x3d"0.5,0.5" position\x3d"'+C+","+F+'" color2\x3d"'+D+'" ';u()};e.added?f():e.onAdd=f;f=x}else f=t}else r.test(b)&&"IMG"!==c.tagName?(p=a.color(b),e[d+"-opacitySetter"](p.get("a"),d,c),f=p.get("rgb")):(f=c.getElementsByTagName(d),f.length&&(f[0].opacity=1,f[0].type="solid"),f=b);return f},prepVML:function(a){var b=this.isIE8;a=a.join("");
b?(a=a.replace("/\x3e",' xmlns\x3d"urn:schemas-microsoft-com:vml" /\x3e'),a=-1===a.indexOf('style\x3d"')?a.replace("/\x3e",' style\x3d"display:inline-block;behavior:url(#default#VML);" /\x3e'):a.replace('style\x3d"','style\x3d"display:inline-block;behavior:url(#default#VML);')):a=a.replace("\x3c","\x3chcv:");return a},text:D.prototype.html,path:function(a){var b={coordsize:"10 10"};e(a)?b.d=a:d(a)&&h(b,a);return this.createElement("shape").attr(b)},circle:function(a,b,c){var l=this.symbol("circle");
d(a)&&(c=a.r,b=a.y,a=a.x);l.isCircle=!0;l.r=c;return l.attr({x:a,y:b})},g:function(a){var b;a&&(b={className:"highcharts-"+a,"class":"highcharts-"+a});return this.createElement("div").attr(b)},image:function(a,b,c,d,e){var l=this.createElement("img").attr({src:a});1<arguments.length&&l.attr({x:b,y:c,width:d,height:e});return l},createElement:function(a){return"rect"===a?this.symbol(a):D.prototype.createElement.call(this,a)},invertChild:function(a,c){var d=this;c=c.style;var l="IMG"===a.tagName&&a.style;
F(a,{flip:"x",left:b(c.width)-(l?b(l.top):1),top:b(c.height)-(l?b(l.left):1),rotation:-90});v(a.childNodes,function(b){d.invertChild(b,a)})},symbols:{arc:function(a,b,c,d,e){var p=e.start,l=e.end,r=e.r||c||d;c=e.innerR;d=Math.cos(p);var h=Math.sin(p),f=Math.cos(l),t=Math.sin(l);if(0===l-p)return["x"];p=["wa",a-r,b-r,a+r,b+r,a+r*d,b+r*h,a+r*f,b+r*t];e.open&&!c&&p.push("e","M",a,b);p.push("at",a-c,b-c,a+c,b+c,a+c*f,b+c*t,a+c*d,b+c*h,"x","e");p.isArc=!0;return p},circle:function(a,b,c,d,e){e&&m(e.r)&&
(c=d=2*e.r);e&&e.isCircle&&(a-=c/2,b-=d/2);return["wa",a,b,a+c,b+d,a+c,b+d/2,a+c,b+d/2,"e"]},rect:function(a,b,c,d,e){return D.prototype.symbols[m(e)&&e.r?"callout":"square"].call(0,a,b,c,d,e)}}},a.VMLRenderer=C=function(){this.init.apply(this,arguments)},C.prototype=c(D.prototype,A),a.Renderer=C);D.prototype.measureSpanWidth=function(a,b){var c=q.createElement("span");a=q.createTextNode(a);c.appendChild(a);F(c,b);this.box.appendChild(c);b=c.offsetWidth;k(c);return b}})(K);(function(a){function C(){var g=
a.defaultOptions.global,k=q.moment;if(g.timezone){if(k)return function(a){return-k.tz(a,g.timezone).utcOffset()};a.error(25)}return g.useUTC&&g.getTimezoneOffset}function A(){var g=a.defaultOptions.global,u,h=g.useUTC,e=h?"getUTC":"get",n=h?"setUTC":"set";a.Date=u=g.Date||q.Date;u.hcTimezoneOffset=h&&g.timezoneOffset;u.hcGetTimezoneOffset=C();u.hcMakeTime=function(a,c,e,b,n,g){var d;h?(d=u.UTC.apply(0,arguments),d+=m(d)):d=(new u(a,c,k(e,1),k(b,0),k(n,0),k(g,0))).getTime();return d};F("Minutes Hours Day Date Month FullYear".split(" "),
function(a){u["hcGet"+a]=e+a});F("Milliseconds Seconds Minutes Hours Date Month FullYear".split(" "),function(a){u["hcSet"+a]=n+a})}var G=a.color,F=a.each,m=a.getTZOffset,g=a.merge,k=a.pick,q=a.win;a.defaultOptions={colors:"#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),symbols:["circle","diamond","square","triangle","triangle-down"],lang:{loading:"Loading...",months:"January February March April May June July August September October November December".split(" "),
shortMonths:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),weekdays:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),decimalPoint:".",numericSymbols:"kMGTPE".split(""),resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:" "},global:{useUTC:!0,VMLRadialGradientURL:"http://code.highcharts.com/5.0.12/gfx/vml-radial-gradient.png"},chart:{borderRadius:0,defaultSeriesType:"line",ignoreHiddenSeries:!0,spacing:[10,10,15,10],resetZoomButton:{theme:{zIndex:20},
position:{align:"right",x:-10,y:10}},width:null,height:null,borderColor:"#335cad",backgroundColor:"#ffffff",plotBorderColor:"#cccccc"},title:{text:"Chart title",align:"center",margin:15,widthAdjust:-44},subtitle:{text:"",align:"center",widthAdjust:-44},plotOptions:{},labels:{style:{position:"absolute",color:"#333333"}},legend:{enabled:!0,align:"center",layout:"horizontal",labelFormatter:function(){return this.name},borderColor:"#999999",borderRadius:0,navigation:{activeColor:"#003399",inactiveColor:"#cccccc"},
itemStyle:{color:"#333333",fontSize:"12px",fontWeight:"bold",textOverflow:"ellipsis"},itemHoverStyle:{color:"#000000"},itemHiddenStyle:{color:"#cccccc"},shadow:!1,itemCheckboxStyle:{position:"absolute",width:"13px",height:"13px"},squareSymbol:!0,symbolPadding:5,verticalAlign:"bottom",x:0,y:0,title:{style:{fontWeight:"bold"}}},loading:{labelStyle:{fontWeight:"bold",position:"relative",top:"45%"},style:{position:"absolute",backgroundColor:"#ffffff",opacity:.5,textAlign:"center"}},tooltip:{enabled:!0,
animation:a.svg,borderRadius:3,dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L",second:"%A, %b %e, %H:%M:%S",minute:"%A, %b %e, %H:%M",hour:"%A, %b %e, %H:%M",day:"%A, %b %e, %Y",week:"Week from %A, %b %e, %Y",month:"%B %Y",year:"%Y"},footerFormat:"",padding:8,snap:a.isTouchDevice?25:10,backgroundColor:G("#f7f7f7").setOpacity(.85).get(),borderWidth:1,headerFormat:'\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',
shadow:!0,style:{color:"#333333",cursor:"default",fontSize:"12px",pointerEvents:"none",whiteSpace:"nowrap"}},credits:{enabled:!0,href:"http://www.highcharts.com",position:{align:"right",x:-10,verticalAlign:"bottom",y:-5},style:{cursor:"pointer",color:"#999999",fontSize:"9px"},text:"Highcharts.com"}};a.setOptions=function(q){a.defaultOptions=g(!0,a.defaultOptions,q);A();return a.defaultOptions};a.getOptions=function(){return a.defaultOptions};a.defaultPlotOptions=a.defaultOptions.plotOptions;A()})(K);
(function(a){var C=a.correctFloat,A=a.defined,G=a.destroyObjectProperties,F=a.isNumber,m=a.merge,g=a.pick,k=a.deg2rad;a.Tick=function(a,g,k,h){this.axis=a;this.pos=g;this.type=k||"";this.isNewLabel=this.isNew=!0;k||h||this.addLabel()};a.Tick.prototype={addLabel:function(){var a=this.axis,k=a.options,u=a.chart,h=a.categories,e=a.names,n=this.pos,d=k.labels,c=a.tickPositions,w=n===c[0],b=n===c[c.length-1],e=h?g(h[n],e[n],n):n,h=this.label,c=c.info,y;a.isDatetimeAxis&&c&&(y=k.dateTimeLabelFormats[c.higherRanks[n]||
c.unitName]);this.isFirst=w;this.isLast=b;k=a.labelFormatter.call({axis:a,chart:u,isFirst:w,isLast:b,dateTimeLabelFormat:y,value:a.isLog?C(a.lin2log(e)):e});A(h)?h&&h.attr({text:k}):(this.labelLength=(this.label=h=A(k)&&d.enabled?u.renderer.text(k,0,0,d.useHTML).css(m(d.style)).add(a.labelGroup):null)&&h.getBBox().width,this.rotation=0)},getLabelSize:function(){return this.label?this.label.getBBox()[this.axis.horiz?"height":"width"]:0},handleOverflow:function(a){var q=this.axis,m=a.x,h=q.chart.chartWidth,
e=q.chart.spacing,n=g(q.labelLeft,Math.min(q.pos,e[3])),e=g(q.labelRight,Math.max(q.pos+q.len,h-e[1])),d=this.label,c=this.rotation,w={left:0,center:.5,right:1}[q.labelAlign],b=d.getBBox().width,y=q.getSlotWidth(),D=y,H=1,l,B={};if(c)0>c&&m-w*b<n?l=Math.round(m/Math.cos(c*k)-n):0<c&&m+w*b>e&&(l=Math.round((h-m)/Math.cos(c*k)));else if(h=m+(1-w)*b,m-w*b<n?D=a.x+D*(1-w)-n:h>e&&(D=e-a.x+D*w,H=-1),D=Math.min(y,D),D<y&&"center"===q.labelAlign&&(a.x+=H*(y-D-w*(y-Math.min(b,D)))),b>D||q.autoRotation&&(d.styles||
{}).width)l=D;l&&(B.width=l,(q.options.labels.style||{}).textOverflow||(B.textOverflow="ellipsis"),d.css(B))},getPosition:function(a,g,k,h){var e=this.axis,n=e.chart,d=h&&n.oldChartHeight||n.chartHeight;return{x:a?e.translate(g+k,null,null,h)+e.transB:e.left+e.offset+(e.opposite?(h&&n.oldChartWidth||n.chartWidth)-e.right-e.left:0),y:a?d-e.bottom+e.offset-(e.opposite?e.height:0):d-e.translate(g+k,null,null,h)-e.transB}},getLabelPosition:function(a,g,m,h,e,n,d,c){var w=this.axis,b=w.transA,y=w.reversed,
D=w.staggerLines,q=w.tickRotCorr||{x:0,y:0},l=e.y;A(l)||(l=0===w.side?m.rotation?-8:-m.getBBox().height:2===w.side?q.y+8:Math.cos(m.rotation*k)*(q.y-m.getBBox(!1,0).height/2));a=a+e.x+q.x-(n&&h?n*b*(y?-1:1):0);g=g+l-(n&&!h?n*b*(y?1:-1):0);D&&(m=d/(c||1)%D,w.opposite&&(m=D-m-1),g+=w.labelOffset/D*m);return{x:a,y:Math.round(g)}},getMarkPath:function(a,g,k,h,e,n){return n.crispLine(["M",a,g,"L",a+(e?0:-k),g+(e?k:0)],h)},renderGridLine:function(a,g,k){var h=this.axis,e=h.options,n=this.gridLine,d={},
c=this.pos,w=this.type,b=h.tickmarkOffset,y=h.chart.renderer,D=w?w+"Grid":"grid",q=e[D+"LineWidth"],l=e[D+"LineColor"],e=e[D+"LineDashStyle"];n||(d.stroke=l,d["stroke-width"]=q,e&&(d.dashstyle=e),w||(d.zIndex=1),a&&(d.opacity=0),this.gridLine=n=y.path().attr(d).addClass("highcharts-"+(w?w+"-":"")+"grid-line").add(h.gridGroup));if(!a&&n&&(a=h.getPlotLinePath(c+b,n.strokeWidth()*k,a,!0)))n[this.isNew?"attr":"animate"]({d:a,opacity:g})},renderMark:function(a,k,m){var h=this.axis,e=h.options,n=h.chart.renderer,
d=this.type,c=d?d+"Tick":"tick",w=h.tickSize(c),b=this.mark,y=!b,D=a.x;a=a.y;var q=g(e[c+"Width"],!d&&h.isXAxis?1:0),e=e[c+"Color"];w&&(h.opposite&&(w[0]=-w[0]),y&&(this.mark=b=n.path().addClass("highcharts-"+(d?d+"-":"")+"tick").add(h.axisGroup),b.attr({stroke:e,"stroke-width":q})),b[y?"attr":"animate"]({d:this.getMarkPath(D,a,w[0],b.strokeWidth()*m,h.horiz,n),opacity:k}))},renderLabel:function(a,k,m,h){var e=this.axis,n=e.horiz,d=e.options,c=this.label,w=d.labels,b=w.step,y=e.tickmarkOffset,D=!0,
q=a.x;a=a.y;c&&F(q)&&(c.xy=a=this.getLabelPosition(q,a,c,n,w,y,h,b),this.isFirst&&!this.isLast&&!g(d.showFirstLabel,1)||this.isLast&&!this.isFirst&&!g(d.showLastLabel,1)?D=!1:!n||e.isRadial||w.step||w.rotation||k||0===m||this.handleOverflow(a),b&&h%b&&(D=!1),D&&F(a.y)?(a.opacity=m,c[this.isNewLabel?"attr":"animate"](a),this.isNewLabel=!1):(c.attr("y",-9999),this.isNewLabel=!0),this.isNew=!1)},render:function(a,k,m){var h=this.axis,e=h.horiz,n=this.getPosition(e,this.pos,h.tickmarkOffset,k),d=n.x,
c=n.y,h=e&&d===h.pos+h.len||!e&&c===h.pos?-1:1;m=g(m,1);this.isActive=!0;this.renderGridLine(k,m,h);this.renderMark(n,m,h);this.renderLabel(n,k,m,a)},destroy:function(){G(this,this.axis)}}})(K);var S=function(a){var C=a.addEvent,A=a.animObject,G=a.arrayMax,F=a.arrayMin,m=a.color,g=a.correctFloat,k=a.defaultOptions,q=a.defined,v=a.deg2rad,u=a.destroyObjectProperties,h=a.each,e=a.extend,n=a.fireEvent,d=a.format,c=a.getMagnitude,w=a.grep,b=a.inArray,y=a.isArray,D=a.isNumber,H=a.isString,l=a.merge,B=
a.normalizeTickInterval,r=a.objectEach,z=a.pick,M=a.removeEvent,p=a.splat,E=a.syncTimeout,I=a.Tick,L=function(){this.init.apply(this,arguments)};a.extend(L.prototype,{defaultOptions:{dateTimeLabelFormats:{millisecond:"%H:%M:%S.%L",second:"%H:%M:%S",minute:"%H:%M",hour:"%H:%M",day:"%e. %b",week:"%e. %b",month:"%b '%y",year:"%Y"},endOnTick:!1,labels:{enabled:!0,style:{color:"#666666",cursor:"default",fontSize:"11px"},x:0},minPadding:.01,maxPadding:.01,minorTickLength:2,minorTickPosition:"outside",startOfWeek:1,
startOnTick:!1,tickLength:10,tickmarkPlacement:"between",tickPixelInterval:100,tickPosition:"outside",title:{align:"middle",style:{color:"#666666"}},type:"linear",minorGridLineColor:"#f2f2f2",minorGridLineWidth:1,minorTickColor:"#999999",lineColor:"#ccd6eb",lineWidth:1,gridLineColor:"#e6e6e6",tickColor:"#ccd6eb"},defaultYAxisOptions:{endOnTick:!0,tickPixelInterval:72,showLastLabel:!0,labels:{x:-8},maxPadding:.05,minPadding:.05,startOnTick:!0,title:{rotation:270,text:"Values"},stackLabels:{enabled:!1,
formatter:function(){return a.numberFormat(this.total,-1)},style:{fontSize:"11px",fontWeight:"bold",color:"#000000",textOutline:"1px contrast"}},gridLineWidth:1,lineWidth:0},defaultLeftAxisOptions:{labels:{x:-15},title:{rotation:270}},defaultRightAxisOptions:{labels:{x:15},title:{rotation:90}},defaultBottomAxisOptions:{labels:{autoRotation:[-45],x:0},title:{rotation:0}},defaultTopAxisOptions:{labels:{autoRotation:[-45],x:0},title:{rotation:0}},init:function(a,t){var f=t.isX,c=this;c.chart=a;c.horiz=
a.inverted&&!c.isZAxis?!f:f;c.isXAxis=f;c.coll=c.coll||(f?"xAxis":"yAxis");c.opposite=t.opposite;c.side=t.side||(c.horiz?c.opposite?0:2:c.opposite?1:3);c.setOptions(t);var d=this.options,e=d.type;c.labelFormatter=d.labels.formatter||c.defaultLabelFormatter;c.userOptions=t;c.minPixelPadding=0;c.reversed=d.reversed;c.visible=!1!==d.visible;c.zoomEnabled=!1!==d.zoomEnabled;c.hasNames="category"===e||!0===d.categories;c.categories=d.categories||c.hasNames;c.names=c.names||[];c.plotLinesAndBandsGroups=
{};c.isLog="logarithmic"===e;c.isDatetimeAxis="datetime"===e;c.positiveValuesOnly=c.isLog&&!c.allowNegativeLog;c.isLinked=q(d.linkedTo);c.ticks={};c.labelEdge=[];c.minorTicks={};c.plotLinesAndBands=[];c.alternateBands={};c.len=0;c.minRange=c.userMinRange=d.minRange||d.maxZoom;c.range=d.range;c.offset=d.offset||0;c.stacks={};c.oldStacks={};c.stacksTouched=0;c.max=null;c.min=null;c.crosshair=z(d.crosshair,p(a.options.tooltip.crosshairs)[f?0:1],!1);t=c.options.events;-1===b(c,a.axes)&&(f?a.axes.splice(a.xAxis.length,
0,c):a.axes.push(c),a[c.coll].push(c));c.series=c.series||[];a.inverted&&!c.isZAxis&&f&&void 0===c.reversed&&(c.reversed=!0);r(t,function(a,f){C(c,f,a)});c.lin2log=d.linearToLogConverter||c.lin2log;c.isLog&&(c.val2lin=c.log2lin,c.lin2val=c.lin2log)},setOptions:function(a){this.options=l(this.defaultOptions,"yAxis"===this.coll&&this.defaultYAxisOptions,[this.defaultTopAxisOptions,this.defaultRightAxisOptions,this.defaultBottomAxisOptions,this.defaultLeftAxisOptions][this.side],l(k[this.coll],a))},
defaultLabelFormatter:function(){var f=this.axis,b=this.value,c=f.categories,p=this.dateTimeLabelFormat,e=k.lang,l=e.numericSymbols,e=e.numericSymbolMagnitude||1E3,r=l&&l.length,x,h=f.options.labels.format,f=f.isLog?Math.abs(b):f.tickInterval;if(h)x=d(h,this);else if(c)x=b;else if(p)x=a.dateFormat(p,b);else if(r&&1E3<=f)for(;r--&&void 0===x;)c=Math.pow(e,r+1),f>=c&&0===10*b%c&&null!==l[r]&&0!==b&&(x=a.numberFormat(b/c,-1)+l[r]);void 0===x&&(x=1E4<=Math.abs(b)?a.numberFormat(b,-1):a.numberFormat(b,
-1,void 0,""));return x},getSeriesExtremes:function(){var a=this,b=a.chart;a.hasVisibleSeries=!1;a.dataMin=a.dataMax=a.threshold=null;a.softThreshold=!a.isXAxis;a.buildStacks&&a.buildStacks();h(a.series,function(f){if(f.visible||!b.options.chart.ignoreHiddenSeries){var c=f.options,t=c.threshold,d;a.hasVisibleSeries=!0;a.positiveValuesOnly&&0>=t&&(t=null);if(a.isXAxis)c=f.xData,c.length&&(f=F(c),D(f)||f instanceof Date||(c=w(c,function(a){return D(a)}),f=F(c)),a.dataMin=Math.min(z(a.dataMin,c[0]),
f),a.dataMax=Math.max(z(a.dataMax,c[0]),G(c)));else if(f.getExtremes(),d=f.dataMax,f=f.dataMin,q(f)&&q(d)&&(a.dataMin=Math.min(z(a.dataMin,f),f),a.dataMax=Math.max(z(a.dataMax,d),d)),q(t)&&(a.threshold=t),!c.softThreshold||a.positiveValuesOnly)a.softThreshold=!1}})},translate:function(a,b,c,d,p,e){var f=this.linkedParent||this,t=1,l=0,r=d?f.oldTransA:f.transA;d=d?f.oldMin:f.min;var h=f.minPixelPadding;p=(f.isOrdinal||f.isBroken||f.isLog&&p)&&f.lin2val;r||(r=f.transA);c&&(t*=-1,l=f.len);f.reversed&&
(t*=-1,l-=t*(f.sector||f.len));b?(a=(a*t+l-h)/r+d,p&&(a=f.lin2val(a))):(p&&(a=f.val2lin(a)),a=t*(a-d)*r+l+t*h+(D(e)?r*e:0));return a},toPixels:function(a,b){return this.translate(a,!1,!this.horiz,null,!0)+(b?0:this.pos)},toValue:function(a,b){return this.translate(a-(b?0:this.pos),!0,!this.horiz,null,!0)},getPlotLinePath:function(a,b,c,d,p){var f=this.chart,t=this.left,e=this.top,l,r,h=c&&f.oldChartHeight||f.chartHeight,n=c&&f.oldChartWidth||f.chartWidth,w;l=this.transB;var g=function(a,f,b){if(a<
f||a>b)d?a=Math.min(Math.max(f,a),b):w=!0;return a};p=z(p,this.translate(a,null,null,c));a=c=Math.round(p+l);l=r=Math.round(h-p-l);D(p)?this.horiz?(l=e,r=h-this.bottom,a=c=g(a,t,t+this.width)):(a=t,c=n-this.right,l=r=g(l,e,e+this.height)):w=!0;return w&&!d?null:f.renderer.crispLine(["M",a,l,"L",c,r],b||1)},getLinearTickPositions:function(a,b,c){var f,t=g(Math.floor(b/a)*a);c=g(Math.ceil(c/a)*a);var d=[];if(this.single)return[b];for(b=t;b<=c;){d.push(b);b=g(b+a);if(b===f)break;f=b}return d},getMinorTickPositions:function(){var a=
this,b=a.options,c=a.tickPositions,d=a.minorTickInterval,p=[],e=a.pointRangePadding||0,l=a.min-e,e=a.max+e,x=e-l;if(x&&x/d<a.len/3)if(a.isLog)h(this.paddedTicks,function(b,f,c){f&&p.push.apply(p,a.getLogTickPositions(d,c[f-1],c[f],!0))});else if(a.isDatetimeAxis&&"auto"===b.minorTickInterval)p=p.concat(a.getTimeTicks(a.normalizeTimeTickInterval(d),l,e,b.startOfWeek));else for(b=l+(c[0]-l)%d;b<=e&&b!==p[0];b+=d)p.push(b);0!==p.length&&a.trimTicks(p);return p},adjustForMinRange:function(){var a=this.options,
b=this.min,c=this.max,d,p,e,l,x,r,n,w;this.isXAxis&&void 0===this.minRange&&!this.isLog&&(q(a.min)||q(a.max)?this.minRange=null:(h(this.series,function(a){r=a.xData;for(l=n=a.xIncrement?1:r.length-1;0<l;l--)if(x=r[l]-r[l-1],void 0===e||x<e)e=x}),this.minRange=Math.min(5*e,this.dataMax-this.dataMin)));c-b<this.minRange&&(p=this.dataMax-this.dataMin>=this.minRange,w=this.minRange,d=(w-c+b)/2,d=[b-d,z(a.min,b-d)],p&&(d[2]=this.isLog?this.log2lin(this.dataMin):this.dataMin),b=G(d),c=[b+w,z(a.max,b+w)],
p&&(c[2]=this.isLog?this.log2lin(this.dataMax):this.dataMax),c=F(c),c-b<w&&(d[0]=c-w,d[1]=z(a.min,c-w),b=G(d)));this.min=b;this.max=c},getClosest:function(){var a;this.categories?a=1:h(this.series,function(b){var f=b.closestPointRange,c=b.visible||!b.chart.options.chart.ignoreHiddenSeries;!b.noSharedTooltip&&q(f)&&c&&(a=q(a)?Math.min(a,f):f)});return a},nameToX:function(a){var f=y(this.categories),c=f?this.categories:this.names,d=a.options.x,p;a.series.requireSorting=!1;q(d)||(d=!1===this.options.uniqueNames?
a.series.autoIncrement():b(a.name,c));-1===d?f||(p=c.length):p=d;void 0!==p&&(this.names[p]=a.name);return p},updateNames:function(){var a=this;0<this.names.length&&(this.names.length=0,this.minRange=this.userMinRange,h(this.series||[],function(b){b.xIncrement=null;if(!b.points||b.isDirtyData)b.processData(),b.generatePoints();h(b.points,function(f,c){var t;f.options&&(t=a.nameToX(f),void 0!==t&&t!==f.x&&(f.x=t,b.xData[c]=t))})}))},setAxisTranslation:function(a){var b=this,f=b.max-b.min,c=b.axisPointRange||
0,d,p=0,e=0,l=b.linkedParent,r=!!b.categories,n=b.transA,w=b.isXAxis;if(w||r||c)d=b.getClosest(),l?(p=l.minPointOffset,e=l.pointRangePadding):h(b.series,function(a){var f=r?1:w?z(a.options.pointRange,d,0):b.axisPointRange||0;a=a.options.pointPlacement;c=Math.max(c,f);b.single||(p=Math.max(p,H(a)?0:f/2),e=Math.max(e,"on"===a?0:f))}),l=b.ordinalSlope&&d?b.ordinalSlope/d:1,b.minPointOffset=p*=l,b.pointRangePadding=e*=l,b.pointRange=Math.min(c,f),w&&(b.closestPointRange=d);a&&(b.oldTransA=n);b.translationSlope=
b.transA=n=b.options.staticScale||b.len/(f+e||1);b.transB=b.horiz?b.left:b.bottom;b.minPixelPadding=n*p},minFromRange:function(){return this.max-this.range},setTickInterval:function(b){var f=this,d=f.chart,p=f.options,e=f.isLog,l=f.log2lin,r=f.isDatetimeAxis,x=f.isXAxis,w=f.isLinked,y=p.maxPadding,E=p.minPadding,k=p.tickInterval,I=p.tickPixelInterval,m=f.categories,H=f.threshold,u=f.softThreshold,L,v,M,A;r||m||w||this.getTickAmount();M=z(f.userMin,p.min);A=z(f.userMax,p.max);w?(f.linkedParent=d[f.coll][p.linkedTo],
d=f.linkedParent.getExtremes(),f.min=z(d.min,d.dataMin),f.max=z(d.max,d.dataMax),p.type!==f.linkedParent.options.type&&a.error(11,1)):(!u&&q(H)&&(f.dataMin>=H?(L=H,E=0):f.dataMax<=H&&(v=H,y=0)),f.min=z(M,L,f.dataMin),f.max=z(A,v,f.dataMax));e&&(f.positiveValuesOnly&&!b&&0>=Math.min(f.min,z(f.dataMin,f.min))&&a.error(10,1),f.min=g(l(f.min),15),f.max=g(l(f.max),15));f.range&&q(f.max)&&(f.userMin=f.min=M=Math.max(f.min,f.minFromRange()),f.userMax=A=f.max,f.range=null);n(f,"foundExtremes");f.beforePadding&&
f.beforePadding();f.adjustForMinRange();!(m||f.axisPointRange||f.usePercentage||w)&&q(f.min)&&q(f.max)&&(l=f.max-f.min)&&(!q(M)&&E&&(f.min-=l*E),!q(A)&&y&&(f.max+=l*y));D(p.softMin)&&(f.min=Math.min(f.min,p.softMin));D(p.softMax)&&(f.max=Math.max(f.max,p.softMax));D(p.floor)&&(f.min=Math.max(f.min,p.floor));D(p.ceiling)&&(f.max=Math.min(f.max,p.ceiling));u&&q(f.dataMin)&&(H=H||0,!q(M)&&f.min<H&&f.dataMin>=H?f.min=H:!q(A)&&f.max>H&&f.dataMax<=H&&(f.max=H));f.tickInterval=f.min===f.max||void 0===f.min||
void 0===f.max?1:w&&!k&&I===f.linkedParent.options.tickPixelInterval?k=f.linkedParent.tickInterval:z(k,this.tickAmount?(f.max-f.min)/Math.max(this.tickAmount-1,1):void 0,m?1:(f.max-f.min)*I/Math.max(f.len,I));x&&!b&&h(f.series,function(a){a.processData(f.min!==f.oldMin||f.max!==f.oldMax)});f.setAxisTranslation(!0);f.beforeSetTickPositions&&f.beforeSetTickPositions();f.postProcessTickInterval&&(f.tickInterval=f.postProcessTickInterval(f.tickInterval));f.pointRange&&!k&&(f.tickInterval=Math.max(f.pointRange,
f.tickInterval));b=z(p.minTickInterval,f.isDatetimeAxis&&f.closestPointRange);!k&&f.tickInterval<b&&(f.tickInterval=b);r||e||k||(f.tickInterval=B(f.tickInterval,null,c(f.tickInterval),z(p.allowDecimals,!(.5<f.tickInterval&&5>f.tickInterval&&1E3<f.max&&9999>f.max)),!!this.tickAmount));this.tickAmount||(f.tickInterval=f.unsquish());this.setTickPositions()},setTickPositions:function(){var a=this.options,b,c=a.tickPositions,d=a.tickPositioner,p=a.startOnTick,l=a.endOnTick;this.tickmarkOffset=this.categories&&
"between"===a.tickmarkPlacement&&1===this.tickInterval?.5:0;this.minorTickInterval="auto"===a.minorTickInterval&&this.tickInterval?this.tickInterval/5:a.minorTickInterval;this.single=this.min===this.max&&q(this.min)&&!this.tickAmount&&(parseInt(this.min,10)===this.min||!1!==a.allowDecimals);this.tickPositions=b=c&&c.slice();!b&&(b=this.isDatetimeAxis?this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval,a.units),this.min,this.max,a.startOfWeek,this.ordinalPositions,this.closestPointRange,
!0):this.isLog?this.getLogTickPositions(this.tickInterval,this.min,this.max):this.getLinearTickPositions(this.tickInterval,this.min,this.max),b.length>this.len&&(b=[b[0],b.pop()]),this.tickPositions=b,d&&(d=d.apply(this,[this.min,this.max])))&&(this.tickPositions=b=d);this.paddedTicks=b.slice(0);this.trimTicks(b,p,l);this.isLinked||(this.single&&(this.min-=.5,this.max+=.5),c||d||this.adjustTickAmount())},trimTicks:function(a,b,c){var f=a[0],d=a[a.length-1],p=this.minPointOffset||0;if(!this.isLinked){if(b&&
-Infinity!==f)this.min=f;else for(;this.min-p>a[0];)a.shift();if(c)this.max=d;else for(;this.max+p<a[a.length-1];)a.pop();0===a.length&&q(f)&&a.push((d+f)/2)}},alignToOthers:function(){var a={},b,c=this.options;!1===this.chart.options.chart.alignTicks||!1===c.alignTicks||this.isLog||h(this.chart[this.coll],function(f){var c=f.options,c=[f.horiz?c.left:c.top,c.width,c.height,c.pane].join();f.series.length&&(a[c]?b=!0:a[c]=1)});return b},getTickAmount:function(){var a=this.options,b=a.tickAmount,c=
a.tickPixelInterval;!q(a.tickInterval)&&this.len<c&&!this.isRadial&&!this.isLog&&a.startOnTick&&a.endOnTick&&(b=2);!b&&this.alignToOthers()&&(b=Math.ceil(this.len/c)+1);4>b&&(this.finalTickAmt=b,b=5);this.tickAmount=b},adjustTickAmount:function(){var a=this.tickInterval,b=this.tickPositions,c=this.tickAmount,d=this.finalTickAmt,p=b&&b.length;if(p<c){for(;b.length<c;)b.push(g(b[b.length-1]+a));this.transA*=(p-1)/(c-1);this.max=b[b.length-1]}else p>c&&(this.tickInterval*=2,this.setTickPositions());
if(q(d)){for(a=c=b.length;a--;)(3===d&&1===a%2||2>=d&&0<a&&a<c-1)&&b.splice(a,1);this.finalTickAmt=void 0}},setScale:function(){var a,b;this.oldMin=this.min;this.oldMax=this.max;this.oldAxisLength=this.len;this.setAxisSize();b=this.len!==this.oldAxisLength;h(this.series,function(b){if(b.isDirtyData||b.isDirty||b.xAxis.isDirty)a=!0});b||a||this.isLinked||this.forceRedraw||this.userMin!==this.oldUserMin||this.userMax!==this.oldUserMax||this.alignToOthers()?(this.resetStacks&&this.resetStacks(),this.forceRedraw=
!1,this.getSeriesExtremes(),this.setTickInterval(),this.oldUserMin=this.userMin,this.oldUserMax=this.userMax,this.isDirty||(this.isDirty=b||this.min!==this.oldMin||this.max!==this.oldMax)):this.cleanStacks&&this.cleanStacks()},setExtremes:function(a,b,c,d,p){var f=this,l=f.chart;c=z(c,!0);h(f.series,function(a){delete a.kdTree});p=e(p,{min:a,max:b});n(f,"setExtremes",p,function(){f.userMin=a;f.userMax=b;f.eventArgs=p;c&&l.redraw(d)})},zoom:function(a,b){var f=this.dataMin,c=this.dataMax,d=this.options,
p=Math.min(f,z(d.min,f)),d=Math.max(c,z(d.max,c));if(a!==this.min||b!==this.max)this.allowZoomOutside||(q(f)&&(a<p&&(a=p),a>d&&(a=d)),q(c)&&(b<p&&(b=p),b>d&&(b=d))),this.displayBtn=void 0!==a||void 0!==b,this.setExtremes(a,b,!1,void 0,{trigger:"zoom"});return!0},setAxisSize:function(){var a=this.chart,b=this.options,c=b.offsets||[0,0,0,0],d=this.horiz,p=z(b.width,a.plotWidth-c[3]+c[1]),l=z(b.height,a.plotHeight-c[0]+c[2]),e=z(b.top,a.plotTop+c[0]),b=z(b.left,a.plotLeft+c[3]),c=/%$/;c.test(l)&&(l=
Math.round(parseFloat(l)/100*a.plotHeight));c.test(e)&&(e=Math.round(parseFloat(e)/100*a.plotHeight+a.plotTop));this.left=b;this.top=e;this.width=p;this.height=l;this.bottom=a.chartHeight-l-e;this.right=a.chartWidth-p-b;this.len=Math.max(d?p:l,0);this.pos=d?b:e},getExtremes:function(){var a=this.isLog,b=this.lin2log;return{min:a?g(b(this.min)):this.min,max:a?g(b(this.max)):this.max,dataMin:this.dataMin,dataMax:this.dataMax,userMin:this.userMin,userMax:this.userMax}},getThreshold:function(a){var b=
this.isLog,f=this.lin2log,c=b?f(this.min):this.min,b=b?f(this.max):this.max;null===a?a=c:c>a?a=c:b<a&&(a=b);return this.translate(a,0,1,0,1)},autoLabelAlign:function(a){a=(z(a,0)-90*this.side+720)%360;return 15<a&&165>a?"right":195<a&&345>a?"left":"center"},tickSize:function(a){var b=this.options,f=b[a+"Length"],c=z(b[a+"Width"],"tick"===a&&this.isXAxis?1:0);if(c&&f)return"inside"===b[a+"Position"]&&(f=-f),[f,c]},labelMetrics:function(){var a=this.tickPositions&&this.tickPositions[0]||0;return this.chart.renderer.fontMetrics(this.options.labels.style&&
this.options.labels.style.fontSize,this.ticks[a]&&this.ticks[a].label)},unsquish:function(){var a=this.options.labels,b=this.horiz,c=this.tickInterval,d=c,p=this.len/(((this.categories?1:0)+this.max-this.min)/c),l,e=a.rotation,r=this.labelMetrics(),n,w=Number.MAX_VALUE,g,y=function(a){a/=p||1;a=1<a?Math.ceil(a):1;return a*c};b?(g=!a.staggerLines&&!a.step&&(q(e)?[e]:p<z(a.autoRotationLimit,80)&&a.autoRotation))&&h(g,function(a){var b;if(a===e||a&&-90<=a&&90>=a)n=y(Math.abs(r.h/Math.sin(v*a))),b=n+
Math.abs(a/360),b<w&&(w=b,l=a,d=n)}):a.step||(d=y(r.h));this.autoRotation=g;this.labelRotation=z(l,e);return d},getSlotWidth:function(){var a=this.chart,b=this.horiz,c=this.options.labels,d=Math.max(this.tickPositions.length-(this.categories?0:1),1),p=a.margin[3];return b&&2>(c.step||0)&&!c.rotation&&(this.staggerLines||1)*this.len/d||!b&&(p&&p-a.spacing[3]||.33*a.chartWidth)},renderUnsquish:function(){var a=this.chart,b=a.renderer,c=this.tickPositions,d=this.ticks,p=this.options.labels,e=this.horiz,
r=this.getSlotWidth(),x=Math.max(1,Math.round(r-2*(p.padding||5))),n={},w=this.labelMetrics(),g=p.style&&p.style.textOverflow,y,E=0,k,I;H(p.rotation)||(n.rotation=p.rotation||0);h(c,function(a){(a=d[a])&&a.labelLength>E&&(E=a.labelLength)});this.maxLabelLength=E;if(this.autoRotation)E>x&&E>w.h?n.rotation=this.labelRotation:this.labelRotation=0;else if(r&&(y={width:x+"px"},!g))for(y.textOverflow="clip",k=c.length;!e&&k--;)if(I=c[k],x=d[I].label)x.styles&&"ellipsis"===x.styles.textOverflow?x.css({textOverflow:"clip"}):
d[I].labelLength>r&&x.css({width:r+"px"}),x.getBBox().height>this.len/c.length-(w.h-w.f)&&(x.specCss={textOverflow:"ellipsis"});n.rotation&&(y={width:(E>.5*a.chartHeight?.33*a.chartHeight:a.chartHeight)+"px"},g||(y.textOverflow="ellipsis"));if(this.labelAlign=p.align||this.autoLabelAlign(this.labelRotation))n.align=this.labelAlign;h(c,function(a){var b=(a=d[a])&&a.label;b&&(b.attr(n),y&&b.css(l(y,b.specCss)),delete b.specCss,a.rotation=n.rotation)});this.tickRotCorr=b.rotCorr(w.b,this.labelRotation||
0,0!==this.side)},hasData:function(){return this.hasVisibleSeries||q(this.min)&&q(this.max)&&!!this.tickPositions},addTitle:function(a){var b=this.chart.renderer,f=this.horiz,c=this.opposite,d=this.options.title,p;this.axisTitle||((p=d.textAlign)||(p=(f?{low:"left",middle:"center",high:"right"}:{low:c?"right":"left",middle:"center",high:c?"left":"right"})[d.align]),this.axisTitle=b.text(d.text,0,0,d.useHTML).attr({zIndex:7,rotation:d.rotation||0,align:p}).addClass("highcharts-axis-title").css(d.style).add(this.axisGroup),
this.axisTitle.isNew=!0);this.axisTitle[a?"show":"hide"](!0)},generateTick:function(a){var b=this.ticks;b[a]?b[a].addLabel():b[a]=new I(this,a)},getOffset:function(){var a=this,b=a.chart,c=b.renderer,d=a.options,p=a.tickPositions,l=a.ticks,e=a.horiz,x=a.side,n=b.inverted&&!a.isZAxis?[1,0,3,2][x]:x,w,g,y=0,E,k=0,I=d.title,D=d.labels,m=0,B=b.axisOffset,b=b.clipOffset,H=[-1,1,1,-1][x],u=d.className,L=a.axisParent,v=this.tickSize("tick");w=a.hasData();a.showAxis=g=w||z(d.showEmpty,!0);a.staggerLines=
a.horiz&&D.staggerLines;a.axisGroup||(a.gridGroup=c.g("grid").attr({zIndex:d.gridZIndex||1}).addClass("highcharts-"+this.coll.toLowerCase()+"-grid "+(u||"")).add(L),a.axisGroup=c.g("axis").attr({zIndex:d.zIndex||2}).addClass("highcharts-"+this.coll.toLowerCase()+" "+(u||"")).add(L),a.labelGroup=c.g("axis-labels").attr({zIndex:D.zIndex||7}).addClass("highcharts-"+a.coll.toLowerCase()+"-labels "+(u||"")).add(L));w||a.isLinked?(h(p,function(b,c){a.generateTick(b,c)}),a.renderUnsquish(),!1===D.reserveSpace||
0!==x&&2!==x&&{1:"left",3:"right"}[x]!==a.labelAlign&&"center"!==a.labelAlign||h(p,function(a){m=Math.max(l[a].getLabelSize(),m)}),a.staggerLines&&(m*=a.staggerLines,a.labelOffset=m*(a.opposite?-1:1))):r(l,function(a,b){a.destroy();delete l[b]});I&&I.text&&!1!==I.enabled&&(a.addTitle(g),g&&!1!==I.reserveSpace&&(a.titleOffset=y=a.axisTitle.getBBox()[e?"height":"width"],E=I.offset,k=q(E)?0:z(I.margin,e?5:10)));a.renderLine();a.offset=H*z(d.offset,B[x]);a.tickRotCorr=a.tickRotCorr||{x:0,y:0};c=0===x?
-a.labelMetrics().h:2===x?a.tickRotCorr.y:0;k=Math.abs(m)+k;m&&(k=k-c+H*(e?z(D.y,a.tickRotCorr.y+8*H):D.x));a.axisTitleMargin=z(E,k);B[x]=Math.max(B[x],a.axisTitleMargin+y+H*a.offset,k,w&&p.length&&v?v[0]+H*a.offset:0);p=2*Math.floor(a.axisLine.strokeWidth()/2);0<d.offset&&(p-=2*d.offset);b[n]=Math.max(b[n]||p,p)},getLinePath:function(a){var b=this.chart,c=this.opposite,f=this.offset,d=this.horiz,p=this.left+(c?this.width:0)+f,f=b.chartHeight-this.bottom-(c?this.height:0)+f;c&&(a*=-1);return b.renderer.crispLine(["M",
d?this.left:p,d?f:this.top,"L",d?b.chartWidth-this.right:p,d?f:b.chartHeight-this.bottom],a)},renderLine:function(){this.axisLine||(this.axisLine=this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),this.axisLine.attr({stroke:this.options.lineColor,"stroke-width":this.options.lineWidth,zIndex:7}))},getTitlePosition:function(){var a=this.horiz,b=this.left,c=this.top,d=this.len,p=this.options.title,l=a?b:c,e=this.opposite,r=this.offset,h=p.x||0,n=p.y||0,w=this.chart.renderer.fontMetrics(p.style&&
p.style.fontSize,this.axisTitle).f,d={low:l+(a?0:d),middle:l+d/2,high:l+(a?d:0)}[p.align],b=(a?c+this.height:b)+(a?1:-1)*(e?-1:1)*this.axisTitleMargin+(2===this.side?w:0);return{x:a?d+h:b+(e?this.width:0)+r+h,y:a?b+n-(e?this.height:0)+r:d+n}},renderMinorTick:function(a){var b=this.chart.hasRendered&&D(this.oldMin),c=this.minorTicks;c[a]||(c[a]=new I(this,a,"minor"));b&&c[a].isNew&&c[a].render(null,!0);c[a].render(null,!1,1)},renderTick:function(a,b){var c=this.isLinked,f=this.ticks,d=this.chart.hasRendered&&
D(this.oldMin);if(!c||a>=this.min&&a<=this.max)f[a]||(f[a]=new I(this,a)),d&&f[a].isNew&&f[a].render(b,!0,.1),f[a].render(b)},render:function(){var b=this,c=b.chart,d=b.options,p=b.isLog,l=b.lin2log,e=b.isLinked,n=b.tickPositions,x=b.axisTitle,w=b.ticks,g=b.minorTicks,y=b.alternateBands,k=d.stackLabels,m=d.alternateGridColor,q=b.tickmarkOffset,z=b.axisLine,B=b.showAxis,H=A(c.renderer.globalAnimation),u,L;b.labelEdge.length=0;b.overlap=!1;h([w,g,y],function(a){r(a,function(a){a.isActive=!1})});if(b.hasData()||
e)b.minorTickInterval&&!b.categories&&h(b.getMinorTickPositions(),function(a){b.renderMinorTick(a)}),n.length&&(h(n,function(a,c){b.renderTick(a,c)}),q&&(0===b.min||b.single)&&(w[-1]||(w[-1]=new I(b,-1,null,!0)),w[-1].render(-1))),m&&h(n,function(f,d){L=void 0!==n[d+1]?n[d+1]+q:b.max-q;0===d%2&&f<b.max&&L<=b.max+(c.polar?-q:q)&&(y[f]||(y[f]=new a.PlotLineOrBand(b)),u=f+q,y[f].options={from:p?l(u):u,to:p?l(L):L,color:m},y[f].render(),y[f].isActive=!0)}),b._addedPlotLB||(h((d.plotLines||[]).concat(d.plotBands||
[]),function(a){b.addPlotBandOrLine(a)}),b._addedPlotLB=!0);h([w,g,y],function(a){var b,f=[],d=H.duration;r(a,function(a,b){a.isActive||(a.render(b,!1,0),a.isActive=!1,f.push(b))});E(function(){for(b=f.length;b--;)a[f[b]]&&!a[f[b]].isActive&&(a[f[b]].destroy(),delete a[f[b]])},a!==y&&c.hasRendered&&d?d:0)});z&&(z[z.isPlaced?"animate":"attr"]({d:this.getLinePath(z.strokeWidth())}),z.isPlaced=!0,z[B?"show":"hide"](!0));x&&B&&(d=b.getTitlePosition(),D(d.y)?(x[x.isNew?"attr":"animate"](d),x.isNew=!1):
(x.attr("y",-9999),x.isNew=!0));k&&k.enabled&&b.renderStackTotals();b.isDirty=!1},redraw:function(){this.visible&&(this.render(),h(this.plotLinesAndBands,function(a){a.render()}));h(this.series,function(a){a.isDirty=!0})},keepProps:"extKey hcEvents names series userMax userMin".split(" "),destroy:function(a){var c=this,f=c.stacks,d=c.plotLinesAndBands,p;a||M(c);r(f,function(a,b){u(a);f[b]=null});h([c.ticks,c.minorTicks,c.alternateBands],function(a){u(a)});if(d)for(a=d.length;a--;)d[a].destroy();h("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "),
function(a){c[a]&&(c[a]=c[a].destroy())});for(p in c.plotLinesAndBandsGroups)c.plotLinesAndBandsGroups[p]=c.plotLinesAndBandsGroups[p].destroy();r(c,function(a,f){-1===b(f,c.keepProps)&&delete c[f]})},drawCrosshair:function(a,b){var c,f=this.crosshair,d=z(f.snap,!0),p,l=this.cross;a||(a=this.cross&&this.cross.e);this.crosshair&&!1!==(q(b)||!d)?(d?q(b)&&(p=this.isXAxis?b.plotX:this.len-b.plotY):p=a&&(this.horiz?a.chartX-this.pos:this.len-a.chartY+this.pos),q(p)&&(c=this.getPlotLinePath(b&&(this.isXAxis?
b.x:z(b.stackY,b.y)),null,null,null,p)||null),q(c)?(b=this.categories&&!this.isRadial,l||(this.cross=l=this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-"+(b?"category ":"thin ")+f.className).attr({zIndex:z(f.zIndex,2)}).add(),l.attr({stroke:f.color||(b?m("#ccd6eb").setOpacity(.25).get():"#cccccc"),"stroke-width":z(f.width,1)}),f.dashStyle&&l.attr({dashstyle:f.dashStyle})),l.show().attr({d:c}),b&&!f.width&&l.attr({"stroke-width":this.transA}),this.cross.e=a):this.hideCrosshair()):
this.hideCrosshair()},hideCrosshair:function(){this.cross&&this.cross.hide()}});return a.Axis=L}(K);(function(a){var C=a.Axis,A=a.Date,G=a.dateFormat,F=a.defaultOptions,m=a.defined,g=a.each,k=a.extend,q=a.getMagnitude,v=a.getTZOffset,u=a.normalizeTickInterval,h=a.pick,e=a.timeUnits;C.prototype.getTimeTicks=function(a,d,c,w){var b=[],n={},D=F.global.useUTC,q,l=new A(d-Math.max(v(d),v(c))),B=A.hcMakeTime,r=a.unitRange,z=a.count,u;if(m(d)){l[A.hcSetMilliseconds](r>=e.second?0:z*Math.floor(l.getMilliseconds()/
z));if(r>=e.second)l[A.hcSetSeconds](r>=e.minute?0:z*Math.floor(l.getSeconds()/z));if(r>=e.minute)l[A.hcSetMinutes](r>=e.hour?0:z*Math.floor(l[A.hcGetMinutes]()/z));if(r>=e.hour)l[A.hcSetHours](r>=e.day?0:z*Math.floor(l[A.hcGetHours]()/z));if(r>=e.day)l[A.hcSetDate](r>=e.month?1:z*Math.floor(l[A.hcGetDate]()/z));r>=e.month&&(l[A.hcSetMonth](r>=e.year?0:z*Math.floor(l[A.hcGetMonth]()/z)),q=l[A.hcGetFullYear]());if(r>=e.year)l[A.hcSetFullYear](q-q%z);if(r===e.week)l[A.hcSetDate](l[A.hcGetDate]()-l[A.hcGetDay]()+
h(w,1));q=l[A.hcGetFullYear]();w=l[A.hcGetMonth]();var p=l[A.hcGetDate](),E=l[A.hcGetHours]();if(A.hcTimezoneOffset||A.hcGetTimezoneOffset)u=(!D||!!A.hcGetTimezoneOffset)&&(c-d>4*e.month||v(d)!==v(c)),l=l.getTime(),l=new A(l+v(l));D=l.getTime();for(d=1;D<c;)b.push(D),D=r===e.year?B(q+d*z,0):r===e.month?B(q,w+d*z):!u||r!==e.day&&r!==e.week?u&&r===e.hour?B(q,w,p,E+d*z):D+r*z:B(q,w,p+d*z*(r===e.day?1:7)),d++;b.push(D);r<=e.hour&&1E4>b.length&&g(b,function(a){0===a%18E5&&"000000000"===G("%H%M%S%L",a)&&
(n[a]="day")})}b.info=k(a,{higherRanks:n,totalRange:r*z});return b};C.prototype.normalizeTimeTickInterval=function(a,d){var c=d||[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",[1,2]],["week",[1,2]],["month",[1,2,3,4,6]],["year",null]];d=c[c.length-1];var h=e[d[0]],b=d[1],n;for(n=0;n<c.length&&!(d=c[n],h=e[d[0]],b=d[1],c[n+1]&&a<=(h*b[b.length-1]+e[c[n+1][0]])/2);n++);h===e.year&&a<5*h&&(b=[1,2,5]);a=u(a/h,b,
"year"===d[0]?Math.max(q(a/h),1):1);return{unitRange:h,count:a,unitName:d[0]}}})(K);(function(a){var C=a.Axis,A=a.getMagnitude,G=a.map,F=a.normalizeTickInterval,m=a.pick;C.prototype.getLogTickPositions=function(a,k,q,v){var g=this.options,h=this.len,e=this.lin2log,n=this.log2lin,d=[];v||(this._minorAutoInterval=null);if(.5<=a)a=Math.round(a),d=this.getLinearTickPositions(a,k,q);else if(.08<=a)for(var h=Math.floor(k),c,w,b,y,D,g=.3<a?[1,2,4]:.15<a?[1,2,4,6,8]:[1,2,3,4,5,6,7,8,9];h<q+1&&!D;h++)for(w=
g.length,c=0;c<w&&!D;c++)b=n(e(h)*g[c]),b>k&&(!v||y<=q)&&void 0!==y&&d.push(y),y>q&&(D=!0),y=b;else k=e(k),q=e(q),a=g[v?"minorTickInterval":"tickInterval"],a=m("auto"===a?null:a,this._minorAutoInterval,g.tickPixelInterval/(v?5:1)*(q-k)/((v?h/this.tickPositions.length:h)||1)),a=F(a,null,A(a)),d=G(this.getLinearTickPositions(a,k,q),n),v||(this._minorAutoInterval=a/5);v||(this.tickInterval=a);return d};C.prototype.log2lin=function(a){return Math.log(a)/Math.LN10};C.prototype.lin2log=function(a){return Math.pow(10,
a)}})(K);(function(a,C){var A=a.arrayMax,G=a.arrayMin,F=a.defined,m=a.destroyObjectProperties,g=a.each,k=a.erase,q=a.merge,v=a.pick;a.PlotLineOrBand=function(a,h){this.axis=a;h&&(this.options=h,this.id=h.id)};a.PlotLineOrBand.prototype={render:function(){var g=this,h=g.axis,e=h.horiz,n=g.options,d=n.label,c=g.label,w=n.to,b=n.from,y=n.value,k=F(b)&&F(w),m=F(y),l=g.svgElem,B=!l,r=[],z=n.color,M=v(n.zIndex,0),p=n.events,r={"class":"highcharts-plot-"+(k?"band ":"line ")+(n.className||"")},E={},I=h.chart.renderer,
L=k?"bands":"lines",f=h.log2lin;h.isLog&&(b=f(b),w=f(w),y=f(y));m?(r={stroke:z,"stroke-width":n.width},n.dashStyle&&(r.dashstyle=n.dashStyle)):k&&(z&&(r.fill=z),n.borderWidth&&(r.stroke=n.borderColor,r["stroke-width"]=n.borderWidth));E.zIndex=M;L+="-"+M;(z=h.plotLinesAndBandsGroups[L])||(h.plotLinesAndBandsGroups[L]=z=I.g("plot-"+L).attr(E).add());B&&(g.svgElem=l=I.path().attr(r).add(z));if(m)r=h.getPlotLinePath(y,l.strokeWidth());else if(k)r=h.getPlotBandPath(b,w,n);else return;B&&r&&r.length?(l.attr({d:r}),
p&&a.objectEach(p,function(a,b){l.on(b,function(a){p[b].apply(g,[a])})})):l&&(r?(l.show(),l.animate({d:r})):(l.hide(),c&&(g.label=c=c.destroy())));d&&F(d.text)&&r&&r.length&&0<h.width&&0<h.height&&!r.flat?(d=q({align:e&&k&&"center",x:e?!k&&4:10,verticalAlign:!e&&k&&"middle",y:e?k?16:10:k?6:-4,rotation:e&&!k&&90},d),this.renderLabel(d,r,k,M)):c&&c.hide();return g},renderLabel:function(a,h,e,n){var d=this.label,c=this.axis.chart.renderer;d||(d={align:a.textAlign||a.align,rotation:a.rotation,"class":"highcharts-plot-"+
(e?"band":"line")+"-label "+(a.className||"")},d.zIndex=n,this.label=d=c.text(a.text,0,0,a.useHTML).attr(d).add(),d.css(a.style));n=[h[1],h[4],e?h[6]:h[1]];h=[h[2],h[5],e?h[7]:h[2]];e=G(n);c=G(h);d.align(a,!1,{x:e,y:c,width:A(n)-e,height:A(h)-c});d.show()},destroy:function(){k(this.axis.plotLinesAndBands,this);delete this.axis;m(this)}};a.extend(C.prototype,{getPlotBandPath:function(a,h){var e=this.getPlotLinePath(h,null,null,!0),n=this.getPlotLinePath(a,null,null,!0),d=this.horiz,c=1;a=a<this.min&&
h<this.min||a>this.max&&h>this.max;n&&e?(a&&(n.flat=n.toString()===e.toString(),c=0),n.push(d&&e[4]===n[4]?e[4]+c:e[4],d||e[5]!==n[5]?e[5]:e[5]+c,d&&e[1]===n[1]?e[1]+c:e[1],d||e[2]!==n[2]?e[2]:e[2]+c)):n=null;return n},addPlotBand:function(a){return this.addPlotBandOrLine(a,"plotBands")},addPlotLine:function(a){return this.addPlotBandOrLine(a,"plotLines")},addPlotBandOrLine:function(g,h){var e=(new a.PlotLineOrBand(this,g)).render(),n=this.userOptions;e&&(h&&(n[h]=n[h]||[],n[h].push(g)),this.plotLinesAndBands.push(e));
return e},removePlotBandOrLine:function(a){for(var h=this.plotLinesAndBands,e=this.options,n=this.userOptions,d=h.length;d--;)h[d].id===a&&h[d].destroy();g([e.plotLines||[],n.plotLines||[],e.plotBands||[],n.plotBands||[]],function(c){for(d=c.length;d--;)c[d].id===a&&k(c,c[d])})},removePlotBand:function(a){this.removePlotBandOrLine(a)},removePlotLine:function(a){this.removePlotBandOrLine(a)}})})(K,S);(function(a){var C=a.dateFormat,A=a.each,G=a.extend,F=a.format,m=a.isNumber,g=a.map,k=a.merge,q=a.pick,
v=a.splat,u=a.syncTimeout,h=a.timeUnits;a.Tooltip=function(){this.init.apply(this,arguments)};a.Tooltip.prototype={init:function(a,h){this.chart=a;this.options=h;this.crosshairs=[];this.now={x:0,y:0};this.isHidden=!0;this.split=h.split&&!a.inverted;this.shared=h.shared||this.split},cleanSplit:function(a){A(this.chart.series,function(e){var d=e&&e.tt;d&&(!d.isActive||a?e.tt=d.destroy():d.isActive=!1)})},getLabel:function(){var a=this.chart.renderer,h=this.options;this.label||(this.split?this.label=
a.g("tooltip"):(this.label=a.label("",0,0,h.shape||"callout",null,null,h.useHTML,null,"tooltip").attr({padding:h.padding,r:h.borderRadius}),this.label.attr({fill:h.backgroundColor,"stroke-width":h.borderWidth}).css(h.style).shadow(h.shadow)),this.label.attr({zIndex:8}).add());return this.label},update:function(a){this.destroy();k(!0,this.chart.options.tooltip.userOptions,a);this.init(this.chart,k(!0,this.options,a))},destroy:function(){this.label&&(this.label=this.label.destroy());this.split&&this.tt&&
(this.cleanSplit(this.chart,!0),this.tt=this.tt.destroy());clearTimeout(this.hideTimer);clearTimeout(this.tooltipTimeout)},move:function(a,h,d,c){var e=this,b=e.now,n=!1!==e.options.animation&&!e.isHidden&&(1<Math.abs(a-b.x)||1<Math.abs(h-b.y)),g=e.followPointer||1<e.len;G(b,{x:n?(2*b.x+a)/3:a,y:n?(b.y+h)/2:h,anchorX:g?void 0:n?(2*b.anchorX+d)/3:d,anchorY:g?void 0:n?(b.anchorY+c)/2:c});e.getLabel().attr(b);n&&(clearTimeout(this.tooltipTimeout),this.tooltipTimeout=setTimeout(function(){e&&e.move(a,
h,d,c)},32))},hide:function(a){var e=this;clearTimeout(this.hideTimer);a=q(a,this.options.hideDelay,500);this.isHidden||(this.hideTimer=u(function(){e.getLabel()[a?"fadeOut":"hide"]();e.isHidden=!0},a))},getAnchor:function(a,h){var d,c=this.chart,e=c.inverted,b=c.plotTop,n=c.plotLeft,k=0,m=0,l,q;a=v(a);d=a[0].tooltipPos;this.followPointer&&h&&(void 0===h.chartX&&(h=c.pointer.normalize(h)),d=[h.chartX-c.plotLeft,h.chartY-b]);d||(A(a,function(a){l=a.series.yAxis;q=a.series.xAxis;k+=a.plotX+(!e&&q?q.left-
n:0);m+=(a.plotLow?(a.plotLow+a.plotHigh)/2:a.plotY)+(!e&&l?l.top-b:0)}),k/=a.length,m/=a.length,d=[e?c.plotWidth-m:k,this.shared&&!e&&1<a.length&&h?h.chartY-b:e?c.plotHeight-k:m]);return g(d,Math.round)},getPosition:function(a,h,d){var c=this.chart,e=this.distance,b={},n=d.h||0,g,k=["y",c.chartHeight,h,d.plotY+c.plotTop,c.plotTop,c.plotTop+c.plotHeight],l=["x",c.chartWidth,a,d.plotX+c.plotLeft,c.plotLeft,c.plotLeft+c.plotWidth],m=!this.followPointer&&q(d.ttBelow,!c.inverted===!!d.negative),r=function(a,
c,d,f,p,l){var h=d<f-e,r=f+e+d<c,g=f-e-d;f+=e;if(m&&r)b[a]=f;else if(!m&&h)b[a]=g;else if(h)b[a]=Math.min(l-d,0>g-n?g:g-n);else if(r)b[a]=Math.max(p,f+n+d>c?f:f+n);else return!1},z=function(a,c,d,f){var p;f<e||f>c-e?p=!1:b[a]=f<d/2?1:f>c-d/2?c-d-2:f-d/2;return p},v=function(a){var b=k;k=l;l=b;g=a},p=function(){!1!==r.apply(0,k)?!1!==z.apply(0,l)||g||(v(!0),p()):g?b.x=b.y=0:(v(!0),p())};(c.inverted||1<this.len)&&v();p();return b},defaultFormatter:function(a){var e=this.points||v(this),d;d=[a.tooltipFooterHeaderFormatter(e[0])];
d=d.concat(a.bodyFormatter(e));d.push(a.tooltipFooterHeaderFormatter(e[0],!0));return d},refresh:function(a,h){var d,c=this.options,e,b=a,g,n={},k=[];d=c.formatter||this.defaultFormatter;var n=this.shared,l;clearTimeout(this.hideTimer);this.followPointer=v(b)[0].series.tooltipOptions.followPointer;g=this.getAnchor(b,h);h=g[0];e=g[1];!n||b.series&&b.series.noSharedTooltip?n=b.getLabelConfig():(A(b,function(a){a.setState("hover");k.push(a.getLabelConfig())}),n={x:b[0].category,y:b[0].y},n.points=k,
b=b[0]);this.len=k.length;n=d.call(n,this);l=b.series;this.distance=q(l.tooltipOptions.distance,16);!1===n?this.hide():(d=this.getLabel(),this.isHidden&&d.attr({opacity:1}).show(),this.split?this.renderSplit(n,a):(c.style.width||d.css({width:this.chart.spacingBox.width}),d.attr({text:n&&n.join?n.join(""):n}),d.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-"+q(b.colorIndex,l.colorIndex)),d.attr({stroke:c.borderColor||b.color||l.color||"#666666"}),this.updatePosition({plotX:h,plotY:e,
negative:b.negative,ttBelow:b.ttBelow,h:g[2]||0})),this.isHidden=!1)},renderSplit:function(e,h){var d=this,c=[],g=this.chart,b=g.renderer,n=!0,k=this.options,m,l=this.getLabel();A(e.slice(0,h.length+1),function(a,e){e=h[e-1]||{isHeader:!0,plotX:h[0].plotX};var r=e.series||d,w=r.tt,p=e.series||{},y="highcharts-color-"+q(e.colorIndex,p.colorIndex,"none");w||(r.tt=w=b.label(null,null,null,"callout").addClass("highcharts-tooltip-box "+y).attr({padding:k.padding,r:k.borderRadius,fill:k.backgroundColor,
stroke:e.color||p.color||"#333333","stroke-width":k.borderWidth}).add(l));w.isActive=!0;w.attr({text:a});w.css(k.style);a=w.getBBox();p=a.width+w.strokeWidth();e.isHeader?(m=a.height,p=Math.max(0,Math.min(e.plotX+g.plotLeft-p/2,g.chartWidth-p))):p=e.plotX+g.plotLeft-q(k.distance,16)-p;0>p&&(n=!1);a=(e.series&&e.series.yAxis&&e.series.yAxis.pos)+(e.plotY||0);a-=g.plotTop;c.push({target:e.isHeader?g.plotHeight+m:a,rank:e.isHeader?1:0,size:r.tt.getBBox().height+1,point:e,x:p,tt:w})});this.cleanSplit();
a.distribute(c,g.plotHeight+m);A(c,function(a){var b=a.point,c=b.series;a.tt.attr({visibility:void 0===a.pos?"hidden":"inherit",x:n||b.isHeader?a.x:b.plotX+g.plotLeft+q(k.distance,16),y:a.pos+g.plotTop,anchorX:b.isHeader?b.plotX+g.plotLeft:b.plotX+c.xAxis.pos,anchorY:b.isHeader?a.pos+g.plotTop-15:b.plotY+c.yAxis.pos})})},updatePosition:function(a){var e=this.chart,d=this.getLabel(),d=(this.options.positioner||this.getPosition).call(this,d.width,d.height,a);this.move(Math.round(d.x),Math.round(d.y||
0),a.plotX+e.plotLeft,a.plotY+e.plotTop)},getDateFormat:function(a,g,d,c){var e=C("%m-%d %H:%M:%S.%L",g),b,n,k={millisecond:15,second:12,minute:9,hour:6,day:3},m="millisecond";for(n in h){if(a===h.week&&+C("%w",g)===d&&"00:00:00.000"===e.substr(6)){n="week";break}if(h[n]>a){n=m;break}if(k[n]&&e.substr(k[n])!=="01-01 00:00:00.000".substr(k[n]))break;"week"!==n&&(m=n)}n&&(b=c[n]);return b},getXDateFormat:function(a,h,d){h=h.dateTimeLabelFormats;var c=d&&d.closestPointRange;return(c?this.getDateFormat(c,
a.x,d.options.startOfWeek,h):h.day)||h.year},tooltipFooterHeaderFormatter:function(a,h){var d=h?"footer":"header";h=a.series;var c=h.tooltipOptions,e=c.xDateFormat,b=h.xAxis,g=b&&"datetime"===b.options.type&&m(a.key),d=c[d+"Format"];g&&!e&&(e=this.getXDateFormat(a,c,b));g&&e&&(d=d.replace("{point.key}","{point.key:"+e+"}"));return F(d,{point:a,series:h})},bodyFormatter:function(a){return g(a,function(a){var d=a.series.tooltipOptions;return(d.pointFormatter||a.point.tooltipFormatter).call(a.point,
d.pointFormat)})}}})(K);(function(a){var C=a.addEvent,A=a.attr,G=a.charts,F=a.color,m=a.css,g=a.defined,k=a.doc,q=a.each,v=a.extend,u=a.fireEvent,h=a.offset,e=a.pick,n=a.removeEvent,d=a.splat,c=a.Tooltip,w=a.win;a.Pointer=function(a,c){this.init(a,c)};a.Pointer.prototype={init:function(a,d){this.options=d;this.chart=a;this.runChartClick=d.chart.events&&!!d.chart.events.click;this.pinchDown=[];this.lastValidTouch={};c&&d.tooltip.enabled&&(a.tooltip=new c(a,d.tooltip),this.followTouchMove=e(d.tooltip.followTouchMove,
!0));this.setDOMEvents()},zoomOption:function(a){var b=this.chart,c=b.options.chart,d=c.zoomType||"",b=b.inverted;/touch/.test(a.type)&&(d=e(c.pinchType,d));this.zoomX=a=/x/.test(d);this.zoomY=d=/y/.test(d);this.zoomHor=a&&!b||d&&b;this.zoomVert=d&&!b||a&&b;this.hasZoom=a||d},normalize:function(a,c){var b,d;a=a||w.event;a.target||(a.target=a.srcElement);d=a.touches?a.touches.length?a.touches.item(0):a.changedTouches[0]:a;c||(this.chartPosition=c=h(this.chart.container));void 0===d.pageX?(b=Math.max(a.x,
a.clientX-c.left),c=a.y):(b=d.pageX-c.left,c=d.pageY-c.top);return v(a,{chartX:Math.round(b),chartY:Math.round(c)})},getCoordinates:function(a){var b={xAxis:[],yAxis:[]};q(this.chart.axes,function(c){b[c.isXAxis?"xAxis":"yAxis"].push({axis:c,value:c.toValue(a[c.horiz?"chartX":"chartY"])})});return b},getKDPoints:function(a,c,d){var b=[],l,h,r;q(a,function(a){l=a.noSharedTooltip&&c;h=!c&&a.directTouch;a.visible&&!h&&e(a.options.enableMouseTracking,!0)&&(r=a.searchPoint(d,!l&&0>a.options.findNearestPointBy.indexOf("y")))&&
r.series&&b.push(r)});b.sort(function(a,b){var d=a.distX-b.distX,l=a.dist-b.dist,e=(b.series.group&&b.series.group.zIndex)-(a.series.group&&a.series.group.zIndex);return 0!==d&&c?d:0!==l?l:0!==e?e:a.series.index>b.series.index?-1:1});if(c&&b[0]&&!b[0].series.noSharedTooltip)for(a=b.length;a--;)(b[a].x!==b[0].x||b[a].series.noSharedTooltip)&&b.splice(a,1);return b},getPointFromEvent:function(a){a=a.target;for(var b;a&&!b;)b=a.point,a=a.parentNode;return b},getChartCoordinatesFromPoint:function(a,c){var b=
a.series,d=b.xAxis,b=b.yAxis;if(d&&b)return c?{chartX:d.len+d.pos-a.clientX,chartY:b.len+b.pos-a.plotY}:{chartX:a.clientX+d.pos,chartY:a.plotY+b.pos}},getHoverData:function(b,c,d,e,l,h){var r=b,g=c,r=l?d:[g];e=!(!e||!b);c=g&&!g.stickyTracking;var n=function(a,b){return 0===b},p;e?n=function(a){return a===b}:c?n=function(a){return a.series===g}:r=a.grep(d,function(a){return a.stickyTracking});p=e&&!l?[b]:this.getKDPoints(r,l,h);g=(r=a.find(p,n))&&r.series;e||c||!l||(p=this.getKDPoints(d,l,h));p.sort(function(a,
b){return a.series.index-b.series.index});return{hoverPoint:r,hoverSeries:g,hoverPoints:p}},runPointActions:function(b,c){var d=this.chart,h=d.tooltip,l=h?h.shared:!1,g=c||d.hoverPoint,r=g&&g.series||d.hoverSeries;c=this.getHoverData(g,r,d.series,!!c||r&&r.directTouch&&this.isDirectTouch,l,b);var n,w,g=c.hoverPoint;n=(r=c.hoverSeries)&&r.tooltipOptions.followPointer;w=(l=l&&g&&!g.series.noSharedTooltip)?c.hoverPoints:g?[g]:[];if(g&&(g!==d.hoverPoint||h&&h.isHidden)){q(d.hoverPoints||[],function(b){-1===
a.inArray(b,w)&&b.setState()});q(w||[],function(a){a.setState("hover")});if(d.hoverSeries!==r)r.onMouseOver();d.hoverPoint&&d.hoverPoint.firePointEvent("mouseOut");g.firePointEvent("mouseOver");d.hoverPoints=w;d.hoverPoint=g;h&&h.refresh(l?w:g,b)}else n&&h&&!h.isHidden&&(r=h.getAnchor([{}],b),h.updatePosition({plotX:r[0],plotY:r[1]}));this.unDocMouseMove||(this.unDocMouseMove=C(k,"mousemove",function(b){var c=G[a.hoverChartIndex];if(c)c.pointer.onDocumentMouseMove(b)}));q(d.axes,function(c){e(c.crosshair.snap,
!0)?a.find(w,function(a){return a.series[c.coll]===c})?c.drawCrosshair(b,g):c.hideCrosshair():c.drawCrosshair(b)})},reset:function(a,c){var b=this.chart,e=b.hoverSeries,l=b.hoverPoint,h=b.hoverPoints,g=b.tooltip,n=g&&g.shared?h:l;a&&n&&q(d(n),function(b){b.series.isCartesian&&void 0===b.plotX&&(a=!1)});if(a)g&&n&&(g.refresh(n),l&&(l.setState(l.state,!0),q(b.axes,function(a){a.crosshair&&a.drawCrosshair(null,l)})));else{if(l)l.onMouseOut();h&&q(h,function(a){a.setState()});if(e)e.onMouseOut();g&&g.hide(c);
this.unDocMouseMove&&(this.unDocMouseMove=this.unDocMouseMove());q(b.axes,function(a){a.hideCrosshair()});this.hoverX=b.hoverPoints=b.hoverPoint=null}},scaleGroups:function(a,c){var b=this.chart,d;q(b.series,function(e){d=a||e.getPlotBox();e.xAxis&&e.xAxis.zoomEnabled&&e.group&&(e.group.attr(d),e.markerGroup&&(e.markerGroup.attr(d),e.markerGroup.clip(c?b.clipRect:null)),e.dataLabelsGroup&&e.dataLabelsGroup.attr(d))});b.clipRect.attr(c||b.clipBox)},dragStart:function(a){var b=this.chart;b.mouseIsDown=
a.type;b.cancelClick=!1;b.mouseDownX=this.mouseDownX=a.chartX;b.mouseDownY=this.mouseDownY=a.chartY},drag:function(a){var b=this.chart,c=b.options.chart,d=a.chartX,e=a.chartY,h=this.zoomHor,g=this.zoomVert,n=b.plotLeft,w=b.plotTop,p=b.plotWidth,k=b.plotHeight,m,q=this.selectionMarker,f=this.mouseDownX,t=this.mouseDownY,v=c.panKey&&a[c.panKey+"Key"];q&&q.touch||(d<n?d=n:d>n+p&&(d=n+p),e<w?e=w:e>w+k&&(e=w+k),this.hasDragged=Math.sqrt(Math.pow(f-d,2)+Math.pow(t-e,2)),10<this.hasDragged&&(m=b.isInsidePlot(f-
n,t-w),b.hasCartesianSeries&&(this.zoomX||this.zoomY)&&m&&!v&&!q&&(this.selectionMarker=q=b.renderer.rect(n,w,h?1:p,g?1:k,0).attr({fill:c.selectionMarkerFill||F("#335cad").setOpacity(.25).get(),"class":"highcharts-selection-marker",zIndex:7}).add()),q&&h&&(d-=f,q.attr({width:Math.abs(d),x:(0<d?0:d)+f})),q&&g&&(d=e-t,q.attr({height:Math.abs(d),y:(0<d?0:d)+t})),m&&!q&&c.panning&&b.pan(a,c.panning)))},drop:function(a){var b=this,c=this.chart,d=this.hasPinched;if(this.selectionMarker){var e={originalEvent:a,
xAxis:[],yAxis:[]},h=this.selectionMarker,r=h.attr?h.attr("x"):h.x,n=h.attr?h.attr("y"):h.y,w=h.attr?h.attr("width"):h.width,p=h.attr?h.attr("height"):h.height,k;if(this.hasDragged||d)q(c.axes,function(c){if(c.zoomEnabled&&g(c.min)&&(d||b[{xAxis:"zoomX",yAxis:"zoomY"}[c.coll]])){var l=c.horiz,f="touchend"===a.type?c.minPixelPadding:0,h=c.toValue((l?r:n)+f),l=c.toValue((l?r+w:n+p)-f);e[c.coll].push({axis:c,min:Math.min(h,l),max:Math.max(h,l)});k=!0}}),k&&u(c,"selection",e,function(a){c.zoom(v(a,d?
{animation:!1}:null))});this.selectionMarker=this.selectionMarker.destroy();d&&this.scaleGroups()}c&&(m(c.container,{cursor:c._cursor}),c.cancelClick=10<this.hasDragged,c.mouseIsDown=this.hasDragged=this.hasPinched=!1,this.pinchDown=[])},onContainerMouseDown:function(a){a=this.normalize(a);this.zoomOption(a);a.preventDefault&&a.preventDefault();this.dragStart(a)},onDocumentMouseUp:function(b){G[a.hoverChartIndex]&&G[a.hoverChartIndex].pointer.drop(b)},onDocumentMouseMove:function(a){var b=this.chart,
c=this.chartPosition;a=this.normalize(a,c);!c||this.inClass(a.target,"highcharts-tracker")||b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop)||this.reset()},onContainerMouseLeave:function(b){var c=G[a.hoverChartIndex];c&&(b.relatedTarget||b.toElement)&&(c.pointer.reset(),c.pointer.chartPosition=null)},onContainerMouseMove:function(b){var c=this.chart;g(a.hoverChartIndex)&&G[a.hoverChartIndex]&&G[a.hoverChartIndex].mouseIsDown||(a.hoverChartIndex=c.index);b=this.normalize(b);b.returnValue=!1;
"mousedown"===c.mouseIsDown&&this.drag(b);!this.inClass(b.target,"highcharts-tracker")&&!c.isInsidePlot(b.chartX-c.plotLeft,b.chartY-c.plotTop)||c.openMenu||this.runPointActions(b)},inClass:function(a,c){for(var b;a;){if(b=A(a,"class")){if(-1!==b.indexOf(c))return!0;if(-1!==b.indexOf("highcharts-container"))return!1}a=a.parentNode}},onTrackerMouseOut:function(a){var b=this.chart.hoverSeries;a=a.relatedTarget||a.toElement;this.isDirectTouch=!1;if(!(!b||!a||b.stickyTracking||this.inClass(a,"highcharts-tooltip")||
this.inClass(a,"highcharts-series-"+b.index)&&this.inClass(a,"highcharts-tracker")))b.onMouseOut()},onContainerClick:function(a){var b=this.chart,c=b.hoverPoint,d=b.plotLeft,e=b.plotTop;a=this.normalize(a);b.cancelClick||(c&&this.inClass(a.target,"highcharts-tracker")?(u(c.series,"click",v(a,{point:c})),b.hoverPoint&&c.firePointEvent("click",a)):(v(a,this.getCoordinates(a)),b.isInsidePlot(a.chartX-d,a.chartY-e)&&u(b,"click",a)))},setDOMEvents:function(){var b=this,c=b.chart.container;c.onmousedown=
function(a){b.onContainerMouseDown(a)};c.onmousemove=function(a){b.onContainerMouseMove(a)};c.onclick=function(a){b.onContainerClick(a)};C(c,"mouseleave",b.onContainerMouseLeave);1===a.chartCount&&C(k,"mouseup",b.onDocumentMouseUp);a.hasTouch&&(c.ontouchstart=function(a){b.onContainerTouchStart(a)},c.ontouchmove=function(a){b.onContainerTouchMove(a)},1===a.chartCount&&C(k,"touchend",b.onDocumentTouchEnd))},destroy:function(){var b=this;b.unDocMouseMove&&b.unDocMouseMove();n(b.chart.container,"mouseleave",
b.onContainerMouseLeave);a.chartCount||(n(k,"mouseup",b.onDocumentMouseUp),n(k,"touchend",b.onDocumentTouchEnd));clearInterval(b.tooltipTimeout);a.objectEach(b,function(a,c){b[c]=null})}}})(K);(function(a){var C=a.charts,A=a.each,G=a.extend,F=a.map,m=a.noop,g=a.pick;G(a.Pointer.prototype,{pinchTranslate:function(a,g,m,u,h,e){this.zoomHor&&this.pinchTranslateDirection(!0,a,g,m,u,h,e);this.zoomVert&&this.pinchTranslateDirection(!1,a,g,m,u,h,e)},pinchTranslateDirection:function(a,g,m,u,h,e,n,d){var c=
this.chart,w=a?"x":"y",b=a?"X":"Y",k="chart"+b,q=a?"width":"height",v=c["plot"+(a?"Left":"Top")],l,B,r=d||1,z=c.inverted,M=c.bounds[a?"h":"v"],p=1===g.length,E=g[0][k],I=m[0][k],L=!p&&g[1][k],f=!p&&m[1][k],t;m=function(){!p&&20<Math.abs(E-L)&&(r=d||Math.abs(I-f)/Math.abs(E-L));B=(v-I)/r+E;l=c["plot"+(a?"Width":"Height")]/r};m();g=B;g<M.min?(g=M.min,t=!0):g+l>M.max&&(g=M.max-l,t=!0);t?(I-=.8*(I-n[w][0]),p||(f-=.8*(f-n[w][1])),m()):n[w]=[I,f];z||(e[w]=B-v,e[q]=l);e=z?1/r:r;h[q]=l;h[w]=g;u[z?a?"scaleY":
"scaleX":"scale"+b]=r;u["translate"+b]=e*v+(I-e*E)},pinch:function(a){var k=this,v=k.chart,u=k.pinchDown,h=a.touches,e=h.length,n=k.lastValidTouch,d=k.hasZoom,c=k.selectionMarker,w={},b=1===e&&(k.inClass(a.target,"highcharts-tracker")&&v.runTrackerClick||k.runChartClick),y={};1<e&&(k.initiated=!0);d&&k.initiated&&!b&&a.preventDefault();F(h,function(a){return k.normalize(a)});"touchstart"===a.type?(A(h,function(a,b){u[b]={chartX:a.chartX,chartY:a.chartY}}),n.x=[u[0].chartX,u[1]&&u[1].chartX],n.y=[u[0].chartY,
u[1]&&u[1].chartY],A(v.axes,function(a){if(a.zoomEnabled){var b=v.bounds[a.horiz?"h":"v"],c=a.minPixelPadding,d=a.toPixels(g(a.options.min,a.dataMin)),e=a.toPixels(g(a.options.max,a.dataMax)),h=Math.max(d,e);b.min=Math.min(a.pos,Math.min(d,e)-c);b.max=Math.max(a.pos+a.len,h+c)}}),k.res=!0):k.followTouchMove&&1===e?this.runPointActions(k.normalize(a)):u.length&&(c||(k.selectionMarker=c=G({destroy:m,touch:!0},v.plotBox)),k.pinchTranslate(u,h,w,c,y,n),k.hasPinched=d,k.scaleGroups(w,y),k.res&&(k.res=
!1,this.reset(!1,0)))},touch:function(k,m){var q=this.chart,u,h;if(q.index!==a.hoverChartIndex)this.onContainerMouseLeave({relatedTarget:!0});a.hoverChartIndex=q.index;1===k.touches.length?(k=this.normalize(k),(h=q.isInsidePlot(k.chartX-q.plotLeft,k.chartY-q.plotTop))&&!q.openMenu?(m&&this.runPointActions(k),"touchmove"===k.type&&(m=this.pinchDown,u=m[0]?4<=Math.sqrt(Math.pow(m[0].chartX-k.chartX,2)+Math.pow(m[0].chartY-k.chartY,2)):!1),g(u,!0)&&this.pinch(k)):m&&this.reset()):2===k.touches.length&&
this.pinch(k)},onContainerTouchStart:function(a){this.zoomOption(a);this.touch(a,!0)},onContainerTouchMove:function(a){this.touch(a)},onDocumentTouchEnd:function(g){C[a.hoverChartIndex]&&C[a.hoverChartIndex].pointer.drop(g)}})})(K);(function(a){var C=a.addEvent,A=a.charts,G=a.css,F=a.doc,m=a.extend,g=a.noop,k=a.Pointer,q=a.removeEvent,v=a.win,u=a.wrap;if(!a.hasTouch&&(v.PointerEvent||v.MSPointerEvent)){var h={},e=!!v.PointerEvent,n=function(){var c=[];c.item=function(a){return this[a]};a.objectEach(h,
function(a){c.push({pageX:a.pageX,pageY:a.pageY,target:a.target})});return c},d=function(c,d,b,e){"touch"!==c.pointerType&&c.pointerType!==c.MSPOINTER_TYPE_TOUCH||!A[a.hoverChartIndex]||(e(c),e=A[a.hoverChartIndex].pointer,e[d]({type:b,target:c.currentTarget,preventDefault:g,touches:n()}))};m(k.prototype,{onContainerPointerDown:function(a){d(a,"onContainerTouchStart","touchstart",function(a){h[a.pointerId]={pageX:a.pageX,pageY:a.pageY,target:a.currentTarget}})},onContainerPointerMove:function(a){d(a,
"onContainerTouchMove","touchmove",function(a){h[a.pointerId]={pageX:a.pageX,pageY:a.pageY};h[a.pointerId].target||(h[a.pointerId].target=a.currentTarget)})},onDocumentPointerUp:function(a){d(a,"onDocumentTouchEnd","touchend",function(a){delete h[a.pointerId]})},batchMSEvents:function(a){a(this.chart.container,e?"pointerdown":"MSPointerDown",this.onContainerPointerDown);a(this.chart.container,e?"pointermove":"MSPointerMove",this.onContainerPointerMove);a(F,e?"pointerup":"MSPointerUp",this.onDocumentPointerUp)}});
u(k.prototype,"init",function(a,d,b){a.call(this,d,b);this.hasZoom&&G(d.container,{"-ms-touch-action":"none","touch-action":"none"})});u(k.prototype,"setDOMEvents",function(a){a.apply(this);(this.hasZoom||this.followTouchMove)&&this.batchMSEvents(C)});u(k.prototype,"destroy",function(a){this.batchMSEvents(q);a.call(this)})}})(K);(function(a){var C=a.addEvent,A=a.css,G=a.discardElement,F=a.defined,m=a.each,g=a.isFirefox,k=a.marginNames,q=a.merge,v=a.pick,u=a.setAnimation,h=a.stableSort,e=a.win,n=a.wrap;
a.Legend=function(a,c){this.init(a,c)};a.Legend.prototype={init:function(a,c){this.chart=a;this.setOptions(c);c.enabled&&(this.render(),C(this.chart,"endResize",function(){this.legend.positionCheckboxes()}))},setOptions:function(a){var c=v(a.padding,8);this.options=a;this.itemStyle=a.itemStyle;this.itemHiddenStyle=q(this.itemStyle,a.itemHiddenStyle);this.itemMarginTop=a.itemMarginTop||0;this.padding=c;this.initialItemY=c-5;this.itemHeight=this.maxItemWidth=0;this.symbolWidth=v(a.symbolWidth,16);this.pages=
[]},update:function(a,c){var d=this.chart;this.setOptions(q(!0,this.options,a));this.destroy();d.isDirtyLegend=d.isDirtyBox=!0;v(c,!0)&&d.redraw()},colorizeItem:function(d,c){d.legendGroup[c?"removeClass":"addClass"]("highcharts-legend-item-hidden");var e=this.options,b=d.legendItem,h=d.legendLine,g=d.legendSymbol,n=this.itemHiddenStyle.color,e=c?e.itemStyle.color:n,l=c?d.color||n:n,k=d.options&&d.options.marker,r={fill:l};b&&b.css({fill:e,color:e});h&&h.attr({stroke:l});g&&(k&&g.isMarker&&(r=d.pointAttribs(),
c||a.objectEach(r,function(a,b){r[b]=n})),g.attr(r))},positionItem:function(a){var c=this.options,d=c.symbolPadding,c=!c.rtl,b=a._legendItemPos,e=b[0],b=b[1],h=a.checkbox;(a=a.legendGroup)&&a.element&&a.translate(c?e:this.legendWidth-e-2*d-4,b);h&&(h.x=e,h.y=b)},destroyItem:function(a){var c=a.checkbox;m(["legendItem","legendLine","legendSymbol","legendGroup"],function(c){a[c]&&(a[c]=a[c].destroy())});c&&G(a.checkbox)},destroy:function(){function a(a){this[a]&&(this[a]=this[a].destroy())}m(this.getAllItems(),
function(c){m(["legendItem","legendGroup"],a,c)});m("clipRect up down pager nav box title group".split(" "),a,this);this.display=null},positionCheckboxes:function(a){var c=this.group&&this.group.alignAttr,d,b=this.clipHeight||this.legendHeight,e=this.titleHeight;c&&(d=c.translateY,m(this.allItems,function(h){var g=h.checkbox,l;g&&(l=d+e+g.y+(a||0)+3,A(g,{left:c.translateX+h.checkboxOffset+g.x-20+"px",top:l+"px",display:l>d-6&&l<d+b-6?"":"none"}))}))},renderTitle:function(){var a=this.options,c=this.padding,
e=a.title,b=0;e.text&&(this.title||(this.title=this.chart.renderer.label(e.text,c-3,c-4,null,null,null,a.useHTML,null,"legend-title").attr({zIndex:1}).css(e.style).add(this.group)),a=this.title.getBBox(),b=a.height,this.offsetWidth=a.width,this.contentGroup.attr({translateY:b}));this.titleHeight=b},setText:function(d){var c=this.options;d.legendItem.attr({text:c.labelFormat?a.format(c.labelFormat,d):c.labelFormatter.call(d)})},renderItem:function(a){var c=this.chart,d=c.renderer,b=this.options,e=
"horizontal"===b.layout,h=this.symbolWidth,g=b.symbolPadding,l=this.itemStyle,n=this.itemHiddenStyle,r=this.padding,k=e?v(b.itemDistance,20):0,m=!b.rtl,p=b.width,E=b.itemMarginBottom||0,I=this.itemMarginTop,u=a.legendItem,f=!a.series,t=!f&&a.series.drawLegendSymbol?a.series:a,A=t.options,J=this.createCheckboxForItem&&A&&A.showCheckbox,A=h+g+k+(J?20:0),N=b.useHTML,C=a.options.className;u||(a.legendGroup=d.g("legend-item").addClass("highcharts-"+t.type+"-series highcharts-color-"+a.colorIndex+(C?" "+
C:"")+(f?" highcharts-series-"+a.index:"")).attr({zIndex:1}).add(this.scrollGroup),a.legendItem=u=d.text("",m?h+g:-g,this.baseline||0,N).css(q(a.visible?l:n)).attr({align:m?"left":"right",zIndex:2}).add(a.legendGroup),this.baseline||(h=l.fontSize,this.fontMetrics=d.fontMetrics(h,u),this.baseline=this.fontMetrics.f+3+I,u.attr("y",this.baseline)),this.symbolHeight=b.symbolHeight||this.fontMetrics.f,t.drawLegendSymbol(this,a),this.setItemEvents&&this.setItemEvents(a,u,N),J&&this.createCheckboxForItem(a));
this.colorizeItem(a,a.visible);l.width||u.css({width:(b.itemWidth||c.spacingBox.width)-A});this.setText(a);d=u.getBBox();l=a.checkboxOffset=b.itemWidth||a.legendItemWidth||d.width+A;this.itemHeight=d=Math.round(a.legendItemHeight||d.height||this.symbolHeight);e&&this.itemX-r+l>(p||c.spacingBox.width-2*r-b.x)&&(this.itemX=r,this.itemY+=I+this.lastLineHeight+E,this.lastLineHeight=0);this.maxItemWidth=Math.max(this.maxItemWidth,l);this.lastItemY=I+this.itemY+E;this.lastLineHeight=Math.max(d,this.lastLineHeight);
a._legendItemPos=[this.itemX,this.itemY];e?this.itemX+=l:(this.itemY+=I+d+E,this.lastLineHeight=d);this.offsetWidth=p||Math.max((e?this.itemX-r-k:l)+r,this.offsetWidth)},getAllItems:function(){var a=[];m(this.chart.series,function(c){var d=c&&c.options;c&&v(d.showInLegend,F(d.linkedTo)?!1:void 0,!0)&&(a=a.concat(c.legendItems||("point"===d.legendType?c.data:c)))});return a},adjustMargins:function(a,c){var d=this.chart,b=this.options,e=b.align.charAt(0)+b.verticalAlign.charAt(0)+b.layout.charAt(0);
b.floating||m([/(lth|ct|rth)/,/(rtv|rm|rbv)/,/(rbh|cb|lbh)/,/(lbv|lm|ltv)/],function(h,g){h.test(e)&&!F(a[g])&&(d[k[g]]=Math.max(d[k[g]],d.legend[(g+1)%2?"legendHeight":"legendWidth"]+[1,-1,-1,1][g]*b[g%2?"x":"y"]+v(b.margin,12)+c[g]))})},render:function(){var a=this,c=a.chart,e=c.renderer,b=a.group,g,n,k,l,B=a.box,r=a.options,z=a.padding;a.itemX=z;a.itemY=a.initialItemY;a.offsetWidth=0;a.lastItemY=0;b||(a.group=b=e.g("legend").attr({zIndex:7}).add(),a.contentGroup=e.g().attr({zIndex:1}).add(b),a.scrollGroup=
e.g().add(a.contentGroup));a.renderTitle();g=a.getAllItems();h(g,function(a,b){return(a.options&&a.options.legendIndex||0)-(b.options&&b.options.legendIndex||0)});r.reversed&&g.reverse();a.allItems=g;a.display=n=!!g.length;a.lastLineHeight=0;m(g,function(b){a.renderItem(b)});k=(r.width||a.offsetWidth)+z;l=a.lastItemY+a.lastLineHeight+a.titleHeight;l=a.handleOverflow(l);l+=z;B||(a.box=B=e.rect().addClass("highcharts-legend-box").attr({r:r.borderRadius}).add(b),B.isNew=!0);B.attr({stroke:r.borderColor,
"stroke-width":r.borderWidth||0,fill:r.backgroundColor||"none"}).shadow(r.shadow);0<k&&0<l&&(B[B.isNew?"attr":"animate"](B.crisp({x:0,y:0,width:k,height:l},B.strokeWidth())),B.isNew=!1);B[n?"show":"hide"]();a.legendWidth=k;a.legendHeight=l;m(g,function(b){a.positionItem(b)});n&&b.align(q(r,{width:k,height:l}),!0,"spacingBox");c.isResizing||this.positionCheckboxes()},handleOverflow:function(a){var c=this,d=this.chart,b=d.renderer,e=this.options,h=e.y,g=this.padding,d=d.spacingBox.height+("top"===e.verticalAlign?
-h:h)-g,h=e.maxHeight,l,n=this.clipRect,r=e.navigation,k=v(r.animation,!0),q=r.arrowSize||12,p=this.nav,E=this.pages,I,u=this.allItems,f=function(a){"number"===typeof a?n.attr({height:a}):n&&(c.clipRect=n.destroy(),c.contentGroup.clip());c.contentGroup.div&&(c.contentGroup.div.style.clip=a?"rect("+g+"px,9999px,"+(g+a)+"px,0)":"auto")};"horizontal"!==e.layout||"middle"===e.verticalAlign||e.floating||(d/=2);h&&(d=Math.min(d,h));E.length=0;a>d&&!1!==r.enabled?(this.clipHeight=l=Math.max(d-20-this.titleHeight-
g,0),this.currentPage=v(this.currentPage,1),this.fullHeight=a,m(u,function(a,b){var c=a._legendItemPos[1];a=Math.round(a.legendItem.getBBox().height);var f=E.length;if(!f||c-E[f-1]>l&&(I||c)!==E[f-1])E.push(I||c),f++;b===u.length-1&&c+a-E[f-1]>l&&E.push(c);c!==I&&(I=c)}),n||(n=c.clipRect=b.clipRect(0,g,9999,0),c.contentGroup.clip(n)),f(l),p||(this.nav=p=b.g().attr({zIndex:1}).add(this.group),this.up=b.symbol("triangle",0,0,q,q).on("click",function(){c.scroll(-1,k)}).add(p),this.pager=b.text("",15,
10).addClass("highcharts-legend-navigation").css(r.style).add(p),this.down=b.symbol("triangle-down",0,0,q,q).on("click",function(){c.scroll(1,k)}).add(p)),c.scroll(0),a=d):p&&(f(),this.nav=p.destroy(),this.scrollGroup.attr({translateY:1}),this.clipHeight=0);return a},scroll:function(a,c){var d=this.pages,b=d.length;a=this.currentPage+a;var e=this.clipHeight,h=this.options.navigation,g=this.pager,l=this.padding;a>b&&(a=b);0<a&&(void 0!==c&&u(c,this.chart),this.nav.attr({translateX:l,translateY:e+this.padding+
7+this.titleHeight,visibility:"visible"}),this.up.attr({"class":1===a?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"}),g.attr({text:a+"/"+b}),this.down.attr({x:18+this.pager.getBBox().width,"class":a===b?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"}),this.up.attr({fill:1===a?h.inactiveColor:h.activeColor}).css({cursor:1===a?"default":"pointer"}),this.down.attr({fill:a===b?h.inactiveColor:h.activeColor}).css({cursor:a===b?"default":"pointer"}),c=-d[a-1]+this.initialItemY,
this.scrollGroup.animate({translateY:c}),this.currentPage=a,this.positionCheckboxes(c))}};a.LegendSymbolMixin={drawRectangle:function(a,c){var d=a.symbolHeight,b=a.options.squareSymbol;c.legendSymbol=this.chart.renderer.rect(b?(a.symbolWidth-d)/2:0,a.baseline-d+1,b?d:a.symbolWidth,d,v(a.options.symbolRadius,d/2)).addClass("highcharts-point").attr({zIndex:3}).add(c.legendGroup)},drawLineMarker:function(a){var c=this.options,d=c.marker,b=a.symbolWidth,e=a.symbolHeight,h=e/2,g=this.chart.renderer,l=
this.legendGroup;a=a.baseline-Math.round(.3*a.fontMetrics.b);var n;n={"stroke-width":c.lineWidth||0};c.dashStyle&&(n.dashstyle=c.dashStyle);this.legendLine=g.path(["M",0,a,"L",b,a]).addClass("highcharts-graph").attr(n).add(l);d&&!1!==d.enabled&&(c=Math.min(v(d.radius,h),h),0===this.symbol.indexOf("url")&&(d=q(d,{width:e,height:e}),c=0),this.legendSymbol=d=g.symbol(this.symbol,b/2-c,a-c,2*c,2*c,d).addClass("highcharts-point").add(l),d.isMarker=!0)}};(/Trident\/7\.0/.test(e.navigator.userAgent)||g)&&
n(a.Legend.prototype,"positionItem",function(a,c){var d=this,b=function(){c._legendItemPos&&a.call(d,c)};b();setTimeout(b)})})(K);(function(a){var C=a.addEvent,A=a.animate,G=a.animObject,F=a.attr,m=a.doc,g=a.Axis,k=a.createElement,q=a.defaultOptions,v=a.discardElement,u=a.charts,h=a.css,e=a.defined,n=a.each,d=a.extend,c=a.find,w=a.fireEvent,b=a.getStyle,y=a.grep,D=a.isNumber,H=a.isObject,l=a.isString,B=a.Legend,r=a.marginNames,z=a.merge,M=a.objectEach,p=a.Pointer,E=a.pick,I=a.pInt,L=a.removeEvent,
f=a.seriesTypes,t=a.splat,R=a.svg,J=a.syncTimeout,N=a.win,O=a.Renderer,P=a.Chart=function(){this.getArgs.apply(this,arguments)};a.chart=function(a,b,c){return new P(a,b,c)};d(P.prototype,{callbacks:[],getArgs:function(){var a=[].slice.call(arguments);if(l(a[0])||a[0].nodeName)this.renderTo=a.shift();this.init(a[0],a[1])},init:function(b,c){var f,d,e=b.series,p=b.plotOptions||{};b.series=null;f=z(q,b);for(d in f.plotOptions)f.plotOptions[d].tooltip=p[d]&&z(p[d].tooltip)||void 0;f.tooltip.userOptions=
b.chart&&b.chart.forExport&&b.tooltip.userOptions||b.tooltip;f.series=b.series=e;this.userOptions=b;b=f.chart;d=b.events;this.margin=[];this.spacing=[];this.bounds={h:{},v:{}};this.callback=c;this.isResizing=0;this.options=f;this.axes=[];this.series=[];this.hasCartesianSeries=b.showAxes;var h=this;h.index=u.length;u.push(h);a.chartCount++;d&&M(d,function(a,b){C(h,b,a)});h.xAxis=[];h.yAxis=[];h.pointCount=h.colorCounter=h.symbolCounter=0;h.firstRender()},initSeries:function(b){var c=this.options.chart;
(c=f[b.type||c.type||c.defaultSeriesType])||a.error(17,!0);c=new c;c.init(this,b);return c},orderSeries:function(a){var b=this.series;for(a=a||0;a<b.length;a++)b[a]&&(b[a].index=a,b[a].name=b[a].name||"Series "+(b[a].index+1))},isInsidePlot:function(a,b,c){var f=c?b:a;a=c?a:b;return 0<=f&&f<=this.plotWidth&&0<=a&&a<=this.plotHeight},redraw:function(b){var c=this.axes,f=this.series,e=this.pointer,p=this.legend,h=this.isDirtyLegend,l,g,r=this.hasCartesianSeries,t=this.isDirtyBox,x,k=this.renderer,m=
k.isHidden(),E=[];this.setResponsive&&this.setResponsive(!1);a.setAnimation(b,this);m&&this.temporaryDisplay();this.layOutTitles();for(b=f.length;b--;)if(x=f[b],x.options.stacking&&(l=!0,x.isDirty)){g=!0;break}if(g)for(b=f.length;b--;)x=f[b],x.options.stacking&&(x.isDirty=!0);n(f,function(a){a.isDirty&&"point"===a.options.legendType&&(a.updateTotals&&a.updateTotals(),h=!0);a.isDirtyData&&w(a,"updatedData")});h&&p.options.enabled&&(p.render(),this.isDirtyLegend=!1);l&&this.getStacks();r&&n(c,function(a){a.updateNames();
a.setScale()});this.getMargins();r&&(n(c,function(a){a.isDirty&&(t=!0)}),n(c,function(a){var b=a.min+","+a.max;a.extKey!==b&&(a.extKey=b,E.push(function(){w(a,"afterSetExtremes",d(a.eventArgs,a.getExtremes()));delete a.eventArgs}));(t||l)&&a.redraw()}));t&&this.drawChartBox();w(this,"predraw");n(f,function(a){(t||a.isDirty)&&a.visible&&a.redraw();a.isDirtyData=!1});e&&e.reset(!0);k.draw();w(this,"redraw");w(this,"render");m&&this.temporaryDisplay(!0);n(E,function(a){a.call()})},get:function(a){function b(b){return b.id===
a||b.options&&b.options.id===a}var f,d=this.series,e;f=c(this.axes,b)||c(this.series,b);for(e=0;!f&&e<d.length;e++)f=c(d[e].points||[],b);return f},getAxes:function(){var a=this,b=this.options,c=b.xAxis=t(b.xAxis||{}),b=b.yAxis=t(b.yAxis||{});n(c,function(a,b){a.index=b;a.isX=!0});n(b,function(a,b){a.index=b});c=c.concat(b);n(c,function(b){new g(a,b)})},getSelectedPoints:function(){var a=[];n(this.series,function(b){a=a.concat(y(b.data||[],function(a){return a.selected}))});return a},getSelectedSeries:function(){return y(this.series,
function(a){return a.selected})},setTitle:function(a,b,c){var f=this,d=f.options,e;e=d.title=z({style:{color:"#333333",fontSize:d.isStock?"16px":"18px"}},d.title,a);d=d.subtitle=z({style:{color:"#666666"}},d.subtitle,b);n([["title",a,e],["subtitle",b,d]],function(a,b){var c=a[0],d=f[c],e=a[1];a=a[2];d&&e&&(f[c]=d=d.destroy());a&&a.text&&!d&&(f[c]=f.renderer.text(a.text,0,0,a.useHTML).attr({align:a.align,"class":"highcharts-"+c,zIndex:a.zIndex||4}).add(),f[c].update=function(a){f.setTitle(!b&&a,b&&
a)},f[c].css(a.style))});f.layOutTitles(c)},layOutTitles:function(a){var b=0,c,f=this.renderer,e=this.spacingBox;n(["title","subtitle"],function(a){var c=this[a],p=this.options[a];a="title"===a?-3:p.verticalAlign?0:b+2;var h;c&&(h=p.style.fontSize,h=f.fontMetrics(h,c).b,c.css({width:(p.width||e.width+p.widthAdjust)+"px"}).align(d({y:a+h},p),!1,"spacingBox"),p.floating||p.verticalAlign||(b=Math.ceil(b+c.getBBox(p.useHTML).height)))},this);c=this.titleOffset!==b;this.titleOffset=b;!this.isDirtyBox&&
c&&(this.isDirtyBox=c,this.hasRendered&&E(a,!0)&&this.isDirtyBox&&this.redraw())},getChartSize:function(){var c=this.options.chart,f=c.width,c=c.height,d=this.renderTo;e(f)||(this.containerWidth=b(d,"width"));e(c)||(this.containerHeight=b(d,"height"));this.chartWidth=Math.max(0,f||this.containerWidth||600);this.chartHeight=Math.max(0,a.relativeLength(c,this.chartWidth)||this.containerHeight||400)},temporaryDisplay:function(c){var f=this.renderTo;if(c)for(;f&&f.style;)f.hcOrigStyle&&(a.css(f,f.hcOrigStyle),
delete f.hcOrigStyle),f=f.parentNode;else for(;f&&f.style;)"none"===b(f,"display",!1)&&(f.hcOrigStyle={display:f.style.display,height:f.style.height,overflow:f.style.overflow},c={display:"block",overflow:"hidden"},f!==this.renderTo&&(c.height=0),a.css(f,c),f.style.setProperty&&f.style.setProperty("display","block","important")),f=f.parentNode},setClassName:function(a){this.container.className="highcharts-container "+(a||"")},getContainer:function(){var b,c=this.options,f=c.chart,e,p;b=this.renderTo;
var h=a.uniqueKey(),g;b||(this.renderTo=b=f.renderTo);l(b)&&(this.renderTo=b=m.getElementById(b));b||a.error(13,!0);e=I(F(b,"data-highcharts-chart"));D(e)&&u[e]&&u[e].hasRendered&&u[e].destroy();F(b,"data-highcharts-chart",this.index);b.innerHTML="";f.skipClone||b.offsetWidth||this.temporaryDisplay();this.getChartSize();e=this.chartWidth;p=this.chartHeight;g=d({position:"relative",overflow:"hidden",width:e+"px",height:p+"px",textAlign:"left",lineHeight:"normal",zIndex:0,"-webkit-tap-highlight-color":"rgba(0,0,0,0)"},
f.style);this.container=b=k("div",{id:h},g,b);this._cursor=b.style.cursor;this.renderer=new (a[f.renderer]||O)(b,e,p,null,f.forExport,c.exporting&&c.exporting.allowHTML);this.setClassName(f.className);this.renderer.setStyle(f.style);this.renderer.chartIndex=this.index},getMargins:function(a){var b=this.spacing,c=this.margin,f=this.titleOffset;this.resetMargins();f&&!e(c[0])&&(this.plotTop=Math.max(this.plotTop,f+this.options.title.margin+b[0]));this.legend.display&&this.legend.adjustMargins(c,b);
this.extraMargin&&(this[this.extraMargin.type]=(this[this.extraMargin.type]||0)+this.extraMargin.value);this.extraTopMargin&&(this.plotTop+=this.extraTopMargin);a||this.getAxisMargins()},getAxisMargins:function(){var a=this,b=a.axisOffset=[0,0,0,0],c=a.margin;a.hasCartesianSeries&&n(a.axes,function(a){a.visible&&a.getOffset()});n(r,function(f,d){e(c[d])||(a[f]+=b[d])});a.setChartSize()},reflow:function(a){var c=this,f=c.options.chart,d=c.renderTo,p=e(f.width),h=f.width||b(d,"width"),f=f.height||b(d,
"height"),d=a?a.target:N;if(!p&&!c.isPrinting&&h&&f&&(d===N||d===m)){if(h!==c.containerWidth||f!==c.containerHeight)clearTimeout(c.reflowTimeout),c.reflowTimeout=J(function(){c.container&&c.setSize(void 0,void 0,!1)},a?100:0);c.containerWidth=h;c.containerHeight=f}},initReflow:function(){var a=this,b;b=C(N,"resize",function(b){a.reflow(b)});C(a,"destroy",b)},setSize:function(b,c,f){var d=this,e=d.renderer;d.isResizing+=1;a.setAnimation(f,d);d.oldChartHeight=d.chartHeight;d.oldChartWidth=d.chartWidth;
void 0!==b&&(d.options.chart.width=b);void 0!==c&&(d.options.chart.height=c);d.getChartSize();b=e.globalAnimation;(b?A:h)(d.container,{width:d.chartWidth+"px",height:d.chartHeight+"px"},b);d.setChartSize(!0);e.setSize(d.chartWidth,d.chartHeight,f);n(d.axes,function(a){a.isDirty=!0;a.setScale()});d.isDirtyLegend=!0;d.isDirtyBox=!0;d.layOutTitles();d.getMargins();d.redraw(f);d.oldChartHeight=null;w(d,"resize");J(function(){d&&w(d,"endResize",null,function(){--d.isResizing})},G(b).duration)},setChartSize:function(a){function b(a){a=
l[a]||0;return Math.max(m||a,a)/2}var c=this.inverted,f=this.renderer,d=this.chartWidth,e=this.chartHeight,p=this.options.chart,h=this.spacing,l=this.clipOffset,g,r,t,k,m;this.plotLeft=g=Math.round(this.plotLeft);this.plotTop=r=Math.round(this.plotTop);this.plotWidth=t=Math.max(0,Math.round(d-g-this.marginRight));this.plotHeight=k=Math.max(0,Math.round(e-r-this.marginBottom));this.plotSizeX=c?k:t;this.plotSizeY=c?t:k;this.plotBorderWidth=p.plotBorderWidth||0;this.spacingBox=f.spacingBox={x:h[3],y:h[0],
width:d-h[3]-h[1],height:e-h[0]-h[2]};this.plotBox=f.plotBox={x:g,y:r,width:t,height:k};m=2*Math.floor(this.plotBorderWidth/2);c=Math.ceil(b(3));f=Math.ceil(b(0));this.clipBox={x:c,y:f,width:Math.floor(this.plotSizeX-b(1)-c),height:Math.max(0,Math.floor(this.plotSizeY-b(2)-f))};a||n(this.axes,function(a){a.setAxisSize();a.setAxisTranslation()})},resetMargins:function(){var a=this,b=a.options.chart;n(["margin","spacing"],function(c){var f=b[c],d=H(f)?f:[f,f,f,f];n(["Top","Right","Bottom","Left"],function(f,
e){a[c][e]=E(b[c+f],d[e])})});n(r,function(b,c){a[b]=E(a.margin[c],a.spacing[c])});a.axisOffset=[0,0,0,0];a.clipOffset=[]},drawChartBox:function(){var a=this.options.chart,b=this.renderer,c=this.chartWidth,f=this.chartHeight,d=this.chartBackground,e=this.plotBackground,p=this.plotBorder,h,l=this.plotBGImage,g=a.backgroundColor,n=a.plotBackgroundColor,r=a.plotBackgroundImage,t,k=this.plotLeft,m=this.plotTop,E=this.plotWidth,w=this.plotHeight,q=this.plotBox,I=this.clipRect,z=this.clipBox,y="animate";
d||(this.chartBackground=d=b.rect().addClass("highcharts-background").add(),y="attr");h=a.borderWidth||0;t=h+(a.shadow?8:0);g={fill:g||"none"};if(h||d["stroke-width"])g.stroke=a.borderColor,g["stroke-width"]=h;d.attr(g).shadow(a.shadow);d[y]({x:t/2,y:t/2,width:c-t-h%2,height:f-t-h%2,r:a.borderRadius});y="animate";e||(y="attr",this.plotBackground=e=b.rect().addClass("highcharts-plot-background").add());e[y](q);e.attr({fill:n||"none"}).shadow(a.plotShadow);r&&(l?l.animate(q):this.plotBGImage=b.image(r,
k,m,E,w).add());I?I.animate({width:z.width,height:z.height}):this.clipRect=b.clipRect(z);y="animate";p||(y="attr",this.plotBorder=p=b.rect().addClass("highcharts-plot-border").attr({zIndex:1}).add());p.attr({stroke:a.plotBorderColor,"stroke-width":a.plotBorderWidth||0,fill:"none"});p[y](p.crisp({x:k,y:m,width:E,height:w},-p.strokeWidth()));this.isDirtyBox=!1},propFromSeries:function(){var a=this,b=a.options.chart,c,d=a.options.series,e,p;n(["inverted","angular","polar"],function(h){c=f[b.type||b.defaultSeriesType];
p=b[h]||c&&c.prototype[h];for(e=d&&d.length;!p&&e--;)(c=f[d[e].type])&&c.prototype[h]&&(p=!0);a[h]=p})},linkSeries:function(){var a=this,b=a.series;n(b,function(a){a.linkedSeries.length=0});n(b,function(b){var c=b.options.linkedTo;l(c)&&(c=":previous"===c?a.series[b.index-1]:a.get(c))&&c.linkedParent!==b&&(c.linkedSeries.push(b),b.linkedParent=c,b.visible=E(b.options.visible,c.options.visible,b.visible))})},renderSeries:function(){n(this.series,function(a){a.translate();a.render()})},renderLabels:function(){var a=
this,b=a.options.labels;b.items&&n(b.items,function(c){var f=d(b.style,c.style),e=I(f.left)+a.plotLeft,p=I(f.top)+a.plotTop+12;delete f.left;delete f.top;a.renderer.text(c.html,e,p).attr({zIndex:2}).css(f).add()})},render:function(){var a=this.axes,b=this.renderer,c=this.options,f,d,e;this.setTitle();this.legend=new B(this,c.legend);this.getStacks&&this.getStacks();this.getMargins(!0);this.setChartSize();c=this.plotWidth;f=this.plotHeight-=21;n(a,function(a){a.setScale()});this.getAxisMargins();d=
1.1<c/this.plotWidth;e=1.05<f/this.plotHeight;if(d||e)n(a,function(a){(a.horiz&&d||!a.horiz&&e)&&a.setTickInterval(!0)}),this.getMargins();this.drawChartBox();this.hasCartesianSeries&&n(a,function(a){a.visible&&a.render()});this.seriesGroup||(this.seriesGroup=b.g("series-group").attr({zIndex:3}).add());this.renderSeries();this.renderLabels();this.addCredits();this.setResponsive&&this.setResponsive();this.hasRendered=!0},addCredits:function(a){var b=this;a=z(!0,this.options.credits,a);a.enabled&&!this.credits&&
(this.credits=this.renderer.text(a.text+(this.mapCredits||""),0,0).addClass("highcharts-credits").on("click",function(){a.href&&(N.location.href=a.href)}).attr({align:a.position.align,zIndex:8}).css(a.style).add().align(a.position),this.credits.update=function(a){b.credits=b.credits.destroy();b.addCredits(a)})},destroy:function(){var b=this,c=b.axes,f=b.series,d=b.container,e,p=d&&d.parentNode;w(b,"destroy");b.renderer.forExport?a.erase(u,b):u[b.index]=void 0;a.chartCount--;b.renderTo.removeAttribute("data-highcharts-chart");
L(b);for(e=c.length;e--;)c[e]=c[e].destroy();this.scroller&&this.scroller.destroy&&this.scroller.destroy();for(e=f.length;e--;)f[e]=f[e].destroy();n("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "),function(a){var c=b[a];c&&c.destroy&&(b[a]=c.destroy())});d&&(d.innerHTML="",L(d),p&&v(d));M(b,function(a,c){delete b[c]})},isReadyToRender:function(){var a=this;return R||N!=N.top||
"complete"===m.readyState?!0:(m.attachEvent("onreadystatechange",function(){m.detachEvent("onreadystatechange",a.firstRender);"complete"===m.readyState&&a.firstRender()}),!1)},firstRender:function(){var a=this,b=a.options;if(a.isReadyToRender()){a.getContainer();w(a,"init");a.resetMargins();a.setChartSize();a.propFromSeries();a.getAxes();n(b.series||[],function(b){a.initSeries(b)});a.linkSeries();w(a,"beforeRender");p&&(a.pointer=new p(a,b));a.render();if(!a.renderer.imgCount&&a.onload)a.onload();
a.temporaryDisplay(!0)}},onload:function(){n([this.callback].concat(this.callbacks),function(a){a&&void 0!==this.index&&a.apply(this,[this])},this);w(this,"load");w(this,"render");e(this.index)&&!1!==this.options.chart.reflow&&this.initReflow();this.onload=null}})})(K);(function(a){var C,A=a.each,G=a.extend,F=a.erase,m=a.fireEvent,g=a.format,k=a.isArray,q=a.isNumber,v=a.pick,u=a.removeEvent;a.Point=C=function(){};a.Point.prototype={init:function(a,e,g){this.series=a;this.color=a.color;this.applyOptions(e,
g);a.options.colorByPoint?(e=a.options.colors||a.chart.options.colors,this.color=this.color||e[a.colorCounter],e=e.length,g=a.colorCounter,a.colorCounter++,a.colorCounter===e&&(a.colorCounter=0)):g=a.colorIndex;this.colorIndex=v(this.colorIndex,g);a.chart.pointCount++;return this},applyOptions:function(a,e){var h=this.series,d=h.options.pointValKey||h.pointValKey;a=C.prototype.optionsToObject.call(this,a);G(this,a);this.options=this.options?G(this.options,a):a;a.group&&delete this.group;d&&(this.y=
this[d]);this.isNull=v(this.isValid&&!this.isValid(),null===this.x||!q(this.y,!0));this.selected&&(this.state="select");"name"in this&&void 0===e&&h.xAxis&&h.xAxis.hasNames&&(this.x=h.xAxis.nameToX(this));void 0===this.x&&h&&(this.x=void 0===e?h.autoIncrement(this):e);return this},optionsToObject:function(a){var e={},h=this.series,d=h.options.keys,c=d||h.pointArrayMap||["y"],g=c.length,b=0,m=0;if(q(a)||null===a)e[c[0]]=a;else if(k(a))for(!d&&a.length>g&&(h=typeof a[0],"string"===h?e.name=a[0]:"number"===
h&&(e.x=a[0]),b++);m<g;)d&&void 0===a[b]||(e[c[m]]=a[b]),b++,m++;else"object"===typeof a&&(e=a,a.dataLabels&&(h._hasPointLabels=!0),a.marker&&(h._hasPointMarkers=!0));return e},getClassName:function(){return"highcharts-point"+(this.selected?" highcharts-point-select":"")+(this.negative?" highcharts-negative":"")+(this.isNull?" highcharts-null-point":"")+(void 0!==this.colorIndex?" highcharts-color-"+this.colorIndex:"")+(this.options.className?" "+this.options.className:"")+(this.zone&&this.zone.className?
" "+this.zone.className.replace("highcharts-negative",""):"")},getZone:function(){var a=this.series,e=a.zones,a=a.zoneAxis||"y",g=0,d;for(d=e[g];this[a]>=d.value;)d=e[++g];d&&d.color&&!this.options.color&&(this.color=d.color);return d},destroy:function(){var a=this.series.chart,e=a.hoverPoints,g;a.pointCount--;e&&(this.setState(),F(e,this),e.length||(a.hoverPoints=null));if(this===a.hoverPoint)this.onMouseOut();if(this.graphic||this.dataLabel)u(this),this.destroyElements();this.legendItem&&a.legend.destroyItem(this);
for(g in this)this[g]=null},destroyElements:function(){for(var a=["graphic","dataLabel","dataLabelUpper","connector","shadowGroup"],e,g=6;g--;)e=a[g],this[e]&&(this[e]=this[e].destroy())},getLabelConfig:function(){return{x:this.category,y:this.y,color:this.color,colorIndex:this.colorIndex,key:this.name||this.category,series:this.series,point:this,percentage:this.percentage,total:this.total||this.stackTotal}},tooltipFormatter:function(a){var e=this.series,h=e.tooltipOptions,d=v(h.valueDecimals,""),
c=h.valuePrefix||"",k=h.valueSuffix||"";A(e.pointArrayMap||["y"],function(b){b="{point."+b;if(c||k)a=a.replace(b+"}",c+b+"}"+k);a=a.replace(b+"}",b+":,."+d+"f}")});return g(a,{point:this,series:this.series})},firePointEvent:function(a,e,g){var d=this,c=this.series.options;(c.point.events[a]||d.options&&d.options.events&&d.options.events[a])&&this.importEvents();"click"===a&&c.allowPointSelect&&(g=function(a){d.select&&d.select(null,a.ctrlKey||a.metaKey||a.shiftKey)});m(this,a,e,g)},visible:!0}})(K);
(function(a){var C=a.addEvent,A=a.animObject,G=a.arrayMax,F=a.arrayMin,m=a.correctFloat,g=a.Date,k=a.defaultOptions,q=a.defaultPlotOptions,v=a.defined,u=a.each,h=a.erase,e=a.extend,n=a.fireEvent,d=a.grep,c=a.isArray,w=a.isNumber,b=a.isString,y=a.merge,D=a.objectEach,H=a.pick,l=a.removeEvent,B=a.splat,r=a.SVGElement,z=a.syncTimeout,M=a.win;a.Series=a.seriesType("line",null,{lineWidth:2,allowPointSelect:!1,showCheckbox:!1,animation:{duration:1E3},events:{},marker:{lineWidth:0,lineColor:"#ffffff",radius:4,
states:{hover:{animation:{duration:50},enabled:!0,radiusPlus:2,lineWidthPlus:1},select:{fillColor:"#cccccc",lineColor:"#000000",lineWidth:2}}},point:{events:{}},dataLabels:{align:"center",formatter:function(){return null===this.y?"":a.numberFormat(this.y,-1)},style:{fontSize:"11px",fontWeight:"bold",color:"contrast",textOutline:"1px contrast"},verticalAlign:"bottom",x:0,y:0,padding:5},cropThreshold:300,pointRange:0,softThreshold:!0,states:{hover:{animation:{duration:50},lineWidthPlus:1,marker:{},
halo:{size:10,opacity:.25}},select:{marker:{}}},stickyTracking:!0,turboThreshold:1E3,findNearestPointBy:"x"},{isCartesian:!0,pointClass:a.Point,sorted:!0,requireSorting:!0,directTouch:!1,axisTypes:["xAxis","yAxis"],colorCounter:0,parallelArrays:["x","y"],coll:"series",init:function(a,b){var c=this,d,f=a.series,p;c.chart=a;c.options=b=c.setOptions(b);c.linkedSeries=[];c.bindAxes();e(c,{name:b.name,state:"",visible:!1!==b.visible,selected:!0===b.selected});d=b.events;D(d,function(a,b){C(c,b,a)});if(d&&
d.click||b.point&&b.point.events&&b.point.events.click||b.allowPointSelect)a.runTrackerClick=!0;c.getColor();c.getSymbol();u(c.parallelArrays,function(a){c[a+"Data"]=[]});c.setData(b.data,!1);c.isCartesian&&(a.hasCartesianSeries=!0);f.length&&(p=f[f.length-1]);c._i=H(p&&p._i,-1)+1;a.orderSeries(this.insert(f))},insert:function(a){var b=this.options.index,c;if(w(b)){for(c=a.length;c--;)if(b>=H(a[c].options.index,a[c]._i)){a.splice(c+1,0,this);break}-1===c&&a.unshift(this);c+=1}else a.push(this);return H(c,
a.length-1)},bindAxes:function(){var b=this,c=b.options,d=b.chart,e;u(b.axisTypes||[],function(f){u(d[f],function(a){e=a.options;if(c[f]===e.index||void 0!==c[f]&&c[f]===e.id||void 0===c[f]&&0===e.index)b.insert(a.series),b[f]=a,a.isDirty=!0});b[f]||b.optionalAxis===f||a.error(18,!0)})},updateParallelArrays:function(a,b){var c=a.series,d=arguments,f=w(b)?function(f){var d="y"===f&&c.toYData?c.toYData(a):a[f];c[f+"Data"][b]=d}:function(a){Array.prototype[b].apply(c[a+"Data"],Array.prototype.slice.call(d,
2))};u(c.parallelArrays,f)},autoIncrement:function(){var a=this.options,b=this.xIncrement,c,d=a.pointIntervalUnit,b=H(b,a.pointStart,0);this.pointInterval=c=H(this.pointInterval,a.pointInterval,1);d&&(a=new g(b),"day"===d?a=+a[g.hcSetDate](a[g.hcGetDate]()+c):"month"===d?a=+a[g.hcSetMonth](a[g.hcGetMonth]()+c):"year"===d&&(a=+a[g.hcSetFullYear](a[g.hcGetFullYear]()+c)),c=a-b);this.xIncrement=b+c;return b},setOptions:function(a){var b=this.chart,c=b.options,d=c.plotOptions,f=(b.userOptions||{}).plotOptions||
{},e=d[this.type];this.userOptions=a;b=y(e,d.series,a);this.tooltipOptions=y(k.tooltip,k.plotOptions.series&&k.plotOptions.series.tooltip,k.plotOptions[this.type].tooltip,c.tooltip.userOptions,d.series&&d.series.tooltip,d[this.type].tooltip,a.tooltip);this.stickyTracking=H(a.stickyTracking,f[this.type]&&f[this.type].stickyTracking,f.series&&f.series.stickyTracking,this.tooltipOptions.shared&&!this.noSharedTooltip?!0:b.stickyTracking);null===e.marker&&delete b.marker;this.zoneAxis=b.zoneAxis;a=this.zones=
(b.zones||[]).slice();!b.negativeColor&&!b.negativeFillColor||b.zones||a.push({value:b[this.zoneAxis+"Threshold"]||b.threshold||0,className:"highcharts-negative",color:b.negativeColor,fillColor:b.negativeFillColor});a.length&&v(a[a.length-1].value)&&a.push({color:this.color,fillColor:this.fillColor});return b},getCyclic:function(a,b,c){var d,f=this.chart,e=this.userOptions,p=a+"Index",h=a+"Counter",l=c?c.length:H(f.options.chart[a+"Count"],f[a+"Count"]);b||(d=H(e[p],e["_"+p]),v(d)||(f.series.length||
(f[h]=0),e["_"+p]=d=f[h]%l,f[h]+=1),c&&(b=c[d]));void 0!==d&&(this[p]=d);this[a]=b},getColor:function(){this.options.colorByPoint?this.options.color=null:this.getCyclic("color",this.options.color||q[this.type].color,this.chart.options.colors)},getSymbol:function(){this.getCyclic("symbol",this.options.marker.symbol,this.chart.options.symbols)},drawLegendSymbol:a.LegendSymbolMixin.drawLineMarker,setData:function(d,e,h,l){var f=this,p=f.points,g=p&&p.length||0,r,n=f.options,k=f.chart,m=null,q=f.xAxis,
E=n.turboThreshold,z=this.xData,y=this.yData,I=(r=f.pointArrayMap)&&r.length;d=d||[];r=d.length;e=H(e,!0);if(!1!==l&&r&&g===r&&!f.cropped&&!f.hasGroupedData&&f.visible)u(d,function(a,b){p[b].update&&a!==n.data[b]&&p[b].update(a,!1,null,!1)});else{f.xIncrement=null;f.colorCounter=0;u(this.parallelArrays,function(a){f[a+"Data"].length=0});if(E&&r>E){for(h=0;null===m&&h<r;)m=d[h],h++;if(w(m))for(h=0;h<r;h++)z[h]=this.autoIncrement(),y[h]=d[h];else if(c(m))if(I)for(h=0;h<r;h++)m=d[h],z[h]=m[0],y[h]=m.slice(1,
I+1);else for(h=0;h<r;h++)m=d[h],z[h]=m[0],y[h]=m[1];else a.error(12)}else for(h=0;h<r;h++)void 0!==d[h]&&(m={series:f},f.pointClass.prototype.applyOptions.apply(m,[d[h]]),f.updateParallelArrays(m,h));b(y[0])&&a.error(14,!0);f.data=[];f.options.data=f.userOptions.data=d;for(h=g;h--;)p[h]&&p[h].destroy&&p[h].destroy();q&&(q.minRange=q.userMinRange);f.isDirty=k.isDirtyBox=!0;f.isDirtyData=!!p;h=!1}"point"===n.legendType&&(this.processData(),this.generatePoints());e&&k.redraw(h)},processData:function(b){var c=
this.xData,d=this.yData,e=c.length,f;f=0;var h,p,l=this.xAxis,g,r=this.options;g=r.cropThreshold;var n=this.getExtremesFromAll||r.getExtremesFromAll,k=this.isCartesian,r=l&&l.val2lin,m=l&&l.isLog,q,w;if(k&&!this.isDirty&&!l.isDirty&&!this.yAxis.isDirty&&!b)return!1;l&&(b=l.getExtremes(),q=b.min,w=b.max);if(k&&this.sorted&&!n&&(!g||e>g||this.forceCrop))if(c[e-1]<q||c[0]>w)c=[],d=[];else if(c[0]<q||c[e-1]>w)f=this.cropData(this.xData,this.yData,q,w),c=f.xData,d=f.yData,f=f.start,h=!0;for(g=c.length||
1;--g;)e=m?r(c[g])-r(c[g-1]):c[g]-c[g-1],0<e&&(void 0===p||e<p)?p=e:0>e&&this.requireSorting&&a.error(15);this.cropped=h;this.cropStart=f;this.processedXData=c;this.processedYData=d;this.closestPointRange=p},cropData:function(a,b,c,d){var f=a.length,e=0,h=f,p=H(this.cropShoulder,1),l;for(l=0;l<f;l++)if(a[l]>=c){e=Math.max(0,l-p);break}for(c=l;c<f;c++)if(a[c]>d){h=c+p;break}return{xData:a.slice(e,h),yData:b.slice(e,h),start:e,end:h}},generatePoints:function(){var a=this.options,b=a.data,c=this.data,
d,f=this.processedXData,e=this.processedYData,h=this.pointClass,l=f.length,g=this.cropStart||0,r,n=this.hasGroupedData,a=a.keys,k,m=[],q;c||n||(c=[],c.length=b.length,c=this.data=c);a&&n&&(this.options.keys=!1);for(q=0;q<l;q++)r=g+q,n?(k=(new h).init(this,[f[q]].concat(B(e[q]))),k.dataGroup=this.groupMap[q]):(k=c[r])||void 0===b[r]||(c[r]=k=(new h).init(this,b[r],f[q])),k&&(k.index=r,m[q]=k);this.options.keys=a;if(c&&(l!==(d=c.length)||n))for(q=0;q<d;q++)q!==g||n||(q+=l),c[q]&&(c[q].destroyElements(),
c[q].plotX=void 0);this.data=c;this.points=m},getExtremes:function(a){var b=this.yAxis,d=this.processedXData,e,f=[],h=0;e=this.xAxis.getExtremes();var p=e.min,l=e.max,g,r,n,k;a=a||this.stackedYData||this.processedYData||[];e=a.length;for(k=0;k<e;k++)if(r=d[k],n=a[k],g=(w(n,!0)||c(n))&&(!b.positiveValuesOnly||n.length||0<n),r=this.getExtremesFromAll||this.options.getExtremesFromAll||this.cropped||(d[k]||r)>=p&&(d[k]||r)<=l,g&&r)if(g=n.length)for(;g--;)null!==n[g]&&(f[h++]=n[g]);else f[h++]=n;this.dataMin=
F(f);this.dataMax=G(f)},translate:function(){this.processedXData||this.processData();this.generatePoints();var a=this.options,b=a.stacking,c=this.xAxis,d=c.categories,f=this.yAxis,e=this.points,h=e.length,l=!!this.modifyValue,g=a.pointPlacement,r="between"===g||w(g),n=a.threshold,k=a.startFromThreshold?n:0,q,z,y,B,u=Number.MAX_VALUE;"between"===g&&(g=.5);w(g)&&(g*=H(a.pointRange||c.pointRange));for(a=0;a<h;a++){var D=e[a],M=D.x,A=D.y;z=D.low;var C=b&&f.stacks[(this.negStacks&&A<(k?0:n)?"-":"")+this.stackKey],
F;f.positiveValuesOnly&&null!==A&&0>=A&&(D.isNull=!0);D.plotX=q=m(Math.min(Math.max(-1E5,c.translate(M,0,0,0,1,g,"flags"===this.type)),1E5));b&&this.visible&&!D.isNull&&C&&C[M]&&(B=this.getStackIndicator(B,M,this.index),F=C[M],A=F.points[B.key],z=A[0],A=A[1],z===k&&B.key===C[M].base&&(z=H(n,f.min)),f.positiveValuesOnly&&0>=z&&(z=null),D.total=D.stackTotal=F.total,D.percentage=F.total&&D.y/F.total*100,D.stackY=A,F.setOffset(this.pointXOffset||0,this.barW||0));D.yBottom=v(z)?f.translate(z,0,1,0,1):
null;l&&(A=this.modifyValue(A,D));D.plotY=z="number"===typeof A&&Infinity!==A?Math.min(Math.max(-1E5,f.translate(A,0,1,0,1)),1E5):void 0;D.isInside=void 0!==z&&0<=z&&z<=f.len&&0<=q&&q<=c.len;D.clientX=r?m(c.translate(M,0,0,0,1,g)):q;D.negative=D.y<(n||0);D.category=d&&void 0!==d[D.x]?d[D.x]:D.x;D.isNull||(void 0!==y&&(u=Math.min(u,Math.abs(q-y))),y=q);D.zone=this.zones.length&&D.getZone()}this.closestPointRangePx=u},getValidPoints:function(a,b){var c=this.chart;return d(a||this.points||[],function(a){return b&&
!c.isInsidePlot(a.plotX,a.plotY,c.inverted)?!1:!a.isNull})},setClip:function(a){var b=this.chart,c=this.options,d=b.renderer,f=b.inverted,e=this.clipBox,h=e||b.clipBox,l=this.sharedClipKey||["_sharedClip",a&&a.duration,a&&a.easing,h.height,c.xAxis,c.yAxis].join(),g=b[l],p=b[l+"m"];g||(a&&(h.width=0,b[l+"m"]=p=d.clipRect(-99,f?-b.plotLeft:-b.plotTop,99,f?b.chartWidth:b.chartHeight)),b[l]=g=d.clipRect(h),g.count={length:0});a&&!g.count[this.index]&&(g.count[this.index]=!0,g.count.length+=1);!1!==c.clip&&
(this.group.clip(a||e?g:b.clipRect),this.markerGroup.clip(p),this.sharedClipKey=l);a||(g.count[this.index]&&(delete g.count[this.index],--g.count.length),0===g.count.length&&l&&b[l]&&(e||(b[l]=b[l].destroy()),b[l+"m"]&&(b[l+"m"]=b[l+"m"].destroy())))},animate:function(a){var b=this.chart,c=A(this.options.animation),d;a?this.setClip(c):(d=this.sharedClipKey,(a=b[d])&&a.animate({width:b.plotSizeX},c),b[d+"m"]&&b[d+"m"].animate({width:b.plotSizeX+99},c),this.animate=null)},afterAnimate:function(){this.setClip();
n(this,"afterAnimate")},drawPoints:function(){var a=this.points,b=this.chart,c,d,f,e,h=this.options.marker,l,g,r,n,k=this[this.specialGroup]||this.markerGroup,m=H(h.enabled,this.xAxis.isRadial?!0:null,this.closestPointRangePx>=2*h.radius);if(!1!==h.enabled||this._hasPointMarkers)for(d=0;d<a.length;d++)f=a[d],c=f.plotY,e=f.graphic,l=f.marker||{},g=!!f.marker,r=m&&void 0===l.enabled||l.enabled,n=f.isInside,r&&w(c)&&null!==f.y?(c=H(l.symbol,this.symbol),f.hasImage=0===c.indexOf("url"),r=this.markerAttribs(f,
f.selected&&"select"),e?e[n?"show":"hide"](!0).animate(r):n&&(0<r.width||f.hasImage)&&(f.graphic=e=b.renderer.symbol(c,r.x,r.y,r.width,r.height,g?l:h).add(k)),e&&e.attr(this.pointAttribs(f,f.selected&&"select")),e&&e.addClass(f.getClassName(),!0)):e&&(f.graphic=e.destroy())},markerAttribs:function(a,b){var c=this.options.marker,d=a.marker||{},f=H(d.radius,c.radius);b&&(c=c.states[b],b=d.states&&d.states[b],f=H(b&&b.radius,c&&c.radius,f+(c&&c.radiusPlus||0)));a.hasImage&&(f=0);a={x:Math.floor(a.plotX)-
f,y:a.plotY-f};f&&(a.width=a.height=2*f);return a},pointAttribs:function(a,b){var c=this.options.marker,d=a&&a.options,f=d&&d.marker||{},e=this.color,h=d&&d.color,l=a&&a.color,d=H(f.lineWidth,c.lineWidth);a=a&&a.zone&&a.zone.color;e=h||a||l||e;a=f.fillColor||c.fillColor||e;e=f.lineColor||c.lineColor||e;b&&(c=c.states[b],b=f.states&&f.states[b]||{},d=H(b.lineWidth,c.lineWidth,d+H(b.lineWidthPlus,c.lineWidthPlus,0)),a=b.fillColor||c.fillColor||a,e=b.lineColor||c.lineColor||e);return{stroke:e,"stroke-width":d,
fill:a}},destroy:function(){var a=this,b=a.chart,c=/AppleWebKit\/533/.test(M.navigator.userAgent),d,f,e=a.data||[],g,k;n(a,"destroy");l(a);u(a.axisTypes||[],function(b){(k=a[b])&&k.series&&(h(k.series,a),k.isDirty=k.forceRedraw=!0)});a.legendItem&&a.chart.legend.destroyItem(a);for(f=e.length;f--;)(g=e[f])&&g.destroy&&g.destroy();a.points=null;clearTimeout(a.animationTimeout);D(a,function(a,b){a instanceof r&&!a.survive&&(d=c&&"group"===b?"hide":"destroy",a[d]())});b.hoverSeries===a&&(b.hoverSeries=
null);h(b.series,a);b.orderSeries();D(a,function(b,c){delete a[c]})},getGraphPath:function(a,b,c){var d=this,f=d.options,e=f.step,h,l=[],g=[],p;a=a||d.points;(h=a.reversed)&&a.reverse();(e={right:1,center:2}[e]||e&&3)&&h&&(e=4-e);!f.connectNulls||b||c||(a=this.getValidPoints(a));u(a,function(h,r){var n=h.plotX,k=h.plotY,m=a[r-1];(h.leftCliff||m&&m.rightCliff)&&!c&&(p=!0);h.isNull&&!v(b)&&0<r?p=!f.connectNulls:h.isNull&&!b?p=!0:(0===r||p?r=["M",h.plotX,h.plotY]:d.getPointSpline?r=d.getPointSpline(a,
h,r):e?(r=1===e?["L",m.plotX,k]:2===e?["L",(m.plotX+n)/2,m.plotY,"L",(m.plotX+n)/2,k]:["L",n,m.plotY],r.push("L",n,k)):r=["L",n,k],g.push(h.x),e&&g.push(h.x),l.push.apply(l,r),p=!1)});l.xMap=g;return d.graphPath=l},drawGraph:function(){var a=this,b=this.options,c=(this.gappedPath||this.getGraphPath).call(this),d=[["graph","highcharts-graph",b.lineColor||this.color,b.dashStyle]];u(this.zones,function(c,e){d.push(["zone-graph-"+e,"highcharts-graph highcharts-zone-graph-"+e+" "+(c.className||""),c.color||
a.color,c.dashStyle||b.dashStyle])});u(d,function(f,d){var e=f[0],h=a[e];h?(h.endX=c.xMap,h.animate({d:c})):c.length&&(a[e]=a.chart.renderer.path(c).addClass(f[1]).attr({zIndex:1}).add(a.group),h={stroke:f[2],"stroke-width":b.lineWidth,fill:a.fillGraph&&a.color||"none"},f[3]?h.dashstyle=f[3]:"square"!==b.linecap&&(h["stroke-linecap"]=h["stroke-linejoin"]="round"),h=a[e].attr(h).shadow(2>d&&b.shadow));h&&(h.startX=c.xMap,h.isArea=c.isArea)})},applyZones:function(){var a=this,b=this.chart,c=b.renderer,
d=this.zones,f,e,h=this.clips||[],l,g=this.graph,r=this.area,n=Math.max(b.chartWidth,b.chartHeight),k=this[(this.zoneAxis||"y")+"Axis"],m,q,w=b.inverted,z,y,B,v,D=!1;d.length&&(g||r)&&k&&void 0!==k.min&&(q=k.reversed,z=k.horiz,g&&g.hide(),r&&r.hide(),m=k.getExtremes(),u(d,function(d,p){f=q?z?b.plotWidth:0:z?0:k.toPixels(m.min);f=Math.min(Math.max(H(e,f),0),n);e=Math.min(Math.max(Math.round(k.toPixels(H(d.value,m.max),!0)),0),n);D&&(f=e=k.toPixels(m.max));y=Math.abs(f-e);B=Math.min(f,e);v=Math.max(f,
e);k.isXAxis?(l={x:w?v:B,y:0,width:y,height:n},z||(l.x=b.plotHeight-l.x)):(l={x:0,y:w?v:B,width:n,height:y},z&&(l.y=b.plotWidth-l.y));w&&c.isVML&&(l=k.isXAxis?{x:0,y:q?B:v,height:l.width,width:b.chartWidth}:{x:l.y-b.plotLeft-b.spacingBox.x,y:0,width:l.height,height:b.chartHeight});h[p]?h[p].animate(l):(h[p]=c.clipRect(l),g&&a["zone-graph-"+p].clip(h[p]),r&&a["zone-area-"+p].clip(h[p]));D=d.value>m.max}),this.clips=h)},invertGroups:function(a){function b(){u(["group","markerGroup"],function(b){c[b]&&
(d.renderer.isVML&&c[b].attr({width:c.yAxis.len,height:c.xAxis.len}),c[b].width=c.yAxis.len,c[b].height=c.xAxis.len,c[b].invert(a))})}var c=this,d=c.chart,f;c.xAxis&&(f=C(d,"resize",b),C(c,"destroy",f),b(a),c.invertGroups=b)},plotGroup:function(a,b,c,d,f){var e=this[a],h=!e;h&&(this[a]=e=this.chart.renderer.g().attr({zIndex:d||.1}).add(f));e.addClass("highcharts-"+b+" highcharts-series-"+this.index+" highcharts-"+this.type+"-series highcharts-color-"+this.colorIndex+" "+(this.options.className||""),
!0);e.attr({visibility:c})[h?"attr":"animate"](this.getPlotBox());return e},getPlotBox:function(){var a=this.chart,b=this.xAxis,c=this.yAxis;a.inverted&&(b=c,c=this.xAxis);return{translateX:b?b.left:a.plotLeft,translateY:c?c.top:a.plotTop,scaleX:1,scaleY:1}},render:function(){var a=this,b=a.chart,c,d=a.options,f=!!a.animate&&b.renderer.isSVG&&A(d.animation).duration,e=a.visible?"inherit":"hidden",h=d.zIndex,l=a.hasRendered,g=b.seriesGroup,r=b.inverted;c=a.plotGroup("group","series",e,h,g);a.markerGroup=
a.plotGroup("markerGroup","markers",e,h,g);f&&a.animate(!0);c.inverted=a.isCartesian?r:!1;a.drawGraph&&(a.drawGraph(),a.applyZones());a.drawDataLabels&&a.drawDataLabels();a.visible&&a.drawPoints();a.drawTracker&&!1!==a.options.enableMouseTracking&&a.drawTracker();a.invertGroups(r);!1===d.clip||a.sharedClipKey||l||c.clip(b.clipRect);f&&a.animate();l||(a.animationTimeout=z(function(){a.afterAnimate()},f));a.isDirty=!1;a.hasRendered=!0},redraw:function(){var a=this.chart,b=this.isDirty||this.isDirtyData,
c=this.group,d=this.xAxis,f=this.yAxis;c&&(a.inverted&&c.attr({width:a.plotWidth,height:a.plotHeight}),c.animate({translateX:H(d&&d.left,a.plotLeft),translateY:H(f&&f.top,a.plotTop)}));this.translate();this.render();b&&delete this.kdTree},kdAxisArray:["clientX","plotY"],searchPoint:function(a,b){var c=this.xAxis,d=this.yAxis,f=this.chart.inverted;return this.searchKDTree({clientX:f?c.len-a.chartY+c.pos:a.chartX-c.pos,plotY:f?d.len-a.chartX+d.pos:a.chartY-d.pos},b)},buildKDTree:function(){function a(c,
f,d){var e,h;if(h=c&&c.length)return e=b.kdAxisArray[f%d],c.sort(function(a,b){return a[e]-b[e]}),h=Math.floor(h/2),{point:c[h],left:a(c.slice(0,h),f+1,d),right:a(c.slice(h+1),f+1,d)}}this.buildingKdTree=!0;var b=this,c=-1<b.options.findNearestPointBy.indexOf("y")?2:1;delete b.kdTree;z(function(){b.kdTree=a(b.getValidPoints(null,!b.directTouch),c,c);b.buildingKdTree=!1},b.options.kdNow?0:1)},searchKDTree:function(a,b){function c(a,b,l,g){var r=b.point,p=d.kdAxisArray[l%g],n,k,m=r;k=v(a[f])&&v(r[f])?
Math.pow(a[f]-r[f],2):null;n=v(a[e])&&v(r[e])?Math.pow(a[e]-r[e],2):null;n=(k||0)+(n||0);r.dist=v(n)?Math.sqrt(n):Number.MAX_VALUE;r.distX=v(k)?Math.sqrt(k):Number.MAX_VALUE;p=a[p]-r[p];n=0>p?"left":"right";k=0>p?"right":"left";b[n]&&(n=c(a,b[n],l+1,g),m=n[h]<m[h]?n:r);b[k]&&Math.sqrt(p*p)<m[h]&&(a=c(a,b[k],l+1,g),m=a[h]<m[h]?a:m);return m}var d=this,f=this.kdAxisArray[0],e=this.kdAxisArray[1],h=b?"distX":"dist";b=-1<d.options.findNearestPointBy.indexOf("y")?2:1;this.kdTree||this.buildingKdTree||
this.buildKDTree();if(this.kdTree)return c(a,this.kdTree,b,b)}})})(K);(function(a){function C(a,e,g,d,c){var h=a.chart.inverted;this.axis=a;this.isNegative=g;this.options=e;this.x=d;this.total=null;this.points={};this.stack=c;this.rightCliff=this.leftCliff=0;this.alignOptions={align:e.align||(h?g?"left":"right":"center"),verticalAlign:e.verticalAlign||(h?"middle":g?"bottom":"top"),y:u(e.y,h?4:g?14:-6),x:u(e.x,h?g?-6:6:0)};this.textAlign=e.textAlign||(h?g?"right":"left":"center")}var A=a.Axis,G=a.Chart,
F=a.correctFloat,m=a.defined,g=a.destroyObjectProperties,k=a.each,q=a.format,v=a.objectEach,u=a.pick;a=a.Series;C.prototype={destroy:function(){g(this,this.axis)},render:function(a){var e=this.options,h=e.format,h=h?q(h,this):e.formatter.call(this);this.label?this.label.attr({text:h,visibility:"hidden"}):this.label=this.axis.chart.renderer.text(h,null,null,e.useHTML).css(e.style).attr({align:this.textAlign,rotation:e.rotation,visibility:"hidden"}).add(a)},setOffset:function(a,e){var h=this.axis,d=
h.chart,c=d.inverted,g=h.reversed,g=this.isNegative&&!g||!this.isNegative&&g,b=h.translate(h.usePercentage?100:this.total,0,0,0,1),h=h.translate(0),h=Math.abs(b-h);a=d.xAxis[0].translate(this.x)+a;var k=d.plotHeight,c={x:c?g?b:b-h:a,y:c?k-a-e:g?k-b-h:k-b,width:c?h:e,height:c?e:h};if(e=this.label)e.align(this.alignOptions,null,c),c=e.alignAttr,e[!1===this.options.crop||d.isInsidePlot(c.x,c.y)?"show":"hide"](!0)}};G.prototype.getStacks=function(){var a=this;k(a.yAxis,function(a){a.stacks&&a.hasVisibleSeries&&
(a.oldStacks=a.stacks)});k(a.series,function(e){!e.options.stacking||!0!==e.visible&&!1!==a.options.chart.ignoreHiddenSeries||(e.stackKey=e.type+u(e.options.stack,""))})};A.prototype.buildStacks=function(){var a=this.series,e,g=u(this.options.reversedStacks,!0),d=a.length,c;if(!this.isXAxis){this.usePercentage=!1;for(c=d;c--;)a[g?c:d-c-1].setStackedPoints();for(c=d;c--;)e=a[g?c:d-c-1],e.setStackCliffs&&e.setStackCliffs();if(this.usePercentage)for(c=0;c<d;c++)a[c].setPercentStacks()}};A.prototype.renderStackTotals=
function(){var a=this.chart,e=a.renderer,g=this.stacks,d=this.stackTotalGroup;d||(this.stackTotalGroup=d=e.g("stack-labels").attr({visibility:"visible",zIndex:6}).add());d.translate(a.plotLeft,a.plotTop);v(g,function(a){v(a,function(a){a.render(d)})})};A.prototype.resetStacks=function(){var a=this,e=a.stacks;a.isXAxis||v(e,function(e){v(e,function(d,c){d.touched<a.stacksTouched?(d.destroy(),delete e[c]):(d.total=null,d.cum=null)})})};A.prototype.cleanStacks=function(){var a;this.isXAxis||(this.oldStacks&&
(a=this.stacks=this.oldStacks),v(a,function(a){v(a,function(a){a.cum=a.total})}))};a.prototype.setStackedPoints=function(){if(this.options.stacking&&(!0===this.visible||!1===this.chart.options.chart.ignoreHiddenSeries)){var a=this.processedXData,e=this.processedYData,g=[],d=e.length,c=this.options,k=c.threshold,b=c.startFromThreshold?k:0,q=c.stack,c=c.stacking,v=this.stackKey,H="-"+v,l=this.negStacks,B=this.yAxis,r=B.stacks,z=B.oldStacks,M,p,E,I,A,f,t;B.stacksTouched+=1;for(A=0;A<d;A++)f=a[A],t=e[A],
M=this.getStackIndicator(M,f,this.index),I=M.key,E=(p=l&&t<(b?0:k))?H:v,r[E]||(r[E]={}),r[E][f]||(z[E]&&z[E][f]?(r[E][f]=z[E][f],r[E][f].total=null):r[E][f]=new C(B,B.options.stackLabels,p,f,q)),E=r[E][f],null!==t&&(E.points[I]=E.points[this.index]=[u(E.cum,b)],m(E.cum)||(E.base=I),E.touched=B.stacksTouched,0<M.index&&!1===this.singleStacks&&(E.points[I][0]=E.points[this.index+","+f+",0"][0])),"percent"===c?(p=p?v:H,l&&r[p]&&r[p][f]?(p=r[p][f],E.total=p.total=Math.max(p.total,E.total)+Math.abs(t)||
0):E.total=F(E.total+(Math.abs(t)||0))):E.total=F(E.total+(t||0)),E.cum=u(E.cum,b)+(t||0),null!==t&&(E.points[I].push(E.cum),g[A]=E.cum);"percent"===c&&(B.usePercentage=!0);this.stackedYData=g;B.oldStacks={}}};a.prototype.setPercentStacks=function(){var a=this,e=a.stackKey,g=a.yAxis.stacks,d=a.processedXData,c;k([e,"-"+e],function(e){for(var b=d.length,h,k;b--;)if(h=d[b],c=a.getStackIndicator(c,h,a.index,e),h=(k=g[e]&&g[e][h])&&k.points[c.key])k=k.total?100/k.total:0,h[0]=F(h[0]*k),h[1]=F(h[1]*k),
a.stackedYData[b]=h[1]})};a.prototype.getStackIndicator=function(a,e,g,d){!m(a)||a.x!==e||d&&a.key!==d?a={x:e,index:0,key:d}:a.index++;a.key=[g,e,a.index].join();return a}})(K);(function(a){var C=a.addEvent,A=a.animate,G=a.Axis,F=a.createElement,m=a.css,g=a.defined,k=a.each,q=a.erase,v=a.extend,u=a.fireEvent,h=a.inArray,e=a.isNumber,n=a.isObject,d=a.isArray,c=a.merge,w=a.objectEach,b=a.pick,y=a.Point,D=a.Series,H=a.seriesTypes,l=a.setAnimation,B=a.splat;v(a.Chart.prototype,{addSeries:function(a,c,
d){var e,h=this;a&&(c=b(c,!0),u(h,"addSeries",{options:a},function(){e=h.initSeries(a);h.isDirtyLegend=!0;h.linkSeries();c&&h.redraw(d)}));return e},addAxis:function(a,d,e,h){var g=d?"xAxis":"yAxis",l=this.options;a=c(a,{index:this[g].length,isX:d});new G(this,a);l[g]=B(l[g]||{});l[g].push(a);b(e,!0)&&this.redraw(h)},showLoading:function(a){var b=this,c=b.options,d=b.loadingDiv,e=c.loading,h=function(){d&&m(d,{left:b.plotLeft+"px",top:b.plotTop+"px",width:b.plotWidth+"px",height:b.plotHeight+"px"})};
d||(b.loadingDiv=d=F("div",{className:"highcharts-loading highcharts-loading-hidden"},null,b.container),b.loadingSpan=F("span",{className:"highcharts-loading-inner"},null,d),C(b,"redraw",h));d.className="highcharts-loading";b.loadingSpan.innerHTML=a||c.lang.loading;m(d,v(e.style,{zIndex:10}));m(b.loadingSpan,e.labelStyle);b.loadingShown||(m(d,{opacity:0,display:""}),A(d,{opacity:e.style.opacity||.5},{duration:e.showDuration||0}));b.loadingShown=!0;h()},hideLoading:function(){var a=this.options,b=
this.loadingDiv;b&&(b.className="highcharts-loading highcharts-loading-hidden",A(b,{opacity:0},{duration:a.loading.hideDuration||100,complete:function(){m(b,{display:"none"})}}));this.loadingShown=!1},propsRequireDirtyBox:"backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),propsRequireUpdateSeries:"chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions tooltip".split(" "),
update:function(a,d){var l=this,r={credits:"addCredits",title:"setTitle",subtitle:"setSubtitle"},n=a.chart,m,q;if(n){c(!0,l.options.chart,n);"className"in n&&l.setClassName(n.className);if("inverted"in n||"polar"in n)l.propFromSeries(),m=!0;"alignTicks"in n&&(m=!0);w(n,function(a,b){-1!==h("chart."+b,l.propsRequireUpdateSeries)&&(q=!0);-1!==h(b,l.propsRequireDirtyBox)&&(l.isDirtyBox=!0)});"style"in n&&l.renderer.setStyle(n.style)}a.colors&&(this.options.colors=a.colors);a.plotOptions&&c(!0,this.options.plotOptions,
a.plotOptions);w(a,function(a,b){if(l[b]&&"function"===typeof l[b].update)l[b].update(a,!1);else if("function"===typeof l[r[b]])l[r[b]](a);"chart"!==b&&-1!==h(b,l.propsRequireUpdateSeries)&&(q=!0)});k("xAxis yAxis zAxis series colorAxis pane".split(" "),function(b){a[b]&&k(B(a[b]),function(a,c){(c=g(a.id)&&l.get(a.id)||l[b][c])&&c.coll===b&&c.update(a,!1)})});m&&k(l.axes,function(a){a.update({},!1)});q&&k(l.series,function(a){a.update({},!1)});a.loading&&c(!0,l.options.loading,a.loading);m=n&&n.width;
n=n&&n.height;e(m)&&m!==l.chartWidth||e(n)&&n!==l.chartHeight?l.setSize(m,n):b(d,!0)&&l.redraw()},setSubtitle:function(a){this.setTitle(void 0,a)}});v(y.prototype,{update:function(a,c,d,e){function h(){l.applyOptions(a);null===l.y&&f&&(l.graphic=f.destroy());n(a,!0)&&(f&&f.element&&a&&a.marker&&a.marker.symbol&&(l.graphic=f.destroy()),a&&a.dataLabels&&l.dataLabel&&(l.dataLabel=l.dataLabel.destroy()));r=l.index;g.updateParallelArrays(l,r);p.data[r]=n(p.data[r],!0)||n(a,!0)?l.options:a;g.isDirty=g.isDirtyData=
!0;!g.fixedBox&&g.hasCartesianSeries&&(k.isDirtyBox=!0);"point"===p.legendType&&(k.isDirtyLegend=!0);c&&k.redraw(d)}var l=this,g=l.series,f=l.graphic,r,k=g.chart,p=g.options;c=b(c,!0);!1===e?h():l.firePointEvent("update",{options:a},h)},remove:function(a,b){this.series.removePoint(h(this,this.series.data),a,b)}});v(D.prototype,{addPoint:function(a,c,d,e){var h=this.options,l=this.data,g=this.chart,f=this.xAxis,f=f&&f.hasNames&&f.names,r=h.data,k,p,n=this.xData,m,q;c=b(c,!0);k={series:this};this.pointClass.prototype.applyOptions.apply(k,
[a]);q=k.x;m=n.length;if(this.requireSorting&&q<n[m-1])for(p=!0;m&&n[m-1]>q;)m--;this.updateParallelArrays(k,"splice",m,0,0);this.updateParallelArrays(k,m);f&&k.name&&(f[q]=k.name);r.splice(m,0,a);p&&(this.data.splice(m,0,null),this.processData());"point"===h.legendType&&this.generatePoints();d&&(l[0]&&l[0].remove?l[0].remove(!1):(l.shift(),this.updateParallelArrays(k,"shift"),r.shift()));this.isDirtyData=this.isDirty=!0;c&&g.redraw(e)},removePoint:function(a,c,d){var e=this,h=e.data,g=h[a],k=e.points,
f=e.chart,r=function(){k&&k.length===h.length&&k.splice(a,1);h.splice(a,1);e.options.data.splice(a,1);e.updateParallelArrays(g||{series:e},"splice",a,1);g&&g.destroy();e.isDirty=!0;e.isDirtyData=!0;c&&f.redraw()};l(d,f);c=b(c,!0);g?g.firePointEvent("remove",null,r):r()},remove:function(a,c,d){function e(){h.destroy();l.isDirtyLegend=l.isDirtyBox=!0;l.linkSeries();b(a,!0)&&l.redraw(c)}var h=this,l=h.chart;!1!==d?u(h,"remove",null,e):e()},update:function(a,d){var e=this,h=e.chart,l=e.userOptions,g=
e.oldType||e.type,r=a.type||l.type||h.options.chart.type,f=H[g].prototype,n=["group","markerGroup","dataLabelsGroup"],m;if(Object.keys&&"data"===Object.keys(a).toString())return this.setData(a.data,d);if(r&&r!==g||void 0!==a.zIndex)n.length=0;k(n,function(a){n[a]=e[a];delete e[a]});a=c(l,{animation:!1,index:e.index,pointStart:e.xData[0]},{data:e.options.data},a);e.remove(!1,null,!1);for(m in f)e[m]=void 0;v(e,H[r||g].prototype);k(n,function(a){e[a]=n[a]});e.init(h,a);e.oldType=g;h.linkSeries();b(d,
!0)&&h.redraw(!1)}});v(G.prototype,{update:function(a,d){var e=this.chart;a=e.options[this.coll][this.options.index]=c(this.userOptions,a);this.destroy(!0);this.init(e,v(a,{events:void 0}));e.isDirtyBox=!0;b(d,!0)&&e.redraw()},remove:function(a){for(var c=this.chart,e=this.coll,h=this.series,l=h.length;l--;)h[l]&&h[l].remove(!1);q(c.axes,this);q(c[e],this);d(c.options[e])?c.options[e].splice(this.options.index,1):delete c.options[e];k(c[e],function(a,b){a.options.index=b});this.destroy();c.isDirtyBox=
!0;b(a,!0)&&c.redraw()},setTitle:function(a,b){this.update({title:a},b)},setCategories:function(a,b){this.update({categories:a},b)}})})(K);(function(a){var C=a.color,A=a.each,G=a.map,F=a.pick,m=a.Series,g=a.seriesType;g("area","line",{softThreshold:!1,threshold:0},{singleStacks:!1,getStackPoints:function(){var g=[],m=[],v=this.xAxis,u=this.yAxis,h=u.stacks[this.stackKey],e={},n=this.points,d=this.index,c=u.series,w=c.length,b,y=F(u.options.reversedStacks,!0)?1:-1,D;if(this.options.stacking){for(D=
0;D<n.length;D++)e[n[D].x]=n[D];a.objectEach(h,function(a,b){null!==a.total&&m.push(b)});m.sort(function(a,b){return a-b});b=G(c,function(){return this.visible});A(m,function(a,c){var l=0,k,n;if(e[a]&&!e[a].isNull)g.push(e[a]),A([-1,1],function(l){var g=1===l?"rightNull":"leftNull",r=0,q=h[m[c+l]];if(q)for(D=d;0<=D&&D<w;)k=q.points[D],k||(D===d?e[a][g]=!0:b[D]&&(n=h[a].points[D])&&(r-=n[1]-n[0])),D+=y;e[a][1===l?"rightCliff":"leftCliff"]=r});else{for(D=d;0<=D&&D<w;){if(k=h[a].points[D]){l=k[1];break}D+=
y}l=u.translate(l,0,1,0,1);g.push({isNull:!0,plotX:v.translate(a,0,0,0,1),x:a,plotY:l,yBottom:l})}})}return g},getGraphPath:function(a){var g=m.prototype.getGraphPath,k=this.options,u=k.stacking,h=this.yAxis,e,n,d=[],c=[],w=this.index,b,y=h.stacks[this.stackKey],D=k.threshold,A=h.getThreshold(k.threshold),l,k=k.connectNulls||"percent"===u,B=function(e,l,g){var k=a[e];e=u&&y[k.x].points[w];var n=k[g+"Null"]||0;g=k[g+"Cliff"]||0;var r,m,k=!0;g||n?(r=(n?e[0]:e[1])+g,m=e[0]+g,k=!!n):!u&&a[l]&&a[l].isNull&&
(r=m=D);void 0!==r&&(c.push({plotX:b,plotY:null===r?A:h.getThreshold(r),isNull:k,isCliff:!0}),d.push({plotX:b,plotY:null===m?A:h.getThreshold(m),doCurve:!1}))};a=a||this.points;u&&(a=this.getStackPoints());for(e=0;e<a.length;e++)if(n=a[e].isNull,b=F(a[e].rectPlotX,a[e].plotX),l=F(a[e].yBottom,A),!n||k)k||B(e,e-1,"left"),n&&!u&&k||(c.push(a[e]),d.push({x:e,plotX:b,plotY:l})),k||B(e,e+1,"right");e=g.call(this,c,!0,!0);d.reversed=!0;n=g.call(this,d,!0,!0);n.length&&(n[0]="L");n=e.concat(n);g=g.call(this,
c,!1,k);n.xMap=e.xMap;this.areaPath=n;return g},drawGraph:function(){this.areaPath=[];m.prototype.drawGraph.apply(this);var a=this,g=this.areaPath,v=this.options,u=[["area","highcharts-area",this.color,v.fillColor]];A(this.zones,function(h,e){u.push(["zone-area-"+e,"highcharts-area highcharts-zone-area-"+e+" "+h.className,h.color||a.color,h.fillColor||v.fillColor])});A(u,function(h){var e=h[0],k=a[e];k?(k.endX=g.xMap,k.animate({d:g})):(k=a[e]=a.chart.renderer.path(g).addClass(h[1]).attr({fill:F(h[3],
C(h[2]).setOpacity(F(v.fillOpacity,.75)).get()),zIndex:0}).add(a.group),k.isArea=!0);k.startX=g.xMap;k.shiftUnit=v.step?2:1})},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})})(K);(function(a){var C=a.pick;a=a.seriesType;a("spline","line",{},{getPointSpline:function(a,G,F){var m=G.plotX,g=G.plotY,k=a[F-1];F=a[F+1];var q,v,u,h;if(k&&!k.isNull&&!1!==k.doCurve&&!G.isCliff&&F&&!F.isNull&&!1!==F.doCurve&&!G.isCliff){a=k.plotY;u=F.plotX;F=F.plotY;var e=0;q=(1.5*m+k.plotX)/2.5;v=(1.5*g+a)/2.5;u=(1.5*
m+u)/2.5;h=(1.5*g+F)/2.5;u!==q&&(e=(h-v)*(u-m)/(u-q)+g-h);v+=e;h+=e;v>a&&v>g?(v=Math.max(a,g),h=2*g-v):v<a&&v<g&&(v=Math.min(a,g),h=2*g-v);h>F&&h>g?(h=Math.max(F,g),v=2*g-h):h<F&&h<g&&(h=Math.min(F,g),v=2*g-h);G.rightContX=u;G.rightContY=h}G=["C",C(k.rightContX,k.plotX),C(k.rightContY,k.plotY),C(q,m),C(v,g),m,g];k.rightContX=k.rightContY=null;return G}})})(K);(function(a){var C=a.seriesTypes.area.prototype,A=a.seriesType;A("areaspline","spline",a.defaultPlotOptions.area,{getStackPoints:C.getStackPoints,
getGraphPath:C.getGraphPath,setStackCliffs:C.setStackCliffs,drawGraph:C.drawGraph,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})})(K);(function(a){var C=a.animObject,A=a.color,G=a.each,F=a.extend,m=a.isNumber,g=a.merge,k=a.pick,q=a.Series,v=a.seriesType,u=a.svg;v("column","line",{borderRadius:0,crisp:!0,groupPadding:.2,marker:null,pointPadding:.1,minPointLength:0,cropThreshold:50,pointRange:null,states:{hover:{halo:!1,brightness:.1,shadow:!1},select:{color:"#cccccc",borderColor:"#000000",shadow:!1}},
dataLabels:{align:null,verticalAlign:null,y:null},softThreshold:!1,startFromThreshold:!0,stickyTracking:!1,tooltip:{distance:6},threshold:0,borderColor:"#ffffff"},{cropShoulder:0,directTouch:!0,trackerGroups:["group","dataLabelsGroup"],negStacks:!0,init:function(){q.prototype.init.apply(this,arguments);var a=this,e=a.chart;e.hasRendered&&G(e.series,function(e){e.type===a.type&&(e.isDirty=!0)})},getColumnMetrics:function(){var a=this,e=a.options,g=a.xAxis,d=a.yAxis,c=g.reversed,m,b={},q=0;!1===e.grouping?
q=1:G(a.chart.series,function(c){var e=c.options,g=c.yAxis,h;c.type!==a.type||!c.visible&&a.chart.options.chart.ignoreHiddenSeries||d.len!==g.len||d.pos!==g.pos||(e.stacking?(m=c.stackKey,void 0===b[m]&&(b[m]=q++),h=b[m]):!1!==e.grouping&&(h=q++),c.columnIndex=h)});var u=Math.min(Math.abs(g.transA)*(g.ordinalSlope||e.pointRange||g.closestPointRange||g.tickInterval||1),g.len),v=u*e.groupPadding,l=(u-2*v)/(q||1),e=Math.min(e.maxPointWidth||g.len,k(e.pointWidth,l*(1-2*e.pointPadding)));a.columnMetrics=
{width:e,offset:(l-e)/2+(v+((a.columnIndex||0)+(c?1:0))*l-u/2)*(c?-1:1)};return a.columnMetrics},crispCol:function(a,e,g,d){var c=this.chart,h=this.borderWidth,b=-(h%2?.5:0),h=h%2?.5:1;c.inverted&&c.renderer.isVML&&(h+=1);this.options.crisp&&(g=Math.round(a+g)+b,a=Math.round(a)+b,g-=a);d=Math.round(e+d)+h;b=.5>=Math.abs(e)&&.5<d;e=Math.round(e)+h;d-=e;b&&d&&(--e,d+=1);return{x:a,y:e,width:g,height:d}},translate:function(){var a=this,e=a.chart,g=a.options,d=a.dense=2>a.closestPointRange*a.xAxis.transA,
d=a.borderWidth=k(g.borderWidth,d?0:1),c=a.yAxis,m=a.translatedThreshold=c.getThreshold(g.threshold),b=k(g.minPointLength,5),y=a.getColumnMetrics(),u=y.width,v=a.barW=Math.max(u,1+2*d),l=a.pointXOffset=y.offset;e.inverted&&(m-=.5);g.pointPadding&&(v=Math.ceil(v));q.prototype.translate.apply(a);G(a.points,function(d){var g=k(d.yBottom,m),h=999+Math.abs(g),h=Math.min(Math.max(-h,d.plotY),c.len+h),n=d.plotX+l,p=v,q=Math.min(h,g),w,y=Math.max(h,g)-q;Math.abs(y)<b&&b&&(y=b,w=!c.reversed&&!d.negative||
c.reversed&&d.negative,q=Math.abs(q-m)>b?g-b:m-(w?b:0));d.barX=n;d.pointWidth=u;d.tooltipPos=e.inverted?[c.len+c.pos-e.plotLeft-h,a.xAxis.len-n-p/2,y]:[n+p/2,h+c.pos-e.plotTop,y];d.shapeType="rect";d.shapeArgs=a.crispCol.apply(a,d.isNull?[n,m,p,0]:[n,q,p,y])})},getSymbol:a.noop,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,drawGraph:function(){this.group[this.dense?"addClass":"removeClass"]("highcharts-dense-data")},pointAttribs:function(a,e){var h=this.options,d,c=this.pointAttrToOptions||{};
d=c.stroke||"borderColor";var k=c["stroke-width"]||"borderWidth",b=a&&a.color||this.color,m=a[d]||h[d]||this.color||b,q=a[k]||h[k]||this[k]||0,c=h.dashStyle;a&&this.zones.length&&(b=a.getZone(),b=a.options.color||b&&b.color||this.color);e&&(a=g(h.states[e],a.options.states&&a.options.states[e]||{}),e=a.brightness,b=a.color||void 0!==e&&A(b).brighten(a.brightness).get()||b,m=a[d]||m,q=a[k]||q,c=a.dashStyle||c);d={fill:b,stroke:m,"stroke-width":q};h.borderRadius&&(d.r=h.borderRadius);c&&(d.dashstyle=
c);return d},drawPoints:function(){var a=this,e=this.chart,k=a.options,d=e.renderer,c=k.animationLimit||250,q;G(a.points,function(b){var h=b.graphic;if(m(b.plotY)&&null!==b.y){q=b.shapeArgs;if(h)h[e.pointCount<c?"animate":"attr"](g(q));else b.graphic=h=d[b.shapeType](q).add(b.group||a.group);h.attr(a.pointAttribs(b,b.selected&&"select")).shadow(k.shadow,null,k.stacking&&!k.borderRadius);h.addClass(b.getClassName(),!0)}else h&&(b.graphic=h.destroy())})},animate:function(a){var e=this,g=this.yAxis,
d=e.options,c=this.chart.inverted,h={};u&&(a?(h.scaleY=.001,a=Math.min(g.pos+g.len,Math.max(g.pos,g.toPixels(d.threshold))),c?h.translateX=a-g.len:h.translateY=a,e.group.attr(h)):(h[c?"translateX":"translateY"]=g.pos,e.group.animate(h,F(C(e.options.animation),{step:function(a,c){e.group.attr({scaleY:Math.max(.001,c.pos)})}})),e.animate=null))},remove:function(){var a=this,e=a.chart;e.hasRendered&&G(e.series,function(e){e.type===a.type&&(e.isDirty=!0)});q.prototype.remove.apply(a,arguments)}})})(K);
(function(a){a=a.seriesType;a("bar","column",null,{inverted:!0})})(K);(function(a){var C=a.Series;a=a.seriesType;a("scatter","line",{lineWidth:0,findNearestPointBy:"xy",marker:{enabled:!0},tooltip:{headerFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 0.85em"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',pointFormat:"x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"}},{sorted:!1,requireSorting:!1,noSharedTooltip:!0,
trackerGroups:["group","markerGroup","dataLabelsGroup"],takeOrdinalPosition:!1,drawGraph:function(){this.options.lineWidth&&C.prototype.drawGraph.call(this)}})})(K);(function(a){var C=a.pick,A=a.relativeLength;a.CenteredSeriesMixin={getCenter:function(){var a=this.options,F=this.chart,m=2*(a.slicedOffset||0),g=F.plotWidth-2*m,F=F.plotHeight-2*m,k=a.center,k=[C(k[0],"50%"),C(k[1],"50%"),a.size||"100%",a.innerSize||0],q=Math.min(g,F),v,u;for(v=0;4>v;++v)u=k[v],a=2>v||2===v&&/%$/.test(u),k[v]=A(u,[g,
F,q,k[2]][v])+(a?m:0);k[3]>k[2]&&(k[3]=k[2]);return k}}})(K);(function(a){var C=a.addEvent,A=a.defined,G=a.each,F=a.extend,m=a.inArray,g=a.noop,k=a.pick,q=a.Point,v=a.Series,u=a.seriesType,h=a.setAnimation;u("pie","line",{center:[null,null],clip:!1,colorByPoint:!0,dataLabels:{distance:30,enabled:!0,formatter:function(){return this.point.isNull?void 0:this.point.name},x:0},ignoreHiddenPoint:!0,legendType:"point",marker:null,size:null,showInLegend:!1,slicedOffset:10,stickyTracking:!1,tooltip:{followPointer:!0},
borderColor:"#ffffff",borderWidth:1,states:{hover:{brightness:.1,shadow:!1}}},{isCartesian:!1,requireSorting:!1,directTouch:!0,noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],axisTypes:[],pointAttribs:a.seriesTypes.column.prototype.pointAttribs,animate:function(a){var e=this,d=e.points,c=e.startAngleRad;a||(G(d,function(a){var b=a.graphic,d=a.shapeArgs;b&&(b.attr({r:a.startR||e.center[3]/2,start:c,end:c}),b.animate({r:d.r,start:d.start,end:d.end},e.options.animation))}),e.animate=null)},
updateTotals:function(){var a,g=0,d=this.points,c=d.length,h,b=this.options.ignoreHiddenPoint;for(a=0;a<c;a++)h=d[a],g+=b&&!h.visible?0:h.isNull?0:h.y;this.total=g;for(a=0;a<c;a++)h=d[a],h.percentage=0<g&&(h.visible||!b)?h.y/g*100:0,h.total=g},generatePoints:function(){v.prototype.generatePoints.call(this);this.updateTotals()},translate:function(a){this.generatePoints();var e=0,d=this.options,c=d.slicedOffset,g=c+(d.borderWidth||0),b,h,m,q=d.startAngle||0,l=this.startAngleRad=Math.PI/180*(q-90),q=
(this.endAngleRad=Math.PI/180*(k(d.endAngle,q+360)-90))-l,u=this.points,r,z=d.dataLabels.distance,d=d.ignoreHiddenPoint,v,p=u.length,E;a||(this.center=a=this.getCenter());this.getX=function(b,c,d){m=Math.asin(Math.min((b-a[1])/(a[2]/2+d.labelDistance),1));return a[0]+(c?-1:1)*Math.cos(m)*(a[2]/2+d.labelDistance)};for(v=0;v<p;v++){E=u[v];E.labelDistance=k(E.options.dataLabels&&E.options.dataLabels.distance,z);this.maxLabelDistance=Math.max(this.maxLabelDistance||0,E.labelDistance);b=l+e*q;if(!d||E.visible)e+=
E.percentage/100;h=l+e*q;E.shapeType="arc";E.shapeArgs={x:a[0],y:a[1],r:a[2]/2,innerR:a[3]/2,start:Math.round(1E3*b)/1E3,end:Math.round(1E3*h)/1E3};m=(h+b)/2;m>1.5*Math.PI?m-=2*Math.PI:m<-Math.PI/2&&(m+=2*Math.PI);E.slicedTranslation={translateX:Math.round(Math.cos(m)*c),translateY:Math.round(Math.sin(m)*c)};h=Math.cos(m)*a[2]/2;r=Math.sin(m)*a[2]/2;E.tooltipPos=[a[0]+.7*h,a[1]+.7*r];E.half=m<-Math.PI/2||m>Math.PI/2?1:0;E.angle=m;b=Math.min(g,E.labelDistance/5);E.labelPos=[a[0]+h+Math.cos(m)*E.labelDistance,
a[1]+r+Math.sin(m)*E.labelDistance,a[0]+h+Math.cos(m)*b,a[1]+r+Math.sin(m)*b,a[0]+h,a[1]+r,0>E.labelDistance?"center":E.half?"right":"left",m]}},drawGraph:null,drawPoints:function(){var a=this,g=a.chart.renderer,d,c,h,b,k=a.options.shadow;k&&!a.shadowGroup&&(a.shadowGroup=g.g("shadow").add(a.group));G(a.points,function(e){if(!e.isNull){c=e.graphic;b=e.shapeArgs;d=e.getTranslate();var m=e.shadowGroup;k&&!m&&(m=e.shadowGroup=g.g("shadow").add(a.shadowGroup));m&&m.attr(d);h=a.pointAttribs(e,e.selected&&
"select");c?c.setRadialReference(a.center).attr(h).animate(F(b,d)):(e.graphic=c=g[e.shapeType](b).setRadialReference(a.center).attr(d).add(a.group),e.visible||c.attr({visibility:"hidden"}),c.attr(h).attr({"stroke-linejoin":"round"}).shadow(k,m));c.addClass(e.getClassName())}})},searchPoint:g,sortByAngle:function(a,g){a.sort(function(a,c){return void 0!==a.angle&&(c.angle-a.angle)*g})},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,getCenter:a.CenteredSeriesMixin.getCenter,getSymbol:g},{init:function(){q.prototype.init.apply(this,
arguments);var a=this,g;a.name=k(a.name,"Slice");g=function(d){a.slice("select"===d.type)};C(a,"select",g);C(a,"unselect",g);return a},isValid:function(){return a.isNumber(this.y,!0)&&0<=this.y},setVisible:function(a,g){var d=this,c=d.series,e=c.chart,b=c.options.ignoreHiddenPoint;g=k(g,b);a!==d.visible&&(d.visible=d.options.visible=a=void 0===a?!d.visible:a,c.options.data[m(d,c.data)]=d.options,G(["graphic","dataLabel","connector","shadowGroup"],function(b){if(d[b])d[b][a?"show":"hide"](!0)}),d.legendItem&&
e.legend.colorizeItem(d,a),a||"hover"!==d.state||d.setState(""),b&&(c.isDirty=!0),g&&e.redraw())},slice:function(a,g,d){var c=this.series;h(d,c.chart);k(g,!0);this.sliced=this.options.sliced=A(a)?a:!this.sliced;c.options.data[m(this,c.data)]=this.options;this.graphic.animate(this.getTranslate());this.shadowGroup&&this.shadowGroup.animate(this.getTranslate())},getTranslate:function(){return this.sliced?this.slicedTranslation:{translateX:0,translateY:0}},haloPath:function(a){var e=this.shapeArgs;return this.sliced||
!this.visible?[]:this.series.chart.renderer.symbols.arc(e.x,e.y,e.r+a,e.r+a,{innerR:this.shapeArgs.r,start:e.start,end:e.end})}})})(K);(function(a){var C=a.addEvent,A=a.arrayMax,G=a.defined,F=a.each,m=a.extend,g=a.format,k=a.map,q=a.merge,v=a.noop,u=a.pick,h=a.relativeLength,e=a.Series,n=a.seriesTypes,d=a.stableSort;a.distribute=function(a,e){function b(a,b){return a.target-b.target}var c,g=!0,h=a,l=[],m;m=0;for(c=a.length;c--;)m+=a[c].size;if(m>e){d(a,function(a,b){return(b.rank||0)-(a.rank||0)});
for(m=c=0;m<=e;)m+=a[c].size,c++;l=a.splice(c-1,a.length)}d(a,b);for(a=k(a,function(a){return{size:a.size,targets:[a.target]}});g;){for(c=a.length;c--;)g=a[c],m=(Math.min.apply(0,g.targets)+Math.max.apply(0,g.targets))/2,g.pos=Math.min(Math.max(0,m-g.size/2),e-g.size);c=a.length;for(g=!1;c--;)0<c&&a[c-1].pos+a[c-1].size>a[c].pos&&(a[c-1].size+=a[c].size,a[c-1].targets=a[c-1].targets.concat(a[c].targets),a[c-1].pos+a[c-1].size>e&&(a[c-1].pos=e-a[c-1].size),a.splice(c,1),g=!0)}c=0;F(a,function(a){var b=
0;F(a.targets,function(){h[c].pos=a.pos+b;b+=h[c].size;c++})});h.push.apply(h,l);d(h,b)};e.prototype.drawDataLabels=function(){var c=this,d=c.options,b=d.dataLabels,e=c.points,h,k,l=c.hasRendered||0,m,r,n=u(b.defer,!!d.animation),v=c.chart.renderer;if(b.enabled||c._hasPointLabels)c.dlProcessOptions&&c.dlProcessOptions(b),r=c.plotGroup("dataLabelsGroup","data-labels",n&&!l?"hidden":"visible",b.zIndex||6),n&&(r.attr({opacity:+l}),l||C(c,"afterAnimate",function(){c.visible&&r.show(!0);r[d.animation?
"animate":"attr"]({opacity:1},{duration:200})})),k=b,F(e,function(e){var l,p=e.dataLabel,n,f,t=e.connector,w=!p,z;h=e.dlOptions||e.options&&e.options.dataLabels;if(l=u(h&&h.enabled,k.enabled)&&null!==e.y)b=q(k,h),n=e.getLabelConfig(),m=b.format?g(b.format,n):b.formatter.call(n,b),z=b.style,n=b.rotation,z.color=u(b.color,z.color,c.color,"#000000"),"contrast"===z.color&&(e.contrastColor=v.getContrast(e.color||c.color),z.color=b.inside||0>u(e.labelDistance,b.distance)||d.stacking?e.contrastColor:"#000000"),
d.cursor&&(z.cursor=d.cursor),f={fill:b.backgroundColor,stroke:b.borderColor,"stroke-width":b.borderWidth,r:b.borderRadius||0,rotation:n,padding:b.padding,zIndex:1},a.objectEach(f,function(a,b){void 0===a&&delete f[b]});!p||l&&G(m)?l&&G(m)&&(p?f.text=m:(p=e.dataLabel=v[n?"text":"label"](m,0,-9999,b.shape,null,null,b.useHTML,null,"data-label"),p.addClass("highcharts-data-label-color-"+e.colorIndex+" "+(b.className||"")+(b.useHTML?"highcharts-tracker":""))),p.attr(f),p.css(z).shadow(b.shadow),p.added||
p.add(r),c.alignDataLabel(e,p,b,null,w)):(e.dataLabel=p=p.destroy(),t&&(e.connector=t.destroy()))})};e.prototype.alignDataLabel=function(a,d,b,e,g){var c=this.chart,h=c.inverted,k=u(a.plotX,-9999),r=u(a.plotY,-9999),n=d.getBBox(),q,p=b.rotation,w=b.align,v=this.visible&&(a.series.forceDL||c.isInsidePlot(k,Math.round(r),h)||e&&c.isInsidePlot(k,h?e.x+1:e.y+e.height-1,h)),y="justify"===u(b.overflow,"justify");if(v&&(q=b.style.fontSize,q=c.renderer.fontMetrics(q,d).b,e=m({x:h?c.plotWidth-r:k,y:Math.round(h?
c.plotHeight-k:r),width:0,height:0},e),m(b,{width:n.width,height:n.height}),p?(y=!1,k=c.renderer.rotCorr(q,p),k={x:e.x+b.x+e.width/2+k.x,y:e.y+b.y+{top:0,middle:.5,bottom:1}[b.verticalAlign]*e.height},d[g?"attr":"animate"](k).attr({align:w}),r=(p+720)%360,r=180<r&&360>r,"left"===w?k.y-=r?n.height:0:"center"===w?(k.x-=n.width/2,k.y-=n.height/2):"right"===w&&(k.x-=n.width,k.y-=r?0:n.height)):(d.align(b,null,e),k=d.alignAttr),y?a.isLabelJustified=this.justifyDataLabel(d,b,k,n,e,g):u(b.crop,!0)&&(v=c.isInsidePlot(k.x,
k.y)&&c.isInsidePlot(k.x+n.width,k.y+n.height)),b.shape&&!p))d[g?"attr":"animate"]({anchorX:h?c.plotWidth-a.plotY:a.plotX,anchorY:h?c.plotHeight-a.plotX:a.plotY});v||(d.attr({y:-9999}),d.placed=!1)};e.prototype.justifyDataLabel=function(a,d,b,e,g,h){var c=this.chart,k=d.align,m=d.verticalAlign,n,q,p=a.box?0:a.padding||0;n=b.x+p;0>n&&("right"===k?d.align="left":d.x=-n,q=!0);n=b.x+e.width-p;n>c.plotWidth&&("left"===k?d.align="right":d.x=c.plotWidth-n,q=!0);n=b.y+p;0>n&&("bottom"===m?d.verticalAlign=
"top":d.y=-n,q=!0);n=b.y+e.height-p;n>c.plotHeight&&("top"===m?d.verticalAlign="bottom":d.y=c.plotHeight-n,q=!0);q&&(a.placed=!h,a.align(d,null,g));return q};n.pie&&(n.pie.prototype.drawDataLabels=function(){var c=this,d=c.data,b,g=c.chart,h=c.options.dataLabels,k=u(h.connectorPadding,10),l=u(h.connectorWidth,1),m=g.plotWidth,r=g.plotHeight,n,q=c.center,p=q[2]/2,v=q[1],C,L,f,t,K=[[],[]],J,N,O,P,x=[0,0,0,0];c.visible&&(h.enabled||c._hasPointLabels)&&(F(d,function(a){a.dataLabel&&a.visible&&a.dataLabel.shortened&&
(a.dataLabel.attr({width:"auto"}).css({width:"auto",textOverflow:"clip"}),a.dataLabel.shortened=!1)}),e.prototype.drawDataLabels.apply(c),F(d,function(a){a.dataLabel&&a.visible&&(K[a.half].push(a),a.dataLabel._pos=null)}),F(K,function(d,e){var l,n,u=d.length,w=[],z;if(u)for(c.sortByAngle(d,e-.5),0<c.maxLabelDistance&&(l=Math.max(0,v-p-c.maxLabelDistance),n=Math.min(v+p+c.maxLabelDistance,g.plotHeight),F(d,function(a){0<a.labelDistance&&a.dataLabel&&(a.top=Math.max(0,v-p-a.labelDistance),a.bottom=
Math.min(v+p+a.labelDistance,g.plotHeight),z=a.dataLabel.getBBox().height||21,a.positionsIndex=w.push({target:a.labelPos[1]-a.top+z/2,size:z,rank:a.y})-1)}),a.distribute(w,n+z-l)),P=0;P<u;P++)b=d[P],n=b.positionsIndex,f=b.labelPos,C=b.dataLabel,O=!1===b.visible?"hidden":"inherit",l=f[1],w&&G(w[n])?void 0===w[n].pos?O="hidden":(t=w[n].size,N=b.top+w[n].pos):N=l,delete b.positionIndex,J=h.justify?q[0]+(e?-1:1)*(p+b.labelDistance):c.getX(N<b.top+2||N>b.bottom-2?l:N,e,b),C._attr={visibility:O,align:f[6]},
C._pos={x:J+h.x+({left:k,right:-k}[f[6]]||0),y:N+h.y-10},f.x=J,f.y=N,L=C.getBBox().width,l=null,J-L<k?(l=Math.round(L-J+k),x[3]=Math.max(l,x[3])):J+L>m-k&&(l=Math.round(J+L-m+k),x[1]=Math.max(l,x[1])),0>N-t/2?x[0]=Math.max(Math.round(-N+t/2),x[0]):N+t/2>r&&(x[2]=Math.max(Math.round(N+t/2-r),x[2])),C.sideOverflow=l}),0===A(x)||this.verifyDataLabelOverflow(x))&&(this.placeDataLabels(),l&&F(this.points,function(a){var b;n=a.connector;if((C=a.dataLabel)&&C._pos&&a.visible&&0<a.labelDistance){O=C._attr.visibility;
if(b=!n)a.connector=n=g.renderer.path().addClass("highcharts-data-label-connector highcharts-color-"+a.colorIndex).add(c.dataLabelsGroup),n.attr({"stroke-width":l,stroke:h.connectorColor||a.color||"#666666"});n[b?"attr":"animate"]({d:c.connectorPath(a.labelPos)});n.attr("visibility",O)}else n&&(a.connector=n.destroy())}))},n.pie.prototype.connectorPath=function(a){var c=a.x,b=a.y;return u(this.options.dataLabels.softConnector,!0)?["M",c+("left"===a[6]?5:-5),b,"C",c,b,2*a[2]-a[4],2*a[3]-a[5],a[2],
a[3],"L",a[4],a[5]]:["M",c+("left"===a[6]?5:-5),b,"L",a[2],a[3],"L",a[4],a[5]]},n.pie.prototype.placeDataLabels=function(){F(this.points,function(a){var c=a.dataLabel;c&&a.visible&&((a=c._pos)?(c.sideOverflow&&(c._attr.width=c.getBBox().width-c.sideOverflow,c.css({width:c._attr.width+"px",textOverflow:"ellipsis"}),c.shortened=!0),c.attr(c._attr),c[c.moved?"animate":"attr"](a),c.moved=!0):c&&c.attr({y:-9999}))},this)},n.pie.prototype.alignDataLabel=v,n.pie.prototype.verifyDataLabelOverflow=function(a){var c=
this.center,b=this.options,d=b.center,e=b.minSize||80,g,l=null!==b.size;l||(null!==d[0]?g=Math.max(c[2]-Math.max(a[1],a[3]),e):(g=Math.max(c[2]-a[1]-a[3],e),c[0]+=(a[3]-a[1])/2),null!==d[1]?g=Math.max(Math.min(g,c[2]-Math.max(a[0],a[2])),e):(g=Math.max(Math.min(g,c[2]-a[0]-a[2]),e),c[1]+=(a[0]-a[2])/2),g<c[2]?(c[2]=g,c[3]=Math.min(h(b.innerSize||0,g),g),this.translate(c),this.drawDataLabels&&this.drawDataLabels()):l=!0);return l});n.column&&(n.column.prototype.alignDataLabel=function(a,d,b,g,h){var c=
this.chart.inverted,l=a.series,k=a.dlBox||a.shapeArgs,m=u(a.below,a.plotY>u(this.translatedThreshold,l.yAxis.len)),n=u(b.inside,!!this.options.stacking);k&&(g=q(k),0>g.y&&(g.height+=g.y,g.y=0),k=g.y+g.height-l.yAxis.len,0<k&&(g.height-=k),c&&(g={x:l.yAxis.len-g.y-g.height,y:l.xAxis.len-g.x-g.width,width:g.height,height:g.width}),n||(c?(g.x+=m?0:g.width,g.width=0):(g.y+=m?g.height:0,g.height=0)));b.align=u(b.align,!c||n?"center":m?"right":"left");b.verticalAlign=u(b.verticalAlign,c||n?"middle":m?"top":
"bottom");e.prototype.alignDataLabel.call(this,a,d,b,g,h);a.isLabelJustified&&a.contrastColor&&a.dataLabel.css({color:a.contrastColor})})})(K);(function(a){var C=a.Chart,A=a.each,G=a.pick,F=a.addEvent;C.prototype.callbacks.push(function(a){function g(){var g=[];A(a.series||[],function(a){var k=a.options.dataLabels,m=a.dataLabelCollections||["dataLabel"];(k.enabled||a._hasPointLabels)&&!k.allowOverlap&&a.visible&&A(m,function(h){A(a.points,function(a){a[h]&&(a[h].labelrank=G(a.labelrank,a.shapeArgs&&
a.shapeArgs.height),g.push(a[h]))})})});a.hideOverlappingLabels(g)}g();F(a,"redraw",g)});C.prototype.hideOverlappingLabels=function(a){var g=a.length,k,m,v,u,h,e,n,d,c,w=function(a,c,d,e,g,h,k,m){return!(g>a+d||g+k<a||h>c+e||h+m<c)};for(m=0;m<g;m++)if(k=a[m])k.oldOpacity=k.opacity,k.newOpacity=1;a.sort(function(a,c){return(c.labelrank||0)-(a.labelrank||0)});for(m=0;m<g;m++)for(v=a[m],k=m+1;k<g;++k)if(u=a[k],v&&u&&v!==u&&v.placed&&u.placed&&0!==v.newOpacity&&0!==u.newOpacity&&(h=v.alignAttr,e=u.alignAttr,
n=v.parentGroup,d=u.parentGroup,c=2*(v.box?0:v.padding),h=w(h.x+n.translateX,h.y+n.translateY,v.width-c,v.height-c,e.x+d.translateX,e.y+d.translateY,u.width-c,u.height-c)))(v.labelrank<u.labelrank?v:u).newOpacity=0;A(a,function(a){var b,c;a&&(c=a.newOpacity,a.oldOpacity!==c&&a.placed&&(c?a.show(!0):b=function(){a.hide()},a.alignAttr.opacity=c,a[a.isOld?"animate":"attr"](a.alignAttr,null,b)),a.isOld=!0)})}})(K);(function(a){var C=a.addEvent,A=a.Chart,G=a.createElement,F=a.css,m=a.defaultOptions,g=
a.defaultPlotOptions,k=a.each,q=a.extend,v=a.fireEvent,u=a.hasTouch,h=a.inArray,e=a.isObject,n=a.Legend,d=a.merge,c=a.pick,w=a.Point,b=a.Series,y=a.seriesTypes,D=a.svg,H;H=a.TrackerMixin={drawTrackerPoint:function(){var a=this,b=a.chart.pointer,c=function(a){var c=b.getPointFromEvent(a);void 0!==c&&(b.isDirectTouch=!0,c.onMouseOver(a))};k(a.points,function(a){a.graphic&&(a.graphic.element.point=a);a.dataLabel&&(a.dataLabel.div?a.dataLabel.div.point=a:a.dataLabel.element.point=a)});a._hasTracking||
(k(a.trackerGroups,function(d){if(a[d]){a[d].addClass("highcharts-tracker").on("mouseover",c).on("mouseout",function(a){b.onTrackerMouseOut(a)});if(u)a[d].on("touchstart",c);a.options.cursor&&a[d].css(F).css({cursor:a.options.cursor})}}),a._hasTracking=!0)},drawTrackerGraph:function(){var a=this,b=a.options,c=b.trackByArea,d=[].concat(c?a.areaPath:a.graphPath),e=d.length,g=a.chart,h=g.pointer,m=g.renderer,n=g.options.tooltip.snap,f=a.tracker,q,v=function(){if(g.hoverSeries!==a)a.onMouseOver()},w=
"rgba(192,192,192,"+(D?.0001:.002)+")";if(e&&!c)for(q=e+1;q--;)"M"===d[q]&&d.splice(q+1,0,d[q+1]-n,d[q+2],"L"),(q&&"M"===d[q]||q===e)&&d.splice(q,0,"L",d[q-2]+n,d[q-1]);f?f.attr({d:d}):a.graph&&(a.tracker=m.path(d).attr({"stroke-linejoin":"round",visibility:a.visible?"visible":"hidden",stroke:w,fill:c?w:"none","stroke-width":a.graph.strokeWidth()+(c?0:2*n),zIndex:2}).add(a.group),k([a.tracker,a.markerGroup],function(a){a.addClass("highcharts-tracker").on("mouseover",v).on("mouseout",function(a){h.onTrackerMouseOut(a)});
b.cursor&&a.css({cursor:b.cursor});if(u)a.on("touchstart",v)}))}};y.column&&(y.column.prototype.drawTracker=H.drawTrackerPoint);y.pie&&(y.pie.prototype.drawTracker=H.drawTrackerPoint);y.scatter&&(y.scatter.prototype.drawTracker=H.drawTrackerPoint);q(n.prototype,{setItemEvents:function(a,b,c){var e=this,g=e.chart.renderer.boxWrapper,h="highcharts-legend-"+(a.series?"point":"series")+"-active";(c?b:a.legendGroup).on("mouseover",function(){a.setState("hover");g.addClass(h);b.css(e.options.itemHoverStyle)}).on("mouseout",
function(){b.css(d(a.visible?e.itemStyle:e.itemHiddenStyle));g.removeClass(h);a.setState()}).on("click",function(b){var c=function(){a.setVisible&&a.setVisible()};b={browserEvent:b};a.firePointEvent?a.firePointEvent("legendItemClick",b,c):v(a,"legendItemClick",b,c)})},createCheckboxForItem:function(a){a.checkbox=G("input",{type:"checkbox",checked:a.selected,defaultChecked:a.selected},this.options.itemCheckboxStyle,this.chart.container);C(a.checkbox,"click",function(b){v(a.series||a,"checkboxClick",
{checked:b.target.checked,item:a},function(){a.select()})})}});m.legend.itemStyle.cursor="pointer";q(A.prototype,{showResetZoom:function(){var a=this,b=m.lang,c=a.options.chart.resetZoomButton,d=c.theme,e=d.states,g="chart"===c.relativeTo?null:"plotBox";this.resetZoomButton=a.renderer.button(b.resetZoom,null,null,function(){a.zoomOut()},d,e&&e.hover).attr({align:c.position.align,title:b.resetZoomTitle}).addClass("highcharts-reset-zoom").add().align(c.position,!1,g)},zoomOut:function(){var a=this;
v(a,"selection",{resetSelection:!0},function(){a.zoom()})},zoom:function(a){var b,d=this.pointer,g=!1,h;!a||a.resetSelection?k(this.axes,function(a){b=a.zoom()}):k(a.xAxis.concat(a.yAxis),function(a){var c=a.axis;d[c.isXAxis?"zoomX":"zoomY"]&&(b=c.zoom(a.min,a.max),c.displayBtn&&(g=!0))});h=this.resetZoomButton;g&&!h?this.showResetZoom():!g&&e(h)&&(this.resetZoomButton=h.destroy());b&&this.redraw(c(this.options.chart.animation,a&&a.animation,100>this.pointCount))},pan:function(a,b){var c=this,d=c.hoverPoints,
e;d&&k(d,function(a){a.setState()});k("xy"===b?[1,0]:[1],function(b){b=c[b?"xAxis":"yAxis"][0];var d=b.horiz,g=a[d?"chartX":"chartY"],d=d?"mouseDownX":"mouseDownY",h=c[d],f=(b.pointRange||0)/2,l=b.getExtremes(),k=b.toValue(h-g,!0)+f,f=b.toValue(h+b.len-g,!0)-f,m=f<k,h=m?f:k,k=m?k:f,f=Math.min(l.dataMin,b.toValue(b.toPixels(l.min)-b.minPixelPadding)),m=Math.max(l.dataMax,b.toValue(b.toPixels(l.max)+b.minPixelPadding)),n;n=f-h;0<n&&(k+=n,h=f);n=k-m;0<n&&(k=m,h-=n);b.series.length&&h!==l.min&&k!==l.max&&
(b.setExtremes(h,k,!1,!1,{trigger:"pan"}),e=!0);c[d]=g});e&&c.redraw(!1);F(c.container,{cursor:"move"})}});q(w.prototype,{select:function(a,b){var d=this,e=d.series,g=e.chart;a=c(a,!d.selected);d.firePointEvent(a?"select":"unselect",{accumulate:b},function(){d.selected=d.options.selected=a;e.options.data[h(d,e.data)]=d.options;d.setState(a&&"select");b||k(g.getSelectedPoints(),function(a){a.selected&&a!==d&&(a.selected=a.options.selected=!1,e.options.data[h(a,e.data)]=a.options,a.setState(""),a.firePointEvent("unselect"))})})},
onMouseOver:function(a){var b=this.series.chart,c=b.pointer;a=a?c.normalize(a):c.getChartCoordinatesFromPoint(this,b.inverted);c.runPointActions(a,this)},onMouseOut:function(){var a=this.series.chart;this.firePointEvent("mouseOut");k(a.hoverPoints||[],function(a){a.setState()});a.hoverPoints=a.hoverPoint=null},importEvents:function(){if(!this.hasImportedEvents){var b=this,c=d(b.series.options.point,b.options).events;b.events=c;a.objectEach(c,function(a,c){C(b,c,a)});this.hasImportedEvents=!0}},setState:function(a,
b){var d=Math.floor(this.plotX),e=this.plotY,h=this.series,l=h.options.states[a]||{},k=g[h.type].marker&&h.options.marker,m=k&&!1===k.enabled,n=k&&k.states&&k.states[a]||{},f=!1===n.enabled,t=h.stateMarkerGraphic,u=this.marker||{},v=h.chart,w=h.halo,y,B=k&&h.markerAttribs;a=a||"";if(!(a===this.state&&!b||this.selected&&"select"!==a||!1===l.enabled||a&&(f||m&&!1===n.enabled)||a&&u.states&&u.states[a]&&!1===u.states[a].enabled)){B&&(y=h.markerAttribs(this,a));if(this.graphic)this.state&&this.graphic.removeClass("highcharts-point-"+
this.state),a&&this.graphic.addClass("highcharts-point-"+a),this.graphic.attr(h.pointAttribs(this,a)),y&&this.graphic.animate(y,c(v.options.chart.animation,n.animation,k.animation)),t&&t.hide();else{if(a&&n){k=u.symbol||h.symbol;t&&t.currentSymbol!==k&&(t=t.destroy());if(t)t[b?"animate":"attr"]({x:y.x,y:y.y});else k&&(h.stateMarkerGraphic=t=v.renderer.symbol(k,y.x,y.y,y.width,y.height).add(h.markerGroup),t.currentSymbol=k);t&&t.attr(h.pointAttribs(this,a))}t&&(t[a&&v.isInsidePlot(d,e,v.inverted)?
"show":"hide"](),t.element.point=this)}(d=l.halo)&&d.size?(w||(h.halo=w=v.renderer.path().add((this.graphic||t).parentGroup)),w[b?"animate":"attr"]({d:this.haloPath(d.size)}),w.attr({"class":"highcharts-halo highcharts-color-"+c(this.colorIndex,h.colorIndex)}),w.point=this,w.attr(q({fill:this.color||h.color,"fill-opacity":d.opacity,zIndex:-1},d.attributes))):w&&w.point&&w.point.haloPath&&w.animate({d:w.point.haloPath(0)});this.state=a}},haloPath:function(a){return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX)-
a,this.plotY-a,2*a,2*a)}});q(b.prototype,{onMouseOver:function(){var a=this.chart,b=a.hoverSeries;if(b&&b!==this)b.onMouseOut();this.options.events.mouseOver&&v(this,"mouseOver");this.setState("hover");a.hoverSeries=this},onMouseOut:function(){var a=this.options,b=this.chart,c=b.tooltip,d=b.hoverPoint;b.hoverSeries=null;if(d)d.onMouseOut();this&&a.events.mouseOut&&v(this,"mouseOut");!c||this.stickyTracking||c.shared&&!this.noSharedTooltip||c.hide();this.setState()},setState:function(a){var b=this,
d=b.options,e=b.graph,g=d.states,h=d.lineWidth,d=0;a=a||"";if(b.state!==a&&(k([b.group,b.markerGroup,b.dataLabelsGroup],function(c){c&&(b.state&&c.removeClass("highcharts-series-"+b.state),a&&c.addClass("highcharts-series-"+a))}),b.state=a,!g[a]||!1!==g[a].enabled)&&(a&&(h=g[a].lineWidth||h+(g[a].lineWidthPlus||0)),e&&!e.dashstyle))for(h={"stroke-width":h},e.animate(h,c(b.chart.options.chart.animation,g[a]&&g[a].animation));b["zone-graph-"+d];)b["zone-graph-"+d].attr(h),d+=1},setVisible:function(a,
b){var c=this,d=c.chart,e=c.legendItem,g,h=d.options.chart.ignoreHiddenSeries,l=c.visible;g=(c.visible=a=c.options.visible=c.userOptions.visible=void 0===a?!l:a)?"show":"hide";k(["group","dataLabelsGroup","markerGroup","tracker","tt"],function(a){if(c[a])c[a][g]()});if(d.hoverSeries===c||(d.hoverPoint&&d.hoverPoint.series)===c)c.onMouseOut();e&&d.legend.colorizeItem(c,a);c.isDirty=!0;c.options.stacking&&k(d.series,function(a){a.options.stacking&&a.visible&&(a.isDirty=!0)});k(c.linkedSeries,function(b){b.setVisible(a,
!1)});h&&(d.isDirtyBox=!0);!1!==b&&d.redraw();v(c,g)},show:function(){this.setVisible(!0)},hide:function(){this.setVisible(!1)},select:function(a){this.selected=a=void 0===a?!this.selected:a;this.checkbox&&(this.checkbox.checked=a);v(this,a?"select":"unselect")},drawTracker:H.drawTrackerGraph})})(K);(function(a){var C=a.Chart,A=a.each,G=a.inArray,F=a.isArray,m=a.isObject,g=a.pick,k=a.splat;C.prototype.setResponsive=function(g){var k=this.options.responsive,m=[],h=this.currentResponsive;k&&k.rules&&
A(k.rules,function(e){void 0===e._id&&(e._id=a.uniqueKey());this.matchResponsiveRule(e,m,g)},this);var e=a.merge.apply(0,a.map(m,function(e){return a.find(k.rules,function(a){return a._id===e}).chartOptions})),m=m.toString()||void 0;m!==(h&&h.ruleIds)&&(h&&this.update(h.undoOptions,g),m?(this.currentResponsive={ruleIds:m,mergedOptions:e,undoOptions:this.currentOptions(e)},this.update(e,g)):this.currentResponsive=void 0)};C.prototype.matchResponsiveRule=function(a,k){var m=a.condition;(m.callback||
function(){return this.chartWidth<=g(m.maxWidth,Number.MAX_VALUE)&&this.chartHeight<=g(m.maxHeight,Number.MAX_VALUE)&&this.chartWidth>=g(m.minWidth,0)&&this.chartHeight>=g(m.minHeight,0)}).call(this)&&k.push(a._id)};C.prototype.currentOptions=function(g){function q(g,e,n,d){var c;a.objectEach(g,function(a,b){if(!d&&-1<G(b,["series","xAxis","yAxis"]))for(g[b]=k(g[b]),n[b]=[],c=0;c<g[b].length;c++)e[b][c]&&(n[b][c]={},q(a[c],e[b][c],n[b][c],d+1));else m(a)?(n[b]=F(a)?[]:{},q(a,e[b]||{},n[b],d+1)):n[b]=
e[b]||null})}var u={};q(g,this.options,u,0);return u}})(K);return K});
/*
 * Chartkick.js
 * Create beautiful charts with one line of JavaScript
 * https://github.com/ankane/chartkick.js
 * v2.2.3
 * MIT License
 */

/*jslint browser: true, indent: 2, plusplus: true, vars: true */


(function (window) {
  'use strict';

  var config = window.Chartkick || {};
  var Chartkick, ISO8601_PATTERN, DECIMAL_SEPARATOR, adapters = [];
  var DATE_PATTERN = /^(\d\d\d\d)(\-)?(\d\d)(\-)?(\d\d)$/i;
  var GoogleChartsAdapter, HighchartsAdapter, ChartjsAdapter;
  var pendingRequests = [], runningRequests = 0, maxRequests = 4;

  // helpers

  function isArray(variable) {
    return Object.prototype.toString.call(variable) === "[object Array]";
  }

  function isFunction(variable) {
    return variable instanceof Function;
  }

  function isPlainObject(variable) {
    return !isFunction(variable) && variable instanceof Object;
  }

  // https://github.com/madrobby/zepto/blob/master/src/zepto.js
  function extend(target, source) {
    var key;
    for (key in source) {
      if (isPlainObject(source[key]) || isArray(source[key])) {
        if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
          target[key] = {};
        }
        if (isArray(source[key]) && !isArray(target[key])) {
          target[key] = [];
        }
        extend(target[key], source[key]);
      } else if (source[key] !== undefined) {
        target[key] = source[key];
      }
    }
  }

  function merge(obj1, obj2) {
    var target = {};
    extend(target, obj1);
    extend(target, obj2);
    return target;
  }

  // https://github.com/Do/iso8601.js
  ISO8601_PATTERN = /(\d\d\d\d)(\-)?(\d\d)(\-)?(\d\d)(T)?(\d\d)(:)?(\d\d)?(:)?(\d\d)?([\.,]\d+)?($|Z|([\+\-])(\d\d)(:)?(\d\d)?)/i;
  DECIMAL_SEPARATOR = String(1.5).charAt(1);

  function parseISO8601(input) {
    var day, hour, matches, milliseconds, minutes, month, offset, result, seconds, type, year;
    type = Object.prototype.toString.call(input);
    if (type === "[object Date]") {
      return input;
    }
    if (type !== "[object String]") {
      return;
    }
    matches = input.match(ISO8601_PATTERN);
    if (matches) {
      year = parseInt(matches[1], 10);
      month = parseInt(matches[3], 10) - 1;
      day = parseInt(matches[5], 10);
      hour = parseInt(matches[7], 10);
      minutes = matches[9] ? parseInt(matches[9], 10) : 0;
      seconds = matches[11] ? parseInt(matches[11], 10) : 0;
      milliseconds = matches[12] ? parseFloat(DECIMAL_SEPARATOR + matches[12].slice(1)) * 1000 : 0;
      result = Date.UTC(year, month, day, hour, minutes, seconds, milliseconds);
      if (matches[13] && matches[14]) {
        offset = matches[15] * 60;
        if (matches[17]) {
          offset += parseInt(matches[17], 10);
        }
        offset *= matches[14] === "-" ? -1 : 1;
        result -= offset * 60 * 1000;
      }
      return new Date(result);
    }
  }
  // end iso8601.js

  function negativeValues(series) {
    var i, j, data;
    for (i = 0; i < series.length; i++) {
      data = series[i].data;
      for (j = 0; j < data.length; j++) {
        if (data[j][1] < 0) {
          return true;
        }
      }
    }
    return false;
  }

  function jsOptionsFunc(defaultOptions, hideLegend, setTitle, setMin, setMax, setStacked, setXtitle, setYtitle) {
    return function (chart, opts, chartOptions) {
      var series = chart.data;
      var options = merge({}, defaultOptions);
      options = merge(options, chartOptions || {});

      if (chart.hideLegend || "legend" in opts) {
        hideLegend(options, opts.legend, chart.hideLegend);
      }

      if (opts.title) {
        setTitle(options, opts.title);
      }

      // min
      if ("min" in opts) {
        setMin(options, opts.min);
      } else if (!negativeValues(series)) {
        setMin(options, 0);
      }

      // max
      if (opts.max) {
        setMax(options, opts.max);
      }

      if ("stacked" in opts) {
        setStacked(options, opts.stacked);
      }

      if (opts.colors) {
        options.colors = opts.colors;
      }

      if (opts.xtitle) {
        setXtitle(options, opts.xtitle);
      }

      if (opts.ytitle) {
        setYtitle(options, opts.ytitle);
      }

      // merge library last
      options = merge(options, opts.library || {});

      return options;
    };
  }

  function setText(element, text) {
    if (document.body.innerText) {
      element.innerText = text;
    } else {
      element.textContent = text;
    }
  }

  function chartError(element, message) {
    setText(element, "Error Loading Chart: " + message);
    element.style.color = "#ff0000";
  }

  function pushRequest(element, url, success) {
    pendingRequests.push([element, url, success]);
    runNext();
  }

  function runNext() {
    if (runningRequests < maxRequests) {
      var request = pendingRequests.shift()
      if (request) {
        runningRequests++;
        getJSON(request[0], request[1], request[2]);
        runNext();
      }
    }
  }

  function requestComplete() {
    runningRequests--;
    runNext();
  }

  function getJSON(element, url, success) {
    ajaxCall(url, success, function (jqXHR, textStatus, errorThrown) {
      var message = (typeof errorThrown === "string") ? errorThrown : errorThrown.message;
      chartError(element, message);
    });
  }

  function ajaxCall(url, success, error) {
    var $ = window.jQuery || window.Zepto || window.$;

    if ($) {
      $.ajax({
        dataType: "json",
        url: url,
        success: success,
        error: error,
        complete: requestComplete
      });
    } else {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onload = function () {
        requestComplete();
        if (xhr.status === 200) {
          success(JSON.parse(xhr.responseText), xhr.statusText, xhr);
        } else {
          error(xhr, "error", xhr.statusText);
        }
      };
      xhr.send();
    }
  }

  function errorCatcher(chart, callback) {
    try {
      callback(chart);
    } catch (err) {
      chartError(chart.element, err.message);
      throw err;
    }
  }

  function fetchDataSource(chart, callback, dataSource) {
    if (typeof dataSource === "string") {
      pushRequest(chart.element, dataSource, function (data, textStatus, jqXHR) {
        chart.rawData = data;
        errorCatcher(chart, callback);
      });
    } else {
      chart.rawData = dataSource;
      errorCatcher(chart, callback);
    }
  }

  function addDownloadButton(chart) {
    var element = chart.element;
    var link = document.createElement("a");
    link.download = chart.options.download === true ? "chart.png" : chart.options.download; // http://caniuse.com/download
    link.style.position = "absolute";
    link.style.top = "20px";
    link.style.right = "20px";
    link.style.zIndex = 1000;
    link.style.lineHeight = "20px";
    link.target = "_blank"; // for safari
    var image = document.createElement("img");
    image.alt = "Download";
    image.style.border = "none";
    // icon from font-awesome
    // http://fa2png.io/
    image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAABCFBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMywEsqxAAAAV3RSTlMAAQIDBggJCgsMDQ4PERQaHB0eISIjJCouLzE0OTo/QUJHSUpLTU5PUllhYmltcHh5foWLjI+SlaCio6atr7S1t7m6vsHHyM7R2tze5Obo7fHz9ff5+/1hlxK2AAAA30lEQVQYGUXBhVYCQQBA0TdYWAt2d3d3YWAHyur7/z9xgD16Lw0DW+XKx+1GgX+FRzM3HWQWrHl5N/oapW5RPe0PkBu+UYeICvozTWZVK23Ao04B79oJrOsJDOoxkZoQPWgX29pHpCZEk7rEvQYiNSFq1UMqvlCjJkRBS1R8hb00Vb/TajtBL7nTHE1X1vyMQF732dQhyF2o6SAwrzP06iUQzvwsArlnzcOdrgBhJyHa1QOgO9U1GsKuvjUTjavliZYQ8nNPapG6sap/3nrIdJ6bOWzmX/fy0XVpfzZP3S8OJT3g9EEiJwAAAABJRU5ErkJggg==";
    link.appendChild(image);
    element.style.position = "relative";

    chart.downloadAttached = true;

    // mouseenter
    addEvent(element, "mouseover", function(e) {
      var related = e.relatedTarget;
      // check download option again to ensure it wasn't changed
      if (!related || (related !== this && !childOf(this, related)) && chart.options.download) {
        link.href = chart.toImage();
        element.appendChild(link);
      }
    });

    // mouseleave
    addEvent(element, "mouseout", function(e) {
      var related = e.relatedTarget;
      if (!related || (related !== this && !childOf(this, related))) {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      }
    });
  }

  // http://stackoverflow.com/questions/10149963/adding-event-listener-cross-browser
  function addEvent(elem, event, fn) {
    if (elem.addEventListener) {
      elem.addEventListener(event, fn, false);
    } else {
      elem.attachEvent("on" + event, function() {
        // set the this pointer same as addEventListener when fn is called
        return(fn.call(elem, window.event));
      });
    }
  }

  // https://gist.github.com/shawnbot/4166283
  function childOf(p, c) {
    if (p === c) return false;
    while (c && c !== p) c = c.parentNode;
    return c === p;
  }

  // type conversions

  function toStr(n) {
    return "" + n;
  }

  function toFloat(n) {
    return parseFloat(n);
  }

  function toDate(n) {
    var matches, year, month, day;
    if (typeof n !== "object") {
      if (typeof n === "number") {
        n = new Date(n * 1000); // ms
      } else if ((matches = n.match(DATE_PATTERN))) {
        year = parseInt(matches[1], 10);
        month = parseInt(matches[3], 10) - 1;
        day = parseInt(matches[5], 10);
        return new Date(year, month, day);
      } else { // str
        // try our best to get the str into iso8601
        // TODO be smarter about this
        var str = n.replace(/ /, "T").replace(" ", "").replace("UTC", "Z");
        n = parseISO8601(str) || new Date(n);
      }
    }
    return n;
  }

  function toArr(n) {
    if (!isArray(n)) {
      var arr = [], i;
      for (i in n) {
        if (n.hasOwnProperty(i)) {
          arr.push([i, n[i]]);
        }
      }
      n = arr;
    }
    return n;
  }

  function sortByTime(a, b) {
    return a[0].getTime() - b[0].getTime();
  }

  function sortByNumberSeries(a, b) {
    return a[0] - b[0];
  }

  function sortByNumber(a, b) {
    return a - b;
  }

  function loadAdapters() {
    if (!HighchartsAdapter && "Highcharts" in window) {
      HighchartsAdapter = new function () {
        var Highcharts = window.Highcharts;

        this.name = "highcharts";

        var defaultOptions = {
          chart: {},
          xAxis: {
            title: {
              text: null
            },
            labels: {
              style: {
                fontSize: "12px"
              }
            }
          },
          yAxis: {
            title: {
              text: null
            },
            labels: {
              style: {
                fontSize: "12px"
              }
            }
          },
          title: {
            text: null
          },
          credits: {
            enabled: false
          },
          legend: {
            borderWidth: 0
          },
          tooltip: {
            style: {
              fontSize: "12px"
            }
          },
          plotOptions: {
            areaspline: {},
            series: {
              marker: {}
            }
          }
        };

        var hideLegend = function (options, legend, hideLegend) {
          if (legend !== undefined) {
            options.legend.enabled = !!legend;
            if (legend && legend !== true) {
              if (legend === "top" || legend === "bottom") {
                options.legend.verticalAlign = legend;
              } else {
                options.legend.layout = "vertical";
                options.legend.verticalAlign = "middle";
                options.legend.align = legend;
              }
            }
          } else if (hideLegend) {
            options.legend.enabled = false;
          }
        };

        var setTitle = function (options, title) {
          options.title.text = title;
        };

        var setMin = function (options, min) {
          options.yAxis.min = min;
        };

        var setMax = function (options, max) {
          options.yAxis.max = max;
        };

        var setStacked = function (options, stacked) {
          options.plotOptions.series.stacking = stacked ? "normal" : null;
        };

        var setXtitle = function (options, title) {
          options.xAxis.title.text = title;
        };

        var setYtitle = function (options, title) {
          options.yAxis.title.text = title;
        };

        var jsOptions = jsOptionsFunc(defaultOptions, hideLegend, setTitle, setMin, setMax, setStacked, setXtitle, setYtitle);

        this.renderLineChart = function (chart, chartType) {
          chartType = chartType || "spline";
          var chartOptions = {};
          if (chartType === "areaspline") {
            chartOptions = {
              plotOptions: {
                areaspline: {
                  stacking: "normal"
                },
                area: {
                  stacking: "normal"
                },
                series: {
                  marker: {
                    enabled: false
                  }
                }
              }
            };
          }

          if (chart.options.curve === false) {
            if (chartType === "areaspline") {
              chartType = "area";
            } else if (chartType === "spline") {
              chartType = "line";
            }
          }

          var options = jsOptions(chart, chart.options, chartOptions), data, i, j;
          options.xAxis.type = chart.discrete ? "category" : "datetime";
          if (!options.chart.type) {
            options.chart.type = chartType;
          }
          options.chart.renderTo = chart.element.id;

          var series = chart.data;
          for (i = 0; i < series.length; i++) {
            data = series[i].data;
            if (!chart.discrete) {
              for (j = 0; j < data.length; j++) {
                data[j][0] = data[j][0].getTime();
              }
            }
            series[i].marker = {symbol: "circle"};
            if (chart.options.points === false) {
              series[i].marker.enabled = false;
            }
          }
          options.series = series;
          chart.chart = new Highcharts.Chart(options);
        };

        this.renderScatterChart = function (chart) {
          var chartOptions = {};
          var options = jsOptions(chart, chart.options, chartOptions);
          options.chart.type = "scatter";
          options.chart.renderTo = chart.element.id;
          options.series = chart.data;
          chart.chart = new Highcharts.Chart(options);
        };

        this.renderPieChart = function (chart) {
          var chartOptions = merge(defaultOptions, {});

          if (chart.options.colors) {
            chartOptions.colors = chart.options.colors;
          }
          if (chart.options.donut) {
            chartOptions.plotOptions = {pie: {innerSize: "50%"}};
          }

          if ("legend" in chart.options) {
            hideLegend(chartOptions, chart.options.legend);
          }

          if (chart.options.title) {
            setTitle(chartOptions, chart.options.title);
          }

          var options = merge(chartOptions, chart.options.library || {});
          options.chart.renderTo = chart.element.id;
          options.series = [{
            type: "pie",
            name: chart.options.label || "Value",
            data: chart.data
          }];
          chart.chart = new Highcharts.Chart(options);
        };

        this.renderColumnChart = function (chart, chartType) {
          chartType = chartType || "column";
          var series = chart.data;
          var options = jsOptions(chart, chart.options), i, j, s, d, rows = [], categories = [];
          options.chart.type = chartType;
          options.chart.renderTo = chart.element.id;

          for (i = 0; i < series.length; i++) {
            s = series[i];

            for (j = 0; j < s.data.length; j++) {
              d = s.data[j];
              if (!rows[d[0]]) {
                rows[d[0]] = new Array(series.length);
                categories.push(d[0]);
              }
              rows[d[0]][i] = d[1];
            }
          }

          if (chart.options.xtype === "number") {
            categories.sort(sortByNumber);
          }

          options.xAxis.categories = categories;

          var newSeries = [];
          for (i = 0; i < series.length; i++) {
            d = [];
            for (j = 0; j < categories.length; j++) {
              d.push(rows[categories[j]][i] || 0);
            }

            newSeries.push({
              name: series[i].name,
              data: d
            });
          }
          options.series = newSeries;

          chart.chart = new Highcharts.Chart(options);
        };

        var self = this;

        this.renderBarChart = function (chart) {
          self.renderColumnChart(chart, "bar");
        };

        this.renderAreaChart = function (chart) {
          self.renderLineChart(chart, "areaspline");
        };
      };
      adapters.push(HighchartsAdapter);
    }
    if (!GoogleChartsAdapter && window.google && (window.google.setOnLoadCallback || window.google.charts)) {
      GoogleChartsAdapter = new function () {
        var google = window.google;

        this.name = "google";

        var loaded = {};
        var callbacks = [];

        var runCallbacks = function () {
          var cb, call;
          for (var i = 0; i < callbacks.length; i++) {
            cb = callbacks[i];
            call = google.visualization && ((cb.pack === "corechart" && google.visualization.LineChart) || (cb.pack === "timeline" && google.visualization.Timeline));
            if (call) {
              cb.callback();
              callbacks.splice(i, 1);
              i--;
            }
          }
        };

        var waitForLoaded = function (pack, callback) {
          if (!callback) {
            callback = pack;
            pack = "corechart";
          }

          callbacks.push({pack: pack, callback: callback});

          if (loaded[pack]) {
            runCallbacks();
          } else {
            loaded[pack] = true;

            // https://groups.google.com/forum/#!topic/google-visualization-api/fMKJcyA2yyI
            var loadOptions = {
              packages: [pack],
              callback: runCallbacks
            };
            if (config.language) {
              loadOptions.language = config.language;
            }
            if (pack === "corechart" && config.mapsApiKey) {
              loadOptions.mapsApiKey = config.mapsApiKey;
            }

            if (window.google.setOnLoadCallback) {
              google.load("visualization", "1", loadOptions);
            } else {
              google.charts.load("current", loadOptions);
            }
          }
        };

        // Set chart options
        var defaultOptions = {
          chartArea: {},
          fontName: "'Lucida Grande', 'Lucida Sans Unicode', Verdana, Arial, Helvetica, sans-serif",
          pointSize: 6,
          legend: {
            textStyle: {
              fontSize: 12,
              color: "#444"
            },
            alignment: "center",
            position: "right"
          },
          curveType: "function",
          hAxis: {
            textStyle: {
              color: "#666",
              fontSize: 12
            },
            titleTextStyle: {},
            gridlines: {
              color: "transparent"
            },
            baselineColor: "#ccc",
            viewWindow: {}
          },
          vAxis: {
            textStyle: {
              color: "#666",
              fontSize: 12
            },
            titleTextStyle: {},
            baselineColor: "#ccc",
            viewWindow: {}
          },
          tooltip: {
            textStyle: {
              color: "#666",
              fontSize: 12
            }
          }
        };

        var hideLegend = function (options, legend, hideLegend) {
          if (legend !== undefined) {
            var position;
            if (!legend) {
              position = "none";
            } else if (legend === true) {
              position = "right";
            } else {
              position = legend;
            }
            options.legend.position = position;
          } else if (hideLegend) {
            options.legend.position = "none";
          }
        };

        var setTitle = function (options, title) {
          options.title = title;
          options.titleTextStyle = {color: "#333", fontSize: "20px"};
        };

        var setMin = function (options, min) {
          options.vAxis.viewWindow.min = min;
        };

        var setMax = function (options, max) {
          options.vAxis.viewWindow.max = max;
        };

        var setBarMin = function (options, min) {
          options.hAxis.viewWindow.min = min;
        };

        var setBarMax = function (options, max) {
          options.hAxis.viewWindow.max = max;
        };

        var setStacked = function (options, stacked) {
          options.isStacked = !!stacked;
        };

        var setXtitle = function (options, title) {
          options.hAxis.title = title;
          options.hAxis.titleTextStyle.italic = false;
        };

        var setYtitle = function (options, title) {
          options.vAxis.title = title;
          options.vAxis.titleTextStyle.italic = false;
        };

        var jsOptions = jsOptionsFunc(defaultOptions, hideLegend, setTitle, setMin, setMax, setStacked, setXtitle, setYtitle);

        // cant use object as key
        var createDataTable = function (series, columnType, xtype) {
          var i, j, s, d, key, rows = [], sortedLabels = [];
          for (i = 0; i < series.length; i++) {
            s = series[i];

            for (j = 0; j < s.data.length; j++) {
              d = s.data[j];
              key = (columnType === "datetime") ? d[0].getTime() : d[0];
              if (!rows[key]) {
                rows[key] = new Array(series.length);
                sortedLabels.push(key);
              }
              rows[key][i] = toFloat(d[1]);
            }
          }

          var rows2 = [];
          var day = true;
          var value;
          for (var j = 0; j < sortedLabels.length; j++) {
            var i = sortedLabels[j];
            if (columnType === "datetime") {
              value = new Date(toFloat(i));
              day = day && isDay(value);
            } else if (columnType === "number") {
              value = toFloat(i);
            } else {
              value = i;
            }
            rows2.push([value].concat(rows[i]));
          }
          if (columnType === "datetime") {
            rows2.sort(sortByTime);
          } else if (columnType === "number") {
            rows2.sort(sortByNumberSeries);
          }

          if (xtype === "number") {
            rows2.sort(sortByNumberSeries);

            for (var i = 0; i < rows2.length; i++) {
              rows2[i][0] = toStr(rows2[i][0]);
            }
          }

          // create datatable
          var data = new google.visualization.DataTable();
          columnType = columnType === "datetime" && day ? "date" : columnType;
          data.addColumn(columnType, "");
          for (i = 0; i < series.length; i++) {
            data.addColumn("number", series[i].name);
          }
          data.addRows(rows2);

          return data;
        };

        var resize = function (callback) {
          if (window.attachEvent) {
            window.attachEvent("onresize", callback);
          } else if (window.addEventListener) {
            window.addEventListener("resize", callback, true);
          }
          callback();
        };

        this.renderLineChart = function (chart) {
          waitForLoaded(function () {
            var chartOptions = {};

            if (chart.options.curve === false) {
              chartOptions.curveType = "none";
            }

            if (chart.options.points === false) {
              chartOptions.pointSize = 0;
            }

            var options = jsOptions(chart, chart.options, chartOptions);
            var columnType = chart.discrete ? "string" : "datetime";
            if (chart.options.xtype === "number") {
              columnType = "number";
            }
            var data = createDataTable(chart.data, columnType);
            chart.chart = new google.visualization.LineChart(chart.element);
            resize(function () {
              chart.chart.draw(data, options);
            });
          });
        };

        this.renderPieChart = function (chart) {
          waitForLoaded(function () {
            var chartOptions = {
              chartArea: {
                top: "10%",
                height: "80%"
              },
              legend: {}
            };
            if (chart.options.colors) {
              chartOptions.colors = chart.options.colors;
            }
            if (chart.options.donut) {
              chartOptions.pieHole = 0.5;
            }
            if ("legend" in chart.options) {
              hideLegend(chartOptions, chart.options.legend);
            }
            if (chart.options.title) {
              setTitle(chartOptions, chart.options.title);
            }
            var options = merge(merge(defaultOptions, chartOptions), chart.options.library || {});

            var data = new google.visualization.DataTable();
            data.addColumn("string", "");
            data.addColumn("number", "Value");
            data.addRows(chart.data);

            chart.chart = new google.visualization.PieChart(chart.element);
            resize(function () {
              chart.chart.draw(data, options);
            });
          });
        };

        this.renderColumnChart = function (chart) {
          waitForLoaded(function () {
            var options = jsOptions(chart, chart.options);
            var data = createDataTable(chart.data, "string", chart.options.xtype);
            chart.chart = new google.visualization.ColumnChart(chart.element);
            resize(function () {
              chart.chart.draw(data, options);
            });
          });
        };

        this.renderBarChart = function (chart) {
          waitForLoaded(function () {
            var chartOptions = {
              hAxis: {
                gridlines: {
                  color: "#ccc"
                }
              }
            };
            var options = jsOptionsFunc(defaultOptions, hideLegend, setTitle, setBarMin, setBarMax, setStacked, setXtitle, setYtitle)(chart, chart.options, chartOptions);
            var data = createDataTable(chart.data, "string", chart.options.xtype);
            chart.chart = new google.visualization.BarChart(chart.element);
            resize(function () {
              chart.chart.draw(data, options);
            });
          });
        };

        this.renderAreaChart = function (chart) {
          waitForLoaded(function () {
            var chartOptions = {
              isStacked: true,
              pointSize: 0,
              areaOpacity: 0.5
            };

            var options = jsOptions(chart, chart.options, chartOptions);
            var columnType = chart.discrete ? "string" : "datetime";
            if (chart.options.xtype === "number") {
              columnType = "number";
            }
            var data = createDataTable(chart.data, columnType);
            chart.chart = new google.visualization.AreaChart(chart.element);
            resize(function () {
              chart.chart.draw(data, options);
            });
          });
        };

        this.renderGeoChart = function (chart) {
          waitForLoaded(function () {
            var chartOptions = {
              legend: "none",
              colorAxis: {
                colors: chart.options.colors || ["#f6c7b6", "#ce502d"]
              }
            };
            var options = merge(merge(defaultOptions, chartOptions), chart.options.library || {});

            var data = new google.visualization.DataTable();
            data.addColumn("string", "");
            data.addColumn("number", chart.options.label || "Value");
            data.addRows(chart.data);

            chart.chart = new google.visualization.GeoChart(chart.element);
            resize(function () {
              chart.chart.draw(data, options);
            });
          });
        };

        this.renderScatterChart = function (chart) {
          waitForLoaded(function () {
            var chartOptions = {};
            var options = jsOptions(chart, chart.options, chartOptions);

            var series = chart.data, rows2 = [], i, j, data, d;
            for (i = 0; i < series.length; i++) {
              d = series[i].data;
              for (j = 0; j < d.length; j++) {
                var row = new Array(series.length + 1);
                row[0] = d[j][0];
                row[i + 1] = d[j][1];
                rows2.push(row);
              }
            }

            var data = new google.visualization.DataTable();
            data.addColumn("number", "");
            for (i = 0; i < series.length; i++) {
              data.addColumn("number", series[i].name);
            }
            data.addRows(rows2);

            chart.chart = new google.visualization.ScatterChart(chart.element);
            resize(function () {
              chart.chart.draw(data, options);
            });
          });
        };

        this.renderTimeline = function (chart) {
          waitForLoaded("timeline", function () {
            var chartOptions = {
              legend: "none"
            };

            if (chart.options.colors) {
              chartOptions.colors = chart.options.colors;
            }
            var options = merge(merge(defaultOptions, chartOptions), chart.options.library || {});

            var data = new google.visualization.DataTable();
            data.addColumn({type: "string", id: "Name"});
            data.addColumn({type: "date", id: "Start"});
            data.addColumn({type: "date", id: "End"});
            data.addRows(chart.data);

            chart.element.style.lineHeight = "normal";
            chart.chart = new google.visualization.Timeline(chart.element);

            resize(function () {
              chart.chart.draw(data, options);
            });
          });
        };
      };

      adapters.push(GoogleChartsAdapter);
    }
    if (!ChartjsAdapter && "Chart" in window) {
      ChartjsAdapter = new function () {
        var Chart = window.Chart;

        this.name = "chartjs";

        var baseOptions = {
          maintainAspectRatio: false,
          animation: false,
          tooltips: {
            displayColors: false
          },
          legend: {},
          title: {fontSize: 20, fontColor: "#333"}
        };

        var defaultOptions = {
          scales: {
            yAxes: [
              {
                ticks: {
                  maxTicksLimit: 4
                },
                scaleLabel: {
                  fontSize: 16,
                  // fontStyle: "bold",
                  fontColor: "#333"
                }
              }
            ],
            xAxes: [
              {
                gridLines: {
                  drawOnChartArea: false
                },
                scaleLabel: {
                  fontSize: 16,
                  // fontStyle: "bold",
                  fontColor: "#333"
                },
                time: {},
                ticks: {}
              }
            ]
          }
        };

        // http://there4.io/2012/05/02/google-chart-color-list/
        var defaultColors = [
          "#3366CC", "#DC3912", "#FF9900", "#109618", "#990099", "#3B3EAC", "#0099C6",
          "#DD4477", "#66AA00", "#B82E2E", "#316395", "#994499", "#22AA99", "#AAAA11",
          "#6633CC", "#E67300", "#8B0707", "#329262", "#5574A6", "#3B3EAC"
        ];

        var hideLegend = function (options, legend, hideLegend) {
          if (legend !== undefined) {
            options.legend.display = !!legend;
            if (legend && legend !== true) {
              options.legend.position = legend;
            }
          } else if (hideLegend) {
            options.legend.display = false;
          }
        };

        var setTitle = function (options, title) {
          options.title.display = true;
          options.title.text = title;
        };

        var setMin = function (options, min) {
          if (min !== null) {
            options.scales.yAxes[0].ticks.min = toFloat(min);
          }
        };

        var setMax = function (options, max) {
          options.scales.yAxes[0].ticks.max = toFloat(max);
        };

        var setBarMin = function (options, min) {
          if (min !== null) {
            options.scales.xAxes[0].ticks.min = toFloat(min);
          }
        };

        var setBarMax = function (options, max) {
          options.scales.xAxes[0].ticks.max = toFloat(max);
        };

        var setStacked = function (options, stacked) {
          options.scales.xAxes[0].stacked = !!stacked;
          options.scales.yAxes[0].stacked = !!stacked;
        };

        var setXtitle = function (options, title) {
          options.scales.xAxes[0].scaleLabel.display = true;
          options.scales.xAxes[0].scaleLabel.labelString = title;
        };

        var setYtitle = function (options, title) {
          options.scales.yAxes[0].scaleLabel.display = true;
          options.scales.yAxes[0].scaleLabel.labelString = title;
        };

        var drawChart = function(chart, type, data, options) {
          if (chart.chart) {
            chart.chart.destroy();
          } else {
            chart.element.innerHTML = "<canvas></canvas>";
          }

          var ctx = chart.element.getElementsByTagName("CANVAS")[0];
          chart.chart = new Chart(ctx, {
            type: type,
            data: data,
            options: options
          });
        };

        // http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
        var addOpacity = function(hex, opacity) {
          var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
          return result ? "rgba(" + parseInt(result[1], 16) + ", " + parseInt(result[2], 16) + ", " + parseInt(result[3], 16) + ", " + opacity + ")" : hex;
        };

        var setLabelSize = function (chart, data, options) {
          var maxLabelSize = Math.ceil(chart.element.offsetWidth / 4.0 / data.labels.length);
          if (maxLabelSize > 25) {
            maxLabelSize = 25;
          }
          options.scales.xAxes[0].ticks.callback = function (value) {
            value = toStr(value);
            if (value.length > maxLabelSize) {
              return value.substring(0, maxLabelSize - 2) + "...";
            } else {
              return value;
            }
          };
        };

        var jsOptions = jsOptionsFunc(merge(baseOptions, defaultOptions), hideLegend, setTitle, setMin, setMax, setStacked, setXtitle, setYtitle);

        var createDataTable = function (chart, options, chartType) {
          var datasets = [];
          var labels = [];

          var colors = chart.options.colors || defaultColors;

          var day = true;
          var week = true;
          var dayOfWeek;
          var month = true;
          var year = true;
          var hour = true;
          var minute = true;
          var detectType = (chartType === "line" || chartType === "area") && !chart.discrete;

          var series = chart.data;

          var sortedLabels = [];

          var i, j, s, d, key, rows = [];
          for (i = 0; i < series.length; i++) {
            s = series[i];

            for (j = 0; j < s.data.length; j++) {
              d = s.data[j];
              key = detectType ? d[0].getTime() : d[0];
              if (!rows[key]) {
                rows[key] = new Array(series.length);
              }
              rows[key][i] = toFloat(d[1]);
              if (sortedLabels.indexOf(key) === -1) {
                sortedLabels.push(key);
              }
            }
          }

          if (detectType || chart.options.xtype === "number") {
            sortedLabels.sort(sortByNumber);
          }

          var rows2 = [];
          for (j = 0; j < series.length; j++) {
            rows2.push([]);
          }

          var value;
          var k;
          for (k = 0; k < sortedLabels.length; k++) {
            i = sortedLabels[k];
            if (detectType) {
              value = new Date(toFloat(i));
              // TODO make this efficient
              day = day && isDay(value);
              if (!dayOfWeek) {
                dayOfWeek = value.getDay();
              }
              week = week && isWeek(value, dayOfWeek);
              month = month && isMonth(value);
              year = year && isYear(value);
              hour = hour && isHour(value);
              minute = minute && isMinute(value);
            } else {
              value = i;
            }
            labels.push(value);
            for (j = 0; j < series.length; j++) {
              // Chart.js doesn't like undefined
              rows2[j].push(rows[i][j] === undefined ? null : rows[i][j]);
            }
          }

          for (i = 0; i < series.length; i++) {
            s = series[i];

            var color = s.color || colors[i];
            var backgroundColor = chartType !== "line" ? addOpacity(color, 0.5) : color;

            var dataset = {
              label: s.name,
              data: rows2[i],
              fill: chartType === "area",
              borderColor: color,
              backgroundColor: backgroundColor,
              pointBackgroundColor: color,
              borderWidth: 2
            };

            if (chart.options.curve === false) {
              dataset.lineTension = 0;
            }

            if (chart.options.points === false) {
              dataset.pointRadius = 0;
              dataset.pointHitRadius = 5;
            }

            datasets.push(merge(dataset, s.library || {}));
          }

          if (detectType && labels.length > 0) {
            var minTime = labels[0].getTime();
            var maxTime = labels[0].getTime();
            for (i = 1; i < labels.length; i++) {
              value = labels[i].getTime();
              if (value < minTime) {
                minTime = value;
              }
              if (value > maxTime) {
                maxTime = value;
              }
            }

            var timeDiff = (maxTime - minTime) / (86400 * 1000.0);

            if (!options.scales.xAxes[0].time.unit) {
              var step;
              if (year || timeDiff > 365 * 10) {
                options.scales.xAxes[0].time.unit = "year";
                step = 365;
              } else if (month || timeDiff > 30 * 10) {
                options.scales.xAxes[0].time.unit = "month";
                step = 30;
              } else if (day || timeDiff > 10) {
                options.scales.xAxes[0].time.unit = "day";
                step = 1;
              } else if (hour || timeDiff > 0.5) {
                options.scales.xAxes[0].time.displayFormats = {hour: "MMM D, h a"};
                options.scales.xAxes[0].time.unit = "hour";
                step = 1 / 24.0;
              } else if (minute) {
                options.scales.xAxes[0].time.displayFormats = {minute: "h:mm a"};
                options.scales.xAxes[0].time.unit = "minute";
                step = 1 / 24.0 / 60.0;
              }

              if (step && timeDiff > 0) {
                var unitStepSize = Math.ceil(timeDiff / step / (chart.element.offsetWidth / 100.0));
                if (week && step === 1) {
                  unitStepSize = Math.ceil(unitStepSize / 7.0) * 7;
                }
                options.scales.xAxes[0].time.unitStepSize = unitStepSize;
              }
            }

            if (!options.scales.xAxes[0].time.tooltipFormat) {
              if (day) {
                options.scales.xAxes[0].time.tooltipFormat = "ll";
              } else if (hour) {
                options.scales.xAxes[0].time.tooltipFormat = "MMM D, h a";
              } else if (minute) {
                options.scales.xAxes[0].time.tooltipFormat = "h:mm a";
              }
            }
          }

          var data = {
            labels: labels,
            datasets: datasets
          };

          return data;
        };

        this.renderLineChart = function (chart, chartType) {
          if (chart.options.xtype === "number") {
            return self.renderScatterChart(chart, chartType, true);
          }

          var chartOptions = {};
          if (chartType === "area") {
            // TODO fix area stacked
            // chartOptions.stacked = true;
          }
          // fix for https://github.com/chartjs/Chart.js/issues/2441
          if (!chart.options.max && allZeros(chart.data)) {
            chartOptions.max = 1;
          }

          var options = jsOptions(chart, merge(chartOptions, chart.options));

          var data = createDataTable(chart, options, chartType || "line");

          options.scales.xAxes[0].type = chart.discrete ? "category" : "time";

          drawChart(chart, "line", data, options);
        };

        this.renderPieChart = function (chart) {
          var options = merge({}, baseOptions);
          if (chart.options.donut) {
            options.cutoutPercentage = 50;
          }

          if ("legend" in chart.options) {
            hideLegend(options, chart.options.legend);
          }

          if (chart.options.title) {
            setTitle(options, chart.options.title);
          }

          options = merge(options, chart.options.library || {});

          var labels = [];
          var values = [];
          for (var i = 0; i < chart.data.length; i++) {
            var point = chart.data[i];
            labels.push(point[0]);
            values.push(point[1]);
          }

          var data = {
            labels: labels,
            datasets: [
              {
                data: values,
                backgroundColor: chart.options.colors || defaultColors
              }
            ]
          };

          drawChart(chart, "pie", data, options);
        };

        this.renderColumnChart = function (chart, chartType) {
          var options;
          if (chartType === "bar") {
            options = jsOptionsFunc(merge(baseOptions, defaultOptions), hideLegend, setTitle, setBarMin, setBarMax, setStacked, setXtitle, setYtitle)(chart, chart.options);
          } else {
            options = jsOptions(chart, chart.options);
          }
          var data = createDataTable(chart, options, "column");
          setLabelSize(chart, data, options);
          drawChart(chart, (chartType === "bar" ? "horizontalBar" : "bar"), data, options);
        };

        var self = this;

        this.renderAreaChart = function (chart) {
          self.renderLineChart(chart, "area");
        };

        this.renderBarChart = function (chart) {
          self.renderColumnChart(chart, "bar");
        };

        this.renderScatterChart = function (chart, chartType, lineChart) {
          chartType = chartType || "line";

          var options = jsOptions(chart, chart.options);

          var colors = chart.options.colors || defaultColors;

          var datasets = [];
          var series = chart.data;
          for (var i = 0; i < series.length; i++) {
            var s = series[i];
            var d = [];
            for (var j = 0; j < s.data.length; j++) {
              var point = {
                x: toFloat(s.data[j][0]),
                y: toFloat(s.data[j][1])
              };
              if (chartType === "bubble") {
                point.r = toFloat(s.data[j][2]);
              }
              d.push(point);
            }

            var color = s.color || colors[i];
            var backgroundColor = chartType === "area" ? addOpacity(color, 0.5) : color;

            datasets.push({
              label: s.name,
              showLine: lineChart || false,
              data: d,
              borderColor: color,
              backgroundColor: backgroundColor,
              pointBackgroundColor: color,
              fill: chartType === "area"
            })
          }

          if (chartType === "area") {
            chartType = "line";
          }

          var data = {datasets: datasets};

          options.scales.xAxes[0].type = "linear";
          options.scales.xAxes[0].position = "bottom";

          drawChart(chart, chartType, data, options);
        };

        this.renderBubbleChart = function (chart) {
          this.renderScatterChart(chart, "bubble");
        };
      };

      adapters.unshift(ChartjsAdapter);
    }
  }

  function renderChart(chartType, chart) {
    callAdapter(chartType, chart);
    if (chart.options.download && !chart.downloadAttached && chart.adapter === "chartjs") {
      addDownloadButton(chart);
    }
  }

  // TODO remove chartType if cross-browser way
  // to get the name of the chart class
  function callAdapter(chartType, chart) {
    var i, adapter, fnName, adapterName;
    fnName = "render" + chartType;
    adapterName = chart.options.adapter;

    loadAdapters();

    for (i = 0; i < adapters.length; i++) {
      adapter = adapters[i];
      if ((!adapterName || adapterName === adapter.name) && isFunction(adapter[fnName])) {
        chart.adapter = adapter.name;
        return adapter[fnName](chart);
      }
    }
    throw new Error("No adapter found");
  }

  // process data

  var toFormattedKey = function (key, keyType) {
    if (keyType === "number") {
      key = toFloat(key);
    } else if (keyType === "datetime") {
      key = toDate(key);
    } else {
      key = toStr(key);
    }
    return key;
  };

  var formatSeriesData = function (data, keyType) {
    var r = [], key, j;
    for (j = 0; j < data.length; j++) {
      if (keyType === "bubble") {
        r.push([toFloat(data[j][0]), toFloat(data[j][1]), toFloat(data[j][2])]);
      } else {
        key = toFormattedKey(data[j][0], keyType);
        r.push([key, toFloat(data[j][1])]);
      }
    }
    if (keyType === "datetime") {
      r.sort(sortByTime);
    } else if (keyType === "number") {
      r.sort(sortByNumberSeries);
    }
    return r;
  };

  function isMinute(d) {
    return d.getMilliseconds() === 0 && d.getSeconds() === 0;
  }

  function isHour(d) {
    return isMinute(d) && d.getMinutes() === 0;
  }

  function isDay(d) {
    return isHour(d) && d.getHours() === 0;
  }

  function isWeek(d, dayOfWeek) {
    return isDay(d) && d.getDay() === dayOfWeek;
  }

  function isMonth(d) {
    return isDay(d) && d.getDate() === 1;
  }

  function isYear(d) {
    return isMonth(d) && d.getMonth() === 0;
  }

  function isDate(obj) {
    return !isNaN(toDate(obj)) && toStr(obj).length >= 6;
  }

  function allZeros(data) {
    var i, j, d;
    for (i = 0; i < data.length; i++) {
      d = data[i].data;
      for (j = 0; j < d.length; j++) {
        if (d[j][1] != 0) {
          return false;
        }
      }
    }
    return true;
  }

  function detectDiscrete(series) {
    var i, j, data;
    for (i = 0; i < series.length; i++) {
      data = toArr(series[i].data);
      for (j = 0; j < data.length; j++) {
        if (!isDate(data[j][0])) {
          return true;
        }
      }
    }
    return false;
  }

  function processSeries(chart, keyType) {
    var i;

    var opts = chart.options;
    var series = chart.rawData;

    // see if one series or multiple
    if (!isArray(series) || typeof series[0] !== "object" || isArray(series[0])) {
      series = [{name: opts.label || "Value", data: series}];
      chart.hideLegend = true;
    } else {
      chart.hideLegend = false;
    }
    if ((opts.discrete === null || opts.discrete === undefined) && keyType !== "bubble" && keyType !== "number") {
      chart.discrete = detectDiscrete(series);
    } else {
      chart.discrete = opts.discrete;
    }
    if (chart.discrete) {
      keyType = "string";
    }
    if (chart.options.xtype) {
      keyType = chart.options.xtype;
    }

    // right format
    for (i = 0; i < series.length; i++) {
      series[i].data = formatSeriesData(toArr(series[i].data), keyType);
    }

    return series;
  }

  function processSimple(chart) {
    var perfectData = toArr(chart.rawData), i;
    for (i = 0; i < perfectData.length; i++) {
      perfectData[i] = [toStr(perfectData[i][0]), toFloat(perfectData[i][1])];
    }
    return perfectData;
  }

  function processTime(chart)
  {
    var i, data = chart.rawData;
    for (i = 0; i < data.length; i++) {
      data[i][1] = toDate(data[i][1]);
      data[i][2] = toDate(data[i][2]);
    }
    return data;
  }

  function processLineData(chart) {
    return processSeries(chart, "datetime");
  }

  function processColumnData(chart) {
    return processSeries(chart, "string");
  }

  function processBarData(chart) {
    return processSeries(chart, "string");
  }

  function processAreaData(chart) {
    return processSeries(chart, "datetime");
  }

  function processScatterData(chart) {
    return processSeries(chart, "number");
  }

  function processBubbleData(chart) {
    return processSeries(chart, "bubble");
  }

  function createChart(chartType, chart, element, dataSource, opts, processData) {
    var elementId;
    if (typeof element === "string") {
      elementId = element;
      element = document.getElementById(element);
      if (!element) {
        throw new Error("No element with id " + elementId);
      }
    }

    chart.element = element;
    opts = merge(Chartkick.options, opts || {});
    chart.options = opts;
    chart.dataSource = dataSource;

    if (!processData) {
      processData = function (chart) {
        return chart.rawData;
      }
    }

    // getters
    chart.getElement = function () {
      return element;
    };
    chart.getDataSource = function () {
      return chart.dataSource;
    };
    chart.getData = function () {
      return chart.data;
    };
    chart.getOptions = function () {
      return chart.options;
    };
    chart.getChartObject = function () {
      return chart.chart;
    };
    chart.getAdapter = function () {
      return chart.adapter;
    };

    var callback = function () {
      chart.data = processData(chart);
      renderChart(chartType, chart);
    };

    // functions
    chart.updateData = function (dataSource, options) {
      chart.dataSource = dataSource;
      if (options) {
        chart.options = merge(Chartkick.options, options);
      }
      fetchDataSource(chart, callback, dataSource);
    };
    chart.setOptions = function (options) {
      chart.options = merge(Chartkick.options, options);
      chart.redraw();
    };
    chart.redraw = function() {
      fetchDataSource(chart, callback, chart.rawData);
    };
    chart.refreshData = function () {
      if (typeof dataSource === "string") {
        // prevent browser from caching
        var sep = dataSource.indexOf("?") === -1 ? "?" : "&";
        var url = dataSource + sep + "_=" + (new Date()).getTime();
        fetchDataSource(chart, callback, url);
      }
    };
    chart.stopRefresh = function () {
      if (chart.intervalId) {
        clearInterval(chart.intervalId);
      }
    };
    chart.toImage = function () {
      if (chart.adapter === "chartjs") {
        return chart.chart.toBase64Image();
      } else {
        return null;
      }
    }

    Chartkick.charts[element.id] = chart;

    fetchDataSource(chart, callback, dataSource);

    if (opts.refresh) {
      chart.intervalId = setInterval( function () {
        chart.refreshData();
      }, opts.refresh * 1000);
    }
  }

  // define classes

  Chartkick = {
    LineChart: function (element, dataSource, options) {
      createChart("LineChart", this, element, dataSource, options, processLineData);
    },
    PieChart: function (element, dataSource, options) {
      createChart("PieChart", this, element, dataSource, options, processSimple);
    },
    ColumnChart: function (element, dataSource, options) {
      createChart("ColumnChart", this, element, dataSource, options, processColumnData);
    },
    BarChart: function (element, dataSource, options) {
      createChart("BarChart", this, element, dataSource, options, processBarData);
    },
    AreaChart: function (element, dataSource, options) {
      createChart("AreaChart", this, element, dataSource, options, processAreaData);
    },
    GeoChart: function (element, dataSource, options) {
      createChart("GeoChart", this, element, dataSource, options, processSimple);
    },
    ScatterChart: function (element, dataSource, options) {
      createChart("ScatterChart", this, element, dataSource, options, processScatterData);
    },
    BubbleChart: function (element, dataSource, options) {
      createChart("BubbleChart", this, element, dataSource, options, processBubbleData);
    },
    Timeline: function (element, dataSource, options) {
      createChart("Timeline", this, element, dataSource, options, processTime);
    },
    charts: {},
    configure: function (options) {
      for (var key in options) {
        if (options.hasOwnProperty(key)) {
          config[key] = options[key];
        }
      }
    },
    eachChart: function (callback) {
      for (var chartId in Chartkick.charts) {
        if (Chartkick.charts.hasOwnProperty(chartId)) {
          callback(Chartkick.charts[chartId]);
        }
      }
    },
    options: {},
    adapters: adapters,
    createChart: createChart
  };

  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = Chartkick;
  } else {
    window.Chartkick = Chartkick;
  }
}(window));
/**
 * @license Highcharts JS v5.0.7 (2017-01-17)
 *
 * (c) 2009-2016 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */

(function(factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory;
    } else {
        factory(Highcharts);
    }
}(function(Highcharts) {
    (function(H) {
        /**
         * (c) 2010-2016 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */
        'use strict';
        var each = H.each,
            extend = H.extend,
            merge = H.merge,
            splat = H.splat;
        /**
         * The Pane object allows options that are common to a set of X and Y axes.
         *
         * In the future, this can be extended to basic Highcharts and Highstock.
         */
        function Pane(options, chart, firstAxis) {
            this.init(options, chart, firstAxis);
        }

        // Extend the Pane prototype
        extend(Pane.prototype, {

            /**
             * Initiate the Pane object
             */
            init: function(options, chart, firstAxis) {
                var pane = this,
                    backgroundOption,
                    defaultOptions = pane.defaultOptions;

                pane.chart = chart;

                // Set options. Angular charts have a default background (#3318)
                pane.options = options = merge(defaultOptions, chart.angular ? {
                    background: {}
                } : undefined, options);

                backgroundOption = options.background;

                // To avoid having weighty logic to place, update and remove the backgrounds,
                // push them to the first axis' plot bands and borrow the existing logic there.
                if (backgroundOption) {
                    each([].concat(splat(backgroundOption)).reverse(), function(config) {
                        var mConfig,
                            axisUserOptions = firstAxis.userOptions;
                        mConfig = merge(pane.defaultBackgroundOptions, config);


                        if (config.backgroundColor) {
                            mConfig.backgroundColor = config.backgroundColor;
                        }
                        mConfig.color = mConfig.backgroundColor; // due to naming in plotBands


                        firstAxis.options.plotBands.unshift(mConfig);
                        axisUserOptions.plotBands = axisUserOptions.plotBands || []; // #3176
                        if (axisUserOptions.plotBands !== firstAxis.options.plotBands) {
                            axisUserOptions.plotBands.unshift(mConfig);
                        }
                    });
                }
            },

            /**
             * The default options object
             */
            defaultOptions: {
                // background: {conditional},
                center: ['50%', '50%'],
                size: '85%',
                startAngle: 0
                    //endAngle: startAngle + 360
            },

            /**
             * The default background options
             */
            defaultBackgroundOptions: {
                className: 'highcharts-pane',
                shape: 'circle',

                borderWidth: 1,
                borderColor: '#cccccc',
                backgroundColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, '#ffffff'],
                        [1, '#e6e6e6']
                    ]
                },

                from: -Number.MAX_VALUE, // corrected to axis min
                innerRadius: 0,
                to: Number.MAX_VALUE, // corrected to axis max
                outerRadius: '105%'
            }

        });

        H.Pane = Pane;

    }(Highcharts));
    (function(H) {
        /**
         * (c) 2010-2016 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */
        'use strict';
        var Axis = H.Axis,
            CenteredSeriesMixin = H.CenteredSeriesMixin,
            each = H.each,
            extend = H.extend,
            map = H.map,
            merge = H.merge,
            noop = H.noop,
            Pane = H.Pane,
            pick = H.pick,
            pInt = H.pInt,
            Tick = H.Tick,
            splat = H.splat,
            wrap = H.wrap,


            hiddenAxisMixin, // @todo Extract this to a new file
            radialAxisMixin, // @todo Extract this to a new file
            axisProto = Axis.prototype,
            tickProto = Tick.prototype;

        /**
         * Augmented methods for the x axis in order to hide it completely, used for the X axis in gauges
         */
        hiddenAxisMixin = {
            getOffset: noop,
            redraw: function() {
                this.isDirty = false; // prevent setting Y axis dirty
            },
            render: function() {
                this.isDirty = false; // prevent setting Y axis dirty
            },
            setScale: noop,
            setCategories: noop,
            setTitle: noop
        };

        /**
         * Augmented methods for the value axis
         */
        radialAxisMixin = {

            /**
             * The default options extend defaultYAxisOptions
             */
            defaultRadialGaugeOptions: {
                labels: {
                    align: 'center',
                    x: 0,
                    y: null // auto
                },
                minorGridLineWidth: 0,
                minorTickInterval: 'auto',
                minorTickLength: 10,
                minorTickPosition: 'inside',
                minorTickWidth: 1,
                tickLength: 10,
                tickPosition: 'inside',
                tickWidth: 2,
                title: {
                    rotation: 0
                },
                zIndex: 2 // behind dials, points in the series group
            },

            // Circular axis around the perimeter of a polar chart
            defaultRadialXOptions: {
                gridLineWidth: 1, // spokes
                labels: {
                    align: null, // auto
                    distance: 15,
                    x: 0,
                    y: null // auto
                },
                maxPadding: 0,
                minPadding: 0,
                showLastLabel: false,
                tickLength: 0
            },

            // Radial axis, like a spoke in a polar chart
            defaultRadialYOptions: {
                gridLineInterpolation: 'circle',
                labels: {
                    align: 'right',
                    x: -3,
                    y: -2
                },
                showLastLabel: false,
                title: {
                    x: 4,
                    text: null,
                    rotation: 90
                }
            },

            /**
             * Merge and set options
             */
            setOptions: function(userOptions) {

                var options = this.options = merge(
                    this.defaultOptions,
                    this.defaultRadialOptions,
                    userOptions
                );

                // Make sure the plotBands array is instanciated for each Axis (#2649)
                if (!options.plotBands) {
                    options.plotBands = [];
                }

            },

            /**
             * Wrap the getOffset method to return zero offset for title or labels in a radial
             * axis
             */
            getOffset: function() {
                // Call the Axis prototype method (the method we're in now is on the instance)
                axisProto.getOffset.call(this);

                // Title or label offsets are not counted
                this.chart.axisOffset[this.side] = 0;

                // Set the center array
                this.center = this.pane.center = CenteredSeriesMixin.getCenter.call(this.pane);
            },


            /**
             * Get the path for the axis line. This method is also referenced in the getPlotLinePath
             * method.
             */
            getLinePath: function(lineWidth, radius) {
                var center = this.center,
                    end,
                    chart = this.chart,
                    r = pick(radius, center[2] / 2 - this.offset),
                    path;

                if (this.isCircular || radius !== undefined) {
                    path = this.chart.renderer.symbols.arc(
                        this.left + center[0],
                        this.top + center[1],
                        r,
                        r, {
                            start: this.startAngleRad,
                            end: this.endAngleRad,
                            open: true,
                            innerR: 0
                        }
                    );
                } else {
                    end = this.postTranslate(this.angleRad, r);
                    path = ['M', center[0] + chart.plotLeft, center[1] + chart.plotTop, 'L', end.x, end.y];
                }
                return path;
            },

            /**
             * Override setAxisTranslation by setting the translation to the difference
             * in rotation. This allows the translate method to return angle for
             * any given value.
             */
            setAxisTranslation: function() {

                // Call uber method
                axisProto.setAxisTranslation.call(this);

                // Set transA and minPixelPadding
                if (this.center) { // it's not defined the first time
                    if (this.isCircular) {

                        this.transA = (this.endAngleRad - this.startAngleRad) /
                            ((this.max - this.min) || 1);


                    } else {
                        this.transA = (this.center[2] / 2) / ((this.max - this.min) || 1);
                    }

                    if (this.isXAxis) {
                        this.minPixelPadding = this.transA * this.minPointOffset;
                    } else {
                        // This is a workaround for regression #2593, but categories still don't position correctly.
                        this.minPixelPadding = 0;
                    }
                }
            },

            /**
             * In case of auto connect, add one closestPointRange to the max value right before
             * tickPositions are computed, so that ticks will extend passed the real max.
             */
            beforeSetTickPositions: function() {
                // If autoConnect is true, polygonal grid lines are connected, and one closestPointRange
                // is added to the X axis to prevent the last point from overlapping the first.
                this.autoConnect = this.isCircular && pick(this.userMax, this.options.max) === undefined &&
                    this.endAngleRad - this.startAngleRad === 2 * Math.PI;

                if (this.autoConnect) {
                    this.max += (this.categories && 1) || this.pointRange || this.closestPointRange || 0; // #1197, #2260
                }
            },

            /**
             * Override the setAxisSize method to use the arc's circumference as length. This
             * allows tickPixelInterval to apply to pixel lengths along the perimeter
             */
            setAxisSize: function() {

                axisProto.setAxisSize.call(this);

                if (this.isRadial) {

                    // Set the center array
                    this.center = this.pane.center = CenteredSeriesMixin.getCenter.call(this.pane);

                    // The sector is used in Axis.translate to compute the translation of reversed axis points (#2570)
                    if (this.isCircular) {
                        this.sector = this.endAngleRad - this.startAngleRad;
                    }

                    // Axis len is used to lay out the ticks
                    this.len = this.width = this.height = this.center[2] * pick(this.sector, 1) / 2;


                }
            },

            /**
             * Returns the x, y coordinate of a point given by a value and a pixel distance
             * from center
             */
            getPosition: function(value, length) {
                return this.postTranslate(
                    this.isCircular ? this.translate(value) : this.angleRad, // #2848
                    pick(this.isCircular ? length : this.translate(value), this.center[2] / 2) - this.offset
                );
            },

            /**
             * Translate from intermediate plotX (angle), plotY (axis.len - radius) to final chart coordinates.
             */
            postTranslate: function(angle, radius) {

                var chart = this.chart,
                    center = this.center;

                angle = this.startAngleRad + angle;

                return {
                    x: chart.plotLeft + center[0] + Math.cos(angle) * radius,
                    y: chart.plotTop + center[1] + Math.sin(angle) * radius
                };

            },

            /**
             * Find the path for plot bands along the radial axis
             */
            getPlotBandPath: function(from, to, options) {
                var center = this.center,
                    startAngleRad = this.startAngleRad,
                    fullRadius = center[2] / 2,
                    radii = [
                        pick(options.outerRadius, '100%'),
                        options.innerRadius,
                        pick(options.thickness, 10)
                    ],
                    offset = Math.min(this.offset, 0),
                    percentRegex = /%$/,
                    start,
                    end,
                    open,
                    isCircular = this.isCircular, // X axis in a polar chart
                    ret;

                // Polygonal plot bands
                if (this.options.gridLineInterpolation === 'polygon') {
                    ret = this.getPlotLinePath(from).concat(this.getPlotLinePath(to, true));

                    // Circular grid bands
                } else {

                    // Keep within bounds
                    from = Math.max(from, this.min);
                    to = Math.min(to, this.max);

                    // Plot bands on Y axis (radial axis) - inner and outer radius depend on to and from
                    if (!isCircular) {
                        radii[0] = this.translate(from);
                        radii[1] = this.translate(to);
                    }

                    // Convert percentages to pixel values
                    radii = map(radii, function(radius) {
                        if (percentRegex.test(radius)) {
                            radius = (pInt(radius, 10) * fullRadius) / 100;
                        }
                        return radius;
                    });

                    // Handle full circle
                    if (options.shape === 'circle' || !isCircular) {
                        start = -Math.PI / 2;
                        end = Math.PI * 1.5;
                        open = true;
                    } else {
                        start = startAngleRad + this.translate(from);
                        end = startAngleRad + this.translate(to);
                    }

                    radii[0] -= offset; // #5283
                    radii[2] -= offset; // #5283

                    ret = this.chart.renderer.symbols.arc(
                        this.left + center[0],
                        this.top + center[1],
                        radii[0],
                        radii[0], {
                            start: Math.min(start, end), // Math is for reversed yAxis (#3606)
                            end: Math.max(start, end),
                            innerR: pick(radii[1], radii[0] - radii[2]),
                            open: open
                        }
                    );
                }

                return ret;
            },

            /**
             * Find the path for plot lines perpendicular to the radial axis.
             */
            getPlotLinePath: function(value, reverse) {
                var axis = this,
                    center = axis.center,
                    chart = axis.chart,
                    end = axis.getPosition(value),
                    xAxis,
                    xy,
                    tickPositions,
                    ret;

                // Spokes
                if (axis.isCircular) {
                    ret = ['M', center[0] + chart.plotLeft, center[1] + chart.plotTop, 'L', end.x, end.y];

                    // Concentric circles
                } else if (axis.options.gridLineInterpolation === 'circle') {
                    value = axis.translate(value);
                    if (value) { // a value of 0 is in the center
                        ret = axis.getLinePath(0, value);
                    }
                    // Concentric polygons
                } else {
                    // Find the X axis in the same pane
                    each(chart.xAxis, function(a) {
                        if (a.pane === axis.pane) {
                            xAxis = a;
                        }
                    });
                    ret = [];
                    value = axis.translate(value);
                    tickPositions = xAxis.tickPositions;
                    if (xAxis.autoConnect) {
                        tickPositions = tickPositions.concat([tickPositions[0]]);
                    }
                    // Reverse the positions for concatenation of polygonal plot bands
                    if (reverse) {
                        tickPositions = [].concat(tickPositions).reverse();
                    }

                    each(tickPositions, function(pos, i) {
                        xy = xAxis.getPosition(pos, value);
                        ret.push(i ? 'L' : 'M', xy.x, xy.y);
                    });

                }
                return ret;
            },

            /**
             * Find the position for the axis title, by default inside the gauge
             */
            getTitlePosition: function() {
                var center = this.center,
                    chart = this.chart,
                    titleOptions = this.options.title;

                return {
                    x: chart.plotLeft + center[0] + (titleOptions.x || 0),
                    y: chart.plotTop + center[1] - ({
                            high: 0.5,
                            middle: 0.25,
                            low: 0
                        }[titleOptions.align] *
                        center[2]) + (titleOptions.y || 0)
                };
            }

        };

        /**
         * Override axisProto.init to mix in special axis instance functions and function overrides
         */
        wrap(axisProto, 'init', function(proceed, chart, userOptions) {
            var axis = this,
                angular = chart.angular,
                polar = chart.polar,
                isX = userOptions.isX,
                isHidden = angular && isX,
                isCircular,
                options,
                chartOptions = chart.options,
                paneIndex = userOptions.pane || 0,
                pane,
                paneOptions;

            // Before prototype.init
            if (angular) {
                extend(this, isHidden ? hiddenAxisMixin : radialAxisMixin);
                isCircular = !isX;
                if (isCircular) {
                    this.defaultRadialOptions = this.defaultRadialGaugeOptions;
                }

            } else if (polar) {
                extend(this, radialAxisMixin);
                isCircular = isX;
                this.defaultRadialOptions = isX ? this.defaultRadialXOptions : merge(this.defaultYAxisOptions, this.defaultRadialYOptions);

            }

            // Disable certain features on angular and polar axes
            if (angular || polar) {
                this.isRadial = true;
                chart.inverted = false;
                chartOptions.chart.zoomType = null;
            } else {
                this.isRadial = false;
            }

            // Run prototype.init
            proceed.call(this, chart, userOptions);

            if (!isHidden && (angular || polar)) {
                options = this.options;

                // Create the pane and set the pane options.
                if (!chart.panes) {
                    chart.panes = [];
                }
                this.pane = pane = chart.panes[paneIndex] = chart.panes[paneIndex] || new Pane(
                    splat(chartOptions.pane)[paneIndex],
                    chart,
                    axis
                );
                paneOptions = pane.options;

                // Start and end angle options are
                // given in degrees relative to top, while internal computations are
                // in radians relative to right (like SVG).
                this.angleRad = (options.angle || 0) * Math.PI / 180; // Y axis in polar charts
                this.startAngleRad = (paneOptions.startAngle - 90) * Math.PI / 180; // Gauges
                this.endAngleRad = (pick(paneOptions.endAngle, paneOptions.startAngle + 360) - 90) * Math.PI / 180; // Gauges
                this.offset = options.offset || 0;

                this.isCircular = isCircular;

            }

        });

        /**
         * Wrap auto label align to avoid setting axis-wide rotation on radial axes (#4920)
         * @param   {Function} proceed
         * @returns {String} Alignment
         */
        wrap(axisProto, 'autoLabelAlign', function(proceed) {
            if (!this.isRadial) {
                return proceed.apply(this, [].slice.call(arguments, 1));
            } // else return undefined
        });

        /**
         * Add special cases within the Tick class' methods for radial axes.
         */
        wrap(tickProto, 'getPosition', function(proceed, horiz, pos, tickmarkOffset, old) {
            var axis = this.axis;

            return axis.getPosition ?
                axis.getPosition(pos) :
                proceed.call(this, horiz, pos, tickmarkOffset, old);
        });

        /**
         * Wrap the getLabelPosition function to find the center position of the label
         * based on the distance option
         */
        wrap(tickProto, 'getLabelPosition', function(proceed, x, y, label, horiz, labelOptions, tickmarkOffset, index, step) {
            var axis = this.axis,
                optionsY = labelOptions.y,
                ret,
                centerSlot = 20, // 20 degrees to each side at the top and bottom
                align = labelOptions.align,
                angle = ((axis.translate(this.pos) + axis.startAngleRad + Math.PI / 2) / Math.PI * 180) % 360;

            if (axis.isRadial) { // Both X and Y axes in a polar chart
                ret = axis.getPosition(this.pos, (axis.center[2] / 2) + pick(labelOptions.distance, -25));

                // Automatically rotated
                if (labelOptions.rotation === 'auto') {
                    label.attr({
                        rotation: angle
                    });

                    // Vertically centered
                } else if (optionsY === null) {
                    optionsY = axis.chart.renderer.fontMetrics(label.styles.fontSize).b - label.getBBox().height / 2;
                }

                // Automatic alignment
                if (align === null) {
                    if (axis.isCircular) { // Y axis
                        if (this.label.getBBox().width > axis.len * axis.tickInterval / (axis.max - axis.min)) { // #3506
                            centerSlot = 0;
                        }
                        if (angle > centerSlot && angle < 180 - centerSlot) {
                            align = 'left'; // right hemisphere
                        } else if (angle > 180 + centerSlot && angle < 360 - centerSlot) {
                            align = 'right'; // left hemisphere
                        } else {
                            align = 'center'; // top or bottom
                        }
                    } else {
                        align = 'center';
                    }
                    label.attr({
                        align: align
                    });
                }

                ret.x += labelOptions.x;
                ret.y += optionsY;

            } else {
                ret = proceed.call(this, x, y, label, horiz, labelOptions, tickmarkOffset, index, step);
            }
            return ret;
        });

        /**
         * Wrap the getMarkPath function to return the path of the radial marker
         */
        wrap(tickProto, 'getMarkPath', function(proceed, x, y, tickLength, tickWidth, horiz, renderer) {
            var axis = this.axis,
                endPoint,
                ret;

            if (axis.isRadial) {
                endPoint = axis.getPosition(this.pos, axis.center[2] / 2 + tickLength);
                ret = [
                    'M',
                    x,
                    y,
                    'L',
                    endPoint.x,
                    endPoint.y
                ];
            } else {
                ret = proceed.call(this, x, y, tickLength, tickWidth, horiz, renderer);
            }
            return ret;
        });

    }(Highcharts));
    (function(H) {
        /**
         * (c) 2010-2016 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */
        'use strict';
        var each = H.each,
            noop = H.noop,
            pick = H.pick,
            Series = H.Series,
            seriesType = H.seriesType,
            seriesTypes = H.seriesTypes;
        /* 
         * The arearangeseries series type
         */
        seriesType('arearange', 'area', {

            lineWidth: 1,

            marker: null,
            threshold: null,
            tooltip: {

                pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>' // eslint-disable-line no-dupe-keys

            },
            trackByArea: true,
            dataLabels: {
                align: null,
                verticalAlign: null,
                xLow: 0,
                xHigh: 0,
                yLow: 0,
                yHigh: 0
            },
            states: {
                hover: {
                    halo: false
                }
            }

            // Prototype members
        }, {
            pointArrayMap: ['low', 'high'],
            dataLabelCollections: ['dataLabel', 'dataLabelUpper'],
            toYData: function(point) {
                return [point.low, point.high];
            },
            pointValKey: 'low',
            deferTranslatePolar: true,

            /**
             * Translate a point's plotHigh from the internal angle and radius measures to
             * true plotHigh coordinates. This is an addition of the toXY method found in
             * Polar.js, because it runs too early for arearanges to be considered (#3419).
             */
            highToXY: function(point) {
                // Find the polar plotX and plotY
                var chart = this.chart,
                    xy = this.xAxis.postTranslate(point.rectPlotX, this.yAxis.len - point.plotHigh);
                point.plotHighX = xy.x - chart.plotLeft;
                point.plotHigh = xy.y - chart.plotTop;
            },

            /**
             * Translate data points from raw values x and y to plotX and plotY
             */
            translate: function() {
                var series = this,
                    yAxis = series.yAxis,
                    hasModifyValue = !!series.modifyValue;

                seriesTypes.area.prototype.translate.apply(series);

                // Set plotLow and plotHigh
                each(series.points, function(point) {

                    var low = point.low,
                        high = point.high,
                        plotY = point.plotY;

                    if (high === null || low === null) {
                        point.isNull = true;
                    } else {
                        point.plotLow = plotY;
                        point.plotHigh = yAxis.translate(
                            hasModifyValue ? series.modifyValue(high, point) : high,
                            0,
                            1,
                            0,
                            1
                        );
                        if (hasModifyValue) {
                            point.yBottom = point.plotHigh;
                        }
                    }
                });

                // Postprocess plotHigh
                if (this.chart.polar) {
                    each(this.points, function(point) {
                        series.highToXY(point);
                    });
                }
            },

            /**
             * Extend the line series' getSegmentPath method by applying the segment
             * path to both lower and higher values of the range
             */
            getGraphPath: function(points) {

                var highPoints = [],
                    highAreaPoints = [],
                    i,
                    getGraphPath = seriesTypes.area.prototype.getGraphPath,
                    point,
                    pointShim,
                    linePath,
                    lowerPath,
                    options = this.options,
                    connectEnds = this.chart.polar && options.connectEnds !== false,
                    step = options.step,
                    higherPath,
                    higherAreaPath;

                points = points || this.points;
                i = points.length;

                // Create the top line and the top part of the area fill. The area fill compensates for 
                // null points by drawing down to the lower graph, moving across the null gap and 
                // starting again at the lower graph.
                i = points.length;
                while (i--) {
                    point = points[i];

                    if (!point.isNull &&
                        !connectEnds &&
                        (!points[i + 1] || points[i + 1].isNull)
                    ) {
                        highAreaPoints.push({
                            plotX: point.plotX,
                            plotY: point.plotY,
                            doCurve: false // #5186, gaps in areasplinerange fill
                        });
                    }

                    pointShim = {
                        polarPlotY: point.polarPlotY,
                        rectPlotX: point.rectPlotX,
                        yBottom: point.yBottom,
                        plotX: pick(point.plotHighX, point.plotX), // plotHighX is for polar charts
                        plotY: point.plotHigh,
                        isNull: point.isNull
                    };
                    highAreaPoints.push(pointShim);
                    highPoints.push(pointShim);

                    if (!point.isNull &&
                        !connectEnds &&
                        (!points[i - 1] || points[i - 1].isNull)
                    ) {
                        highAreaPoints.push({
                            plotX: point.plotX,
                            plotY: point.plotY,
                            doCurve: false // #5186, gaps in areasplinerange fill
                        });
                    }
                }

                // Get the paths
                lowerPath = getGraphPath.call(this, points);
                if (step) {
                    if (step === true) {
                        step = 'left';
                    }
                    options.step = {
                        left: 'right',
                        center: 'center',
                        right: 'left'
                    }[step]; // swap for reading in getGraphPath
                }
                higherPath = getGraphPath.call(this, highPoints);
                higherAreaPath = getGraphPath.call(this, highAreaPoints);
                options.step = step;

                // Create a line on both top and bottom of the range
                linePath = [].concat(lowerPath, higherPath);

                // For the area path, we need to change the 'move' statement into 'lineTo' or 'curveTo'
                if (!this.chart.polar && higherAreaPath[0] === 'M') {
                    higherAreaPath[0] = 'L'; // this probably doesn't work for spline			
                }

                this.graphPath = linePath;
                this.areaPath = this.areaPath.concat(lowerPath, higherAreaPath);

                // Prepare for sideways animation
                linePath.isArea = true;
                linePath.xMap = lowerPath.xMap;
                this.areaPath.xMap = lowerPath.xMap;

                return linePath;
            },

            /**
             * Extend the basic drawDataLabels method by running it for both lower and higher
             * values.
             */
            drawDataLabels: function() {

                var data = this.data,
                    length = data.length,
                    i,
                    originalDataLabels = [],
                    seriesProto = Series.prototype,
                    dataLabelOptions = this.options.dataLabels,
                    align = dataLabelOptions.align,
                    verticalAlign = dataLabelOptions.verticalAlign,
                    inside = dataLabelOptions.inside,
                    point,
                    up,
                    inverted = this.chart.inverted;

                if (dataLabelOptions.enabled || this._hasPointLabels) {

                    // Step 1: set preliminary values for plotY and dataLabel and draw the upper labels
                    i = length;
                    while (i--) {
                        point = data[i];
                        if (point) {
                            up = inside ? point.plotHigh < point.plotLow : point.plotHigh > point.plotLow;

                            // Set preliminary values
                            point.y = point.high;
                            point._plotY = point.plotY;
                            point.plotY = point.plotHigh;

                            // Store original data labels and set preliminary label objects to be picked up
                            // in the uber method
                            originalDataLabels[i] = point.dataLabel;
                            point.dataLabel = point.dataLabelUpper;

                            // Set the default offset
                            point.below = up;
                            if (inverted) {
                                if (!align) {
                                    dataLabelOptions.align = up ? 'right' : 'left';
                                }
                            } else {
                                if (!verticalAlign) {
                                    dataLabelOptions.verticalAlign = up ? 'top' : 'bottom';
                                }
                            }

                            dataLabelOptions.x = dataLabelOptions.xHigh;
                            dataLabelOptions.y = dataLabelOptions.yHigh;
                        }
                    }

                    if (seriesProto.drawDataLabels) {
                        seriesProto.drawDataLabels.apply(this, arguments); // #1209
                    }

                    // Step 2: reorganize and handle data labels for the lower values
                    i = length;
                    while (i--) {
                        point = data[i];
                        if (point) {
                            up = inside ? point.plotHigh < point.plotLow : point.plotHigh > point.plotLow;

                            // Move the generated labels from step 1, and reassign the original data labels
                            point.dataLabelUpper = point.dataLabel;
                            point.dataLabel = originalDataLabels[i];

                            // Reset values
                            point.y = point.low;
                            point.plotY = point._plotY;

                            // Set the default offset
                            point.below = !up;
                            if (inverted) {
                                if (!align) {
                                    dataLabelOptions.align = up ? 'left' : 'right';
                                }
                            } else {
                                if (!verticalAlign) {
                                    dataLabelOptions.verticalAlign = up ? 'bottom' : 'top';
                                }

                            }

                            dataLabelOptions.x = dataLabelOptions.xLow;
                            dataLabelOptions.y = dataLabelOptions.yLow;
                        }
                    }
                    if (seriesProto.drawDataLabels) {
                        seriesProto.drawDataLabels.apply(this, arguments);
                    }
                }

                dataLabelOptions.align = align;
                dataLabelOptions.verticalAlign = verticalAlign;
            },

            alignDataLabel: function() {
                seriesTypes.column.prototype.alignDataLabel.apply(this, arguments);
            },

            setStackedPoints: noop,

            getSymbol: noop,

            drawPoints: noop
        });

    }(Highcharts));
    (function(H) {
        /**
         * (c) 2010-2016 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */
        'use strict';

        var seriesType = H.seriesType,
            seriesTypes = H.seriesTypes;

        /**
         * The areasplinerange series type
         */
        seriesType('areasplinerange', 'arearange', null, {
            getPointSpline: seriesTypes.spline.prototype.getPointSpline
        });

    }(Highcharts));
    (function(H) {
        /**
         * (c) 2010-2016 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */
        'use strict';
        var defaultPlotOptions = H.defaultPlotOptions,
            each = H.each,
            merge = H.merge,
            noop = H.noop,
            pick = H.pick,
            seriesType = H.seriesType,
            seriesTypes = H.seriesTypes;

        var colProto = seriesTypes.column.prototype;

        /**
         * The ColumnRangeSeries class
         */
        seriesType('columnrange', 'arearange', merge(defaultPlotOptions.column, defaultPlotOptions.arearange, {
            lineWidth: 1,
            pointRange: null

            // Prototype members
        }), {
            /**
             * Translate data points from raw values x and y to plotX and plotY
             */
            translate: function() {
                var series = this,
                    yAxis = series.yAxis,
                    xAxis = series.xAxis,
                    startAngleRad = xAxis.startAngleRad,
                    start,
                    chart = series.chart,
                    isRadial = series.xAxis.isRadial,
                    plotHigh;

                colProto.translate.apply(series);

                // Set plotLow and plotHigh
                each(series.points, function(point) {
                    var shapeArgs = point.shapeArgs,
                        minPointLength = series.options.minPointLength,
                        heightDifference,
                        height,
                        y;

                    point.plotHigh = plotHigh = yAxis.translate(point.high, 0, 1, 0, 1);
                    point.plotLow = point.plotY;

                    // adjust shape
                    y = plotHigh;
                    height = pick(point.rectPlotY, point.plotY) - plotHigh;

                    // Adjust for minPointLength
                    if (Math.abs(height) < minPointLength) {
                        heightDifference = (minPointLength - height);
                        height += heightDifference;
                        y -= heightDifference / 2;

                        // Adjust for negative ranges or reversed Y axis (#1457)
                    } else if (height < 0) {
                        height *= -1;
                        y -= height;
                    }

                    if (isRadial) {

                        start = point.barX + startAngleRad;
                        point.shapeType = 'path';
                        point.shapeArgs = {
                            d: series.polarArc(y + height, y, start, start + point.pointWidth)
                        };
                    } else {
                        shapeArgs.height = height;
                        shapeArgs.y = y;

                        point.tooltipPos = chart.inverted ? [
                            yAxis.len + yAxis.pos - chart.plotLeft - y - height / 2,
                            xAxis.len + xAxis.pos - chart.plotTop - shapeArgs.x -
                            shapeArgs.width / 2,
                            height
                        ] : [
                            xAxis.left - chart.plotLeft + shapeArgs.x +
                            shapeArgs.width / 2,
                            yAxis.pos - chart.plotTop + y + height / 2,
                            height
                        ]; // don't inherit from column tooltip position - #3372
                    }
                });
            },
            directTouch: true,
            trackerGroups: ['group', 'dataLabelsGroup'],
            drawGraph: noop,
            crispCol: colProto.crispCol,
            drawPoints: colProto.drawPoints,
            drawTracker: colProto.drawTracker,
            getColumnMetrics: colProto.getColumnMetrics,
            animate: function() {
                return colProto.animate.apply(this, arguments);
            },
            polarArc: function() {
                return colProto.polarArc.apply(this, arguments);
            },
            pointAttribs: colProto.pointAttribs
        });

    }(Highcharts));
    (function(H) {
        /**
         * (c) 2010-2016 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */
        'use strict';
        var each = H.each,
            isNumber = H.isNumber,
            merge = H.merge,
            noop = H.noop,
            pick = H.pick,
            pInt = H.pInt,
            Series = H.Series,
            seriesType = H.seriesType,
            TrackerMixin = H.TrackerMixin;
        /* 
         * The GaugeSeries class
         */
        seriesType('gauge', 'line', {
            dataLabels: {
                enabled: true,
                defer: false,
                y: 15,
                borderRadius: 3,
                crop: false,
                verticalAlign: 'top',
                zIndex: 2,

                // Presentational
                borderWidth: 1,
                borderColor: '#cccccc'

            },
            dial: {
                // radius: '80%',
                // baseWidth: 3,
                // topWidth: 1,
                // baseLength: '70%' // of radius
                // rearLength: '10%'

                // backgroundColor: '#000000',
                // borderColor: '#cccccc',
                // borderWidth: 0


            },
            pivot: {
                //radius: 5,

                //borderWidth: 0
                //borderColor: '#cccccc',
                //backgroundColor: '#000000'

            },
            tooltip: {
                headerFormat: ''
            },
            showInLegend: false

            // Prototype members
        }, {
            // chart.angular will be set to true when a gauge series is present, and this will
            // be used on the axes
            angular: true,
            directTouch: true, // #5063
            drawGraph: noop,
            fixedBox: true,
            forceDL: true,
            noSharedTooltip: true,
            trackerGroups: ['group', 'dataLabelsGroup'],

            /**
             * Calculate paths etc
             */
            translate: function() {

                var series = this,
                    yAxis = series.yAxis,
                    options = series.options,
                    center = yAxis.center;

                series.generatePoints();

                each(series.points, function(point) {

                    var dialOptions = merge(options.dial, point.dial),
                        radius = (pInt(pick(dialOptions.radius, 80)) * center[2]) / 200,
                        baseLength = (pInt(pick(dialOptions.baseLength, 70)) * radius) / 100,
                        rearLength = (pInt(pick(dialOptions.rearLength, 10)) * radius) / 100,
                        baseWidth = dialOptions.baseWidth || 3,
                        topWidth = dialOptions.topWidth || 1,
                        overshoot = options.overshoot,
                        rotation = yAxis.startAngleRad + yAxis.translate(point.y, null, null, null, true);

                    // Handle the wrap and overshoot options
                    if (isNumber(overshoot)) {
                        overshoot = overshoot / 180 * Math.PI;
                        rotation = Math.max(yAxis.startAngleRad - overshoot, Math.min(yAxis.endAngleRad + overshoot, rotation));

                    } else if (options.wrap === false) {
                        rotation = Math.max(yAxis.startAngleRad, Math.min(yAxis.endAngleRad, rotation));
                    }

                    rotation = rotation * 180 / Math.PI;

                    point.shapeType = 'path';
                    point.shapeArgs = {
                        d: dialOptions.path || [
                            'M', -rearLength, -baseWidth / 2,
                            'L',
                            baseLength, -baseWidth / 2,
                            radius, -topWidth / 2,
                            radius, topWidth / 2,
                            baseLength, baseWidth / 2, -rearLength, baseWidth / 2,
                            'z'
                        ],
                        translateX: center[0],
                        translateY: center[1],
                        rotation: rotation
                    };

                    // Positions for data label
                    point.plotX = center[0];
                    point.plotY = center[1];
                });
            },

            /**
             * Draw the points where each point is one needle
             */
            drawPoints: function() {

                var series = this,
                    center = series.yAxis.center,
                    pivot = series.pivot,
                    options = series.options,
                    pivotOptions = options.pivot,
                    renderer = series.chart.renderer;

                each(series.points, function(point) {

                    var graphic = point.graphic,
                        shapeArgs = point.shapeArgs,
                        d = shapeArgs.d,
                        dialOptions = merge(options.dial, point.dial); // #1233

                    if (graphic) {
                        graphic.animate(shapeArgs);
                        shapeArgs.d = d; // animate alters it
                    } else {
                        point.graphic = renderer[point.shapeType](shapeArgs)
                            .attr({
                                rotation: shapeArgs.rotation, // required by VML when animation is false
                                zIndex: 1
                            })
                            .addClass('highcharts-dial')
                            .add(series.group);


                        // Presentational attributes
                        point.graphic.attr({
                            stroke: dialOptions.borderColor || 'none',
                            'stroke-width': dialOptions.borderWidth || 0,
                            fill: dialOptions.backgroundColor || '#000000'
                        });

                    }
                });

                // Add or move the pivot
                if (pivot) {
                    pivot.animate({ // #1235
                        translateX: center[0],
                        translateY: center[1]
                    });
                } else {
                    series.pivot = renderer.circle(0, 0, pick(pivotOptions.radius, 5))
                        .attr({
                            zIndex: 2
                        })
                        .addClass('highcharts-pivot')
                        .translate(center[0], center[1])
                        .add(series.group);


                    // Presentational attributes
                    series.pivot.attr({
                        'stroke-width': pivotOptions.borderWidth || 0,
                        stroke: pivotOptions.borderColor || '#cccccc',
                        fill: pivotOptions.backgroundColor || '#000000'
                    });

                }
            },

            /**
             * Animate the arrow up from startAngle
             */
            animate: function(init) {
                var series = this;

                if (!init) {
                    each(series.points, function(point) {
                        var graphic = point.graphic;

                        if (graphic) {
                            // start value
                            graphic.attr({
                                rotation: series.yAxis.startAngleRad * 180 / Math.PI
                            });

                            // animate
                            graphic.animate({
                                rotation: point.shapeArgs.rotation
                            }, series.options.animation);
                        }
                    });

                    // delete this function to allow it only once
                    series.animate = null;
                }
            },

            render: function() {
                this.group = this.plotGroup(
                    'group',
                    'series',
                    this.visible ? 'visible' : 'hidden',
                    this.options.zIndex,
                    this.chart.seriesGroup
                );
                Series.prototype.render.call(this);
                this.group.clip(this.chart.clipRect);
            },

            /**
             * Extend the basic setData method by running processData and generatePoints immediately,
             * in order to access the points from the legend.
             */
            setData: function(data, redraw) {
                Series.prototype.setData.call(this, data, false);
                this.processData();
                this.generatePoints();
                if (pick(redraw, true)) {
                    this.chart.redraw();
                }
            },

            /**
             * If the tracking module is loaded, add the point tracker
             */
            drawTracker: TrackerMixin && TrackerMixin.drawTrackerPoint

            // Point members
        }, {
            /**
             * Don't do any hover colors or anything
             */
            setState: function(state) {
                this.state = state;
            }
        });

    }(Highcharts));
    (function(H) {
        /**
         * (c) 2010-2016 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */
        'use strict';
        var each = H.each,
            noop = H.noop,
            pick = H.pick,
            seriesType = H.seriesType,
            seriesTypes = H.seriesTypes;

        /**
         * The boxplot series type.
         *
         * @constructor seriesTypes.boxplot
         * @augments seriesTypes.column
         */
        seriesType('boxplot', 'column', {
            threshold: null,
            tooltip: {

                pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {series.name}</b><br/>' + // eslint-disable-line no-dupe-keys
                    'Maximum: {point.high}<br/>' +
                    'Upper quartile: {point.q3}<br/>' +
                    'Median: {point.median}<br/>' +
                    'Lower quartile: {point.q1}<br/>' +
                    'Minimum: {point.low}<br/>'

            },
            whiskerLength: '50%',

            fillColor: '#ffffff',
            lineWidth: 1,
            //medianColor: null,
            medianWidth: 2,
            states: {
                hover: {
                    brightness: -0.3
                }
            },
            //stemColor: null,
            //stemDashStyle: 'solid'
            //stemWidth: null,

            //whiskerColor: null,
            whiskerWidth: 2


        }, /** @lends seriesTypes.boxplot */ {
            pointArrayMap: ['low', 'q1', 'median', 'q3', 'high'], // array point configs are mapped to this
            toYData: function(point) { // return a plain array for speedy calculation
                return [point.low, point.q1, point.median, point.q3, point.high];
            },
            pointValKey: 'high', // defines the top of the tracker


            /**
             * Get presentational attributes
             */
            pointAttribs: function(point) {
                var options = this.options,
                    color = (point && point.color) || this.color;

                return {
                    'fill': point.fillColor || options.fillColor || color,
                    'stroke': options.lineColor || color,
                    'stroke-width': options.lineWidth || 0
                };
            },


            /**
             * Disable data labels for box plot
             */
            drawDataLabels: noop,

            /**
             * Translate data points from raw values x and y to plotX and plotY
             */
            translate: function() {
                var series = this,
                    yAxis = series.yAxis,
                    pointArrayMap = series.pointArrayMap;

                seriesTypes.column.prototype.translate.apply(series);

                // do the translation on each point dimension
                each(series.points, function(point) {
                    each(pointArrayMap, function(key) {
                        if (point[key] !== null) {
                            point[key + 'Plot'] = yAxis.translate(point[key], 0, 1, 0, 1);
                        }
                    });
                });
            },

            /**
             * Draw the data points
             */
            drawPoints: function() {
                var series = this, //state = series.state,
                    points = series.points,
                    options = series.options,
                    chart = series.chart,
                    renderer = chart.renderer,
                    q1Plot,
                    q3Plot,
                    highPlot,
                    lowPlot,
                    medianPlot,
                    medianPath,
                    crispCorr,
                    crispX = 0,
                    boxPath,
                    width,
                    left,
                    right,
                    halfWidth,
                    doQuartiles = series.doQuartiles !== false, // error bar inherits this series type but doesn't do quartiles
                    pointWiskerLength,
                    whiskerLength = series.options.whiskerLength;


                each(points, function(point) {

                    var graphic = point.graphic,
                        verb = graphic ? 'animate' : 'attr',
                        shapeArgs = point.shapeArgs; // the box


                    var boxAttr,
                        stemAttr = {},
                        whiskersAttr = {},
                        medianAttr = {},
                        color = point.color || series.color;


                    if (point.plotY !== undefined) {

                        // crisp vector coordinates
                        width = shapeArgs.width;
                        left = Math.floor(shapeArgs.x);
                        right = left + width;
                        halfWidth = Math.round(width / 2);
                        q1Plot = Math.floor(doQuartiles ? point.q1Plot : point.lowPlot);
                        q3Plot = Math.floor(doQuartiles ? point.q3Plot : point.lowPlot);
                        highPlot = Math.floor(point.highPlot);
                        lowPlot = Math.floor(point.lowPlot);

                        if (!graphic) {
                            point.graphic = graphic = renderer.g('point')
                                .add(series.group);

                            point.stem = renderer.path()
                                .addClass('highcharts-boxplot-stem')
                                .add(graphic);

                            if (whiskerLength) {
                                point.whiskers = renderer.path()
                                    .addClass('highcharts-boxplot-whisker')
                                    .add(graphic);
                            }
                            if (doQuartiles) {
                                point.box = renderer.path(boxPath)
                                    .addClass('highcharts-boxplot-box')
                                    .add(graphic);
                            }
                            point.medianShape = renderer.path(medianPath)
                                .addClass('highcharts-boxplot-median')
                                .add(graphic);




                            // Stem attributes
                            stemAttr.stroke = point.stemColor || options.stemColor || color;
                            stemAttr['stroke-width'] = pick(point.stemWidth, options.stemWidth, options.lineWidth);
                            stemAttr.dashstyle = point.stemDashStyle || options.stemDashStyle;
                            point.stem.attr(stemAttr);

                            // Whiskers attributes
                            if (whiskerLength) {
                                whiskersAttr.stroke = point.whiskerColor || options.whiskerColor || color;
                                whiskersAttr['stroke-width'] = pick(point.whiskerWidth, options.whiskerWidth, options.lineWidth);
                                point.whiskers.attr(whiskersAttr);
                            }

                            if (doQuartiles) {
                                boxAttr = series.pointAttribs(point);
                                point.box.attr(boxAttr);
                            }


                            // Median attributes
                            medianAttr.stroke = point.medianColor || options.medianColor || color;
                            medianAttr['stroke-width'] = pick(point.medianWidth, options.medianWidth, options.lineWidth);
                            point.medianShape.attr(medianAttr);


                        }



                        // The stem
                        crispCorr = (point.stem.strokeWidth() % 2) / 2;
                        crispX = left + halfWidth + crispCorr;
                        point.stem[verb]({
                            d: [
                                // stem up
                                'M',
                                crispX, q3Plot,
                                'L',
                                crispX, highPlot,

                                // stem down
                                'M',
                                crispX, q1Plot,
                                'L',
                                crispX, lowPlot
                            ]
                        });

                        // The box
                        if (doQuartiles) {
                            crispCorr = (point.box.strokeWidth() % 2) / 2;
                            q1Plot = Math.floor(q1Plot) + crispCorr;
                            q3Plot = Math.floor(q3Plot) + crispCorr;
                            left += crispCorr;
                            right += crispCorr;
                            point.box[verb]({
                                d: [
                                    'M',
                                    left, q3Plot,
                                    'L',
                                    left, q1Plot,
                                    'L',
                                    right, q1Plot,
                                    'L',
                                    right, q3Plot,
                                    'L',
                                    left, q3Plot,
                                    'z'
                                ]
                            });
                        }

                        // The whiskers
                        if (whiskerLength) {
                            crispCorr = (point.whiskers.strokeWidth() % 2) / 2;
                            highPlot = highPlot + crispCorr;
                            lowPlot = lowPlot + crispCorr;
                            pointWiskerLength = (/%$/).test(whiskerLength) ? halfWidth * parseFloat(whiskerLength) / 100 : whiskerLength / 2;
                            point.whiskers[verb]({
                                d: [
                                    // High whisker
                                    'M',
                                    crispX - pointWiskerLength,
                                    highPlot,
                                    'L',
                                    crispX + pointWiskerLength,
                                    highPlot,

                                    // Low whisker
                                    'M',
                                    crispX - pointWiskerLength,
                                    lowPlot,
                                    'L',
                                    crispX + pointWiskerLength,
                                    lowPlot
                                ]
                            });
                        }

                        // The median
                        medianPlot = Math.round(point.medianPlot);
                        crispCorr = (point.medianShape.strokeWidth() % 2) / 2;
                        medianPlot = medianPlot + crispCorr;

                        point.medianShape[verb]({
                            d: [
                                'M',
                                left,
                                medianPlot,
                                'L',
                                right,
                                medianPlot
                            ]
                        });
                    }
                });

            },
            setStackedPoints: noop // #3890


        });

        /* ****************************************************************************
         * End Box plot series code												*
         *****************************************************************************/

    }(Highcharts));
    (function(H) {
        /**
         * (c) 2010-2016 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */
        'use strict';
        var each = H.each,
            noop = H.noop,
            seriesType = H.seriesType,
            seriesTypes = H.seriesTypes;


        /* ****************************************************************************
         * Start error bar series code                                                *
         *****************************************************************************/
        seriesType('errorbar', 'boxplot', {

            color: '#000000',

            grouping: false,
            linkedTo: ':previous',
            tooltip: {
                pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>'
            },
            whiskerWidth: null

            // Prototype members
        }, {
            type: 'errorbar',
            pointArrayMap: ['low', 'high'], // array point configs are mapped to this
            toYData: function(point) { // return a plain array for speedy calculation
                return [point.low, point.high];
            },
            pointValKey: 'high', // defines the top of the tracker
            doQuartiles: false,
            drawDataLabels: seriesTypes.arearange ? function() {
                var valKey = this.pointValKey;
                seriesTypes.arearange.prototype.drawDataLabels.call(this);
                // Arearange drawDataLabels does not reset point.y to high, but to low after drawing. #4133 
                each(this.data, function(point) {
                    point.y = point[valKey];
                });
            } : noop,

            /**
             * Get the width and X offset, either on top of the linked series column
             * or standalone
             */
            getColumnMetrics: function() {
                return (this.linkedParent && this.linkedParent.columnMetrics) ||
                    seriesTypes.column.prototype.getColumnMetrics.call(this);
            }
        });

        /* ****************************************************************************
         * End error bar series code                                                  *
         *****************************************************************************/

    }(Highcharts));
    (function(H) {
        /**
         * (c) 2010-2016 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */
        'use strict';
        var correctFloat = H.correctFloat,
            isNumber = H.isNumber,
            noop = H.noop,
            pick = H.pick,
            Point = H.Point,
            Series = H.Series,
            seriesType = H.seriesType,
            seriesTypes = H.seriesTypes;

        /* ****************************************************************************
         * Start Waterfall series code                                                *
         *****************************************************************************/
        seriesType('waterfall', 'column', {
            dataLabels: {
                inside: true
            },

            lineWidth: 1,
            lineColor: '#333333',
            dashStyle: 'dot',
            borderColor: '#333333',
            states: {
                hover: {
                    lineWidthPlus: 0 // #3126
                }
            }


            // Prototype members
        }, {
            pointValKey: 'y',

            /**
             * Translate data points from raw values
             */
            translate: function() {
                var series = this,
                    options = series.options,
                    yAxis = series.yAxis,
                    len,
                    i,
                    points,
                    point,
                    shapeArgs,
                    stack,
                    y,
                    yValue,
                    previousY,
                    previousIntermediate,
                    range,
                    minPointLength = pick(options.minPointLength, 5),
                    threshold = options.threshold,
                    stacking = options.stacking,
                    // Separate offsets for negative and positive columns:
                    positiveOffset = 0,
                    negativeOffset = 0,
                    stackIndicator,
                    tooltipY;

                // run column series translate
                seriesTypes.column.prototype.translate.apply(this);

                previousY = previousIntermediate = threshold;
                points = series.points;

                for (i = 0, len = points.length; i < len; i++) {
                    // cache current point object
                    point = points[i];
                    yValue = this.processedYData[i];
                    shapeArgs = point.shapeArgs;

                    // get current stack
                    stack = stacking && yAxis.stacks[(series.negStacks && yValue < threshold ? '-' : '') + series.stackKey];
                    stackIndicator = series.getStackIndicator(stackIndicator, point.x);
                    range = stack ?
                        stack[point.x].points[series.index + ',' + i + ',' + stackIndicator.index] : [0, yValue];

                    // override point value for sums
                    // #3710 Update point does not propagate to sum
                    if (point.isSum) {
                        point.y = correctFloat(yValue);
                    } else if (point.isIntermediateSum) {
                        point.y = correctFloat(yValue - previousIntermediate); // #3840
                    }
                    // up points
                    y = Math.max(previousY, previousY + point.y) + range[0];
                    shapeArgs.y = yAxis.toPixels(y, true);


                    // sum points
                    if (point.isSum) {
                        shapeArgs.y = yAxis.toPixels(range[1], true);
                        shapeArgs.height = Math.min(yAxis.toPixels(range[0], true), yAxis.len) -
                            shapeArgs.y + positiveOffset + negativeOffset; // #4256

                    } else if (point.isIntermediateSum) {
                        shapeArgs.y = yAxis.toPixels(range[1], true);
                        shapeArgs.height = Math.min(yAxis.toPixels(previousIntermediate, true), yAxis.len) -
                            shapeArgs.y + positiveOffset + negativeOffset;
                        previousIntermediate = range[1];

                        // If it's not the sum point, update previous stack end position and get
                        // shape height (#3886)
                    } else {
                        shapeArgs.height = yValue > 0 ?
                            yAxis.toPixels(previousY, true) - shapeArgs.y :
                            yAxis.toPixels(previousY, true) - yAxis.toPixels(previousY - yValue, true);
                        previousY += yValue;
                    }
                    // #3952 Negative sum or intermediate sum not rendered correctly
                    if (shapeArgs.height < 0) {
                        shapeArgs.y += shapeArgs.height;
                        shapeArgs.height *= -1;
                    }

                    point.plotY = shapeArgs.y = Math.round(shapeArgs.y) - (series.borderWidth % 2) / 2;
                    shapeArgs.height = Math.max(Math.round(shapeArgs.height), 0.001); // #3151
                    point.yBottom = shapeArgs.y + shapeArgs.height;

                    // Before minPointLength, apply negative offset:
                    shapeArgs.y -= negativeOffset;


                    if (shapeArgs.height <= minPointLength && !point.isNull) {
                        shapeArgs.height = minPointLength;
                        if (point.y < 0) {
                            negativeOffset -= minPointLength;
                        } else {
                            positiveOffset += minPointLength;
                        }
                    }

                    // After minPointLength is updated, apply positive offset:
                    shapeArgs.y -= positiveOffset;

                    // Correct tooltip placement (#3014)
                    tooltipY = point.plotY - negativeOffset - positiveOffset +
                        (point.negative && negativeOffset >= 0 ? shapeArgs.height : 0);
                    if (series.chart.inverted) {
                        point.tooltipPos[0] = yAxis.len - tooltipY;
                    } else {
                        point.tooltipPos[1] = tooltipY;
                    }
                }
            },

            /**
             * Call default processData then override yData to reflect waterfall's extremes on yAxis
             */
            processData: function(force) {
                var series = this,
                    options = series.options,
                    yData = series.yData,
                    points = series.options.data, // #3710 Update point does not propagate to sum
                    point,
                    dataLength = yData.length,
                    threshold = options.threshold || 0,
                    subSum,
                    sum,
                    dataMin,
                    dataMax,
                    y,
                    i;

                sum = subSum = dataMin = dataMax = threshold;

                for (i = 0; i < dataLength; i++) {
                    y = yData[i];
                    point = points && points[i] ? points[i] : {};

                    if (y === 'sum' || point.isSum) {
                        yData[i] = correctFloat(sum);
                    } else if (y === 'intermediateSum' || point.isIntermediateSum) {
                        yData[i] = correctFloat(subSum);
                    } else {
                        sum += y;
                        subSum += y;
                    }
                    dataMin = Math.min(sum, dataMin);
                    dataMax = Math.max(sum, dataMax);
                }

                Series.prototype.processData.call(this, force);

                // Record extremes
                series.dataMin = dataMin;
                series.dataMax = dataMax;
            },

            /**
             * Return y value or string if point is sum
             */
            toYData: function(pt) {
                if (pt.isSum) {
                    return (pt.x === 0 ? null : 'sum'); //#3245 Error when first element is Sum or Intermediate Sum
                }
                if (pt.isIntermediateSum) {
                    return (pt.x === 0 ? null : 'intermediateSum'); //#3245
                }
                return pt.y;
            },


            /**
             * Postprocess mapping between options and SVG attributes
             */
            pointAttribs: function(point, state) {

                var upColor = this.options.upColor,
                    attr;

                // Set or reset up color (#3710, update to negative)
                if (upColor && !point.options.color) {
                    point.color = point.y > 0 ? upColor : null;
                }

                attr = seriesTypes.column.prototype.pointAttribs.call(this, point, state);

                // The dashStyle option in waterfall applies to the graph, not
                // the points
                delete attr.dashstyle;

                return attr;
            },


            /**
             * Return an empty path initially, because we need to know the stroke-width in order 
             * to set the final path.
             */
            getGraphPath: function() {
                return ['M', 0, 0];
            },

            /**
             * Draw columns' connector lines
             */
            getCrispPath: function() {

                var data = this.data,
                    length = data.length,
                    lineWidth = this.graph.strokeWidth() + this.borderWidth,
                    normalizer = Math.round(lineWidth) % 2 / 2,
                    path = [],
                    prevArgs,
                    pointArgs,
                    i,
                    d;

                for (i = 1; i < length; i++) {
                    pointArgs = data[i].shapeArgs;
                    prevArgs = data[i - 1].shapeArgs;

                    d = [
                        'M',
                        prevArgs.x + prevArgs.width, prevArgs.y + normalizer,
                        'L',
                        pointArgs.x, prevArgs.y + normalizer
                    ];

                    if (data[i - 1].y < 0) {
                        d[2] += prevArgs.height;
                        d[5] += prevArgs.height;
                    }

                    path = path.concat(d);
                }

                return path;
            },

            /**
             * The graph is initally drawn with an empty definition, then updated with
             * crisp rendering.
             */
            drawGraph: function() {
                Series.prototype.drawGraph.call(this);
                this.graph.attr({
                    d: this.getCrispPath()
                });
            },

            /**
             * Extremes are recorded in processData
             */
            getExtremes: noop

            // Point members
        }, {
            getClassName: function() {
                var className = Point.prototype.getClassName.call(this);

                if (this.isSum) {
                    className += ' highcharts-sum';
                } else if (this.isIntermediateSum) {
                    className += ' highcharts-intermediate-sum';
                }
                return className;
            },
            /**
             * Pass the null test in ColumnSeries.translate.
             */
            isValid: function() {
                return isNumber(this.y, true) || this.isSum || this.isIntermediateSum;
            }

        });

        /* ****************************************************************************
         * End Waterfall series code                                                  *
         *****************************************************************************/

    }(Highcharts));
    (function(H) {
        /**
         * (c) 2010-2016 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */
        'use strict';
        var LegendSymbolMixin = H.LegendSymbolMixin,
            noop = H.noop,
            Series = H.Series,
            seriesType = H.seriesType,
            seriesTypes = H.seriesTypes;
        /**
         * The polygon series prototype
         */
        seriesType('polygon', 'scatter', {
            marker: {
                enabled: false,
                states: {
                    hover: {
                        enabled: false
                    }
                }
            },
            stickyTracking: false,
            tooltip: {
                followPointer: true,
                pointFormat: ''
            },
            trackByArea: true

            // Prototype members
        }, {
            type: 'polygon',
            getGraphPath: function() {

                var graphPath = Series.prototype.getGraphPath.call(this),
                    i = graphPath.length + 1;

                // Close all segments
                while (i--) {
                    if ((i === graphPath.length || graphPath[i] === 'M') && i > 0) {
                        graphPath.splice(i, 0, 'z');
                    }
                }
                this.areaPath = graphPath;
                return graphPath;
            },
            drawGraph: function() {

                this.options.fillColor = this.color; // Hack into the fill logic in area.drawGraph

                seriesTypes.area.prototype.drawGraph.call(this);
            },
            drawLegendSymbol: LegendSymbolMixin.drawRectangle,
            drawTracker: Series.prototype.drawTracker,
            setStackedPoints: noop // No stacking points on polygons (#5310)
        });

    }(Highcharts));
    (function(H) {
        /**
         * (c) 2010-2016 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */
        'use strict';
        var arrayMax = H.arrayMax,
            arrayMin = H.arrayMin,
            Axis = H.Axis,
            color = H.color,
            each = H.each,
            isNumber = H.isNumber,
            noop = H.noop,
            pick = H.pick,
            pInt = H.pInt,
            Point = H.Point,
            Series = H.Series,
            seriesType = H.seriesType,
            seriesTypes = H.seriesTypes;

        /* ****************************************************************************
         * Start Bubble series code											          *
         *****************************************************************************/

        seriesType('bubble', 'scatter', {
            dataLabels: {
                formatter: function() { // #2945
                    return this.point.z;
                },
                inside: true,
                verticalAlign: 'middle'
            },
            // displayNegative: true,
            marker: {

                // fillOpacity: 0.5,
                lineColor: null, // inherit from series.color
                lineWidth: 1,

                // Avoid offset in Point.setState
                radius: null,
                states: {
                    hover: {
                        radiusPlus: 0
                    }
                },
                symbol: 'circle'
            },
            minSize: 8,
            maxSize: '20%',
            // negativeColor: null,
            // sizeBy: 'area'
            softThreshold: false,
            states: {
                hover: {
                    halo: {
                        size: 5
                    }
                }
            },
            tooltip: {
                pointFormat: '({point.x}, {point.y}), Size: {point.z}'
            },
            turboThreshold: 0,
            zThreshold: 0,
            zoneAxis: 'z'

            // Prototype members
        }, {
            pointArrayMap: ['y', 'z'],
            parallelArrays: ['x', 'y', 'z'],
            trackerGroups: ['markerGroup', 'dataLabelsGroup'],
            bubblePadding: true,
            zoneAxis: 'z',


            pointAttribs: function(point, state) {
                var markerOptions = this.options.marker,
                    fillOpacity = pick(markerOptions.fillOpacity, 0.5),
                    attr = Series.prototype.pointAttribs.call(this, point, state);

                if (fillOpacity !== 1) {
                    attr.fill = color(attr.fill).setOpacity(fillOpacity).get('rgba');
                }

                return attr;
            },


            /**
             * Get the radius for each point based on the minSize, maxSize and each point's Z value. This
             * must be done prior to Series.translate because the axis needs to add padding in
             * accordance with the point sizes.
             */
            getRadii: function(zMin, zMax, minSize, maxSize) {
                var len,
                    i,
                    pos,
                    zData = this.zData,
                    radii = [],
                    options = this.options,
                    sizeByArea = options.sizeBy !== 'width',
                    zThreshold = options.zThreshold,
                    zRange = zMax - zMin,
                    value,
                    radius;

                // Set the shape type and arguments to be picked up in drawPoints
                for (i = 0, len = zData.length; i < len; i++) {

                    value = zData[i];

                    // When sizing by threshold, the absolute value of z determines the size
                    // of the bubble.
                    if (options.sizeByAbsoluteValue && value !== null) {
                        value = Math.abs(value - zThreshold);
                        zMax = Math.max(zMax - zThreshold, Math.abs(zMin - zThreshold));
                        zMin = 0;
                    }

                    if (value === null) {
                        radius = null;
                        // Issue #4419 - if value is less than zMin, push a radius that's always smaller than the minimum size
                    } else if (value < zMin) {
                        radius = minSize / 2 - 1;
                    } else {
                        // Relative size, a number between 0 and 1
                        pos = zRange > 0 ? (value - zMin) / zRange : 0.5;

                        if (sizeByArea && pos >= 0) {
                            pos = Math.sqrt(pos);
                        }
                        radius = Math.ceil(minSize + pos * (maxSize - minSize)) / 2;
                    }
                    radii.push(radius);
                }
                this.radii = radii;
            },

            /**
             * Perform animation on the bubbles
             */
            animate: function(init) {
                var animation = this.options.animation;

                if (!init) { // run the animation
                    each(this.points, function(point) {
                        var graphic = point.graphic,
                            animationTarget;

                        if (graphic && graphic.width) { // URL symbols don't have width
                            animationTarget = {
                                x: graphic.x,
                                y: graphic.y,
                                width: graphic.width,
                                height: graphic.height
                            };

                            // Start values
                            graphic.attr({
                                x: point.plotX,
                                y: point.plotY,
                                width: 1,
                                height: 1
                            });

                            // Run animation
                            graphic.animate(animationTarget, animation);
                        }
                    });

                    // delete this function to allow it only once
                    this.animate = null;
                }
            },

            /**
             * Extend the base translate method to handle bubble size
             */
            translate: function() {

                var i,
                    data = this.data,
                    point,
                    radius,
                    radii = this.radii;

                // Run the parent method
                seriesTypes.scatter.prototype.translate.call(this);

                // Set the shape type and arguments to be picked up in drawPoints
                i = data.length;

                while (i--) {
                    point = data[i];
                    radius = radii ? radii[i] : 0; // #1737

                    if (isNumber(radius) && radius >= this.minPxSize / 2) {
                        // Shape arguments
                        point.marker = {
                            radius: radius,
                            width: 2 * radius,
                            height: 2 * radius
                        };

                        // Alignment box for the data label
                        point.dlBox = {
                            x: point.plotX - radius,
                            y: point.plotY - radius,
                            width: 2 * radius,
                            height: 2 * radius
                        };
                    } else { // below zThreshold
                        point.shapeArgs = point.plotY = point.dlBox = undefined; // #1691
                    }
                }
            },

            alignDataLabel: seriesTypes.column.prototype.alignDataLabel,
            buildKDTree: noop,
            applyZones: noop

            // Point class
        }, {
            haloPath: function(size) {
                return Point.prototype.haloPath.call(
                    this,
                    size === 0 ? 0 : this.marker.radius + size // #6067
                );
            },
            ttBelow: false
        });

        /**
         * Add logic to pad each axis with the amount of pixels
         * necessary to avoid the bubbles to overflow.
         */
        Axis.prototype.beforePadding = function() {
            var axis = this,
                axisLength = this.len,
                chart = this.chart,
                pxMin = 0,
                pxMax = axisLength,
                isXAxis = this.isXAxis,
                dataKey = isXAxis ? 'xData' : 'yData',
                min = this.min,
                extremes = {},
                smallestSize = Math.min(chart.plotWidth, chart.plotHeight),
                zMin = Number.MAX_VALUE,
                zMax = -Number.MAX_VALUE,
                range = this.max - min,
                transA = axisLength / range,
                activeSeries = [];

            // Handle padding on the second pass, or on redraw
            each(this.series, function(series) {

                var seriesOptions = series.options,
                    zData;

                if (series.bubblePadding && (series.visible || !chart.options.chart.ignoreHiddenSeries)) {

                    // Correction for #1673
                    axis.allowZoomOutside = true;

                    // Cache it
                    activeSeries.push(series);

                    if (isXAxis) { // because X axis is evaluated first

                        // For each series, translate the size extremes to pixel values
                        each(['minSize', 'maxSize'], function(prop) {
                            var length = seriesOptions[prop],
                                isPercent = /%$/.test(length);

                            length = pInt(length);
                            extremes[prop] = isPercent ?
                                smallestSize * length / 100 :
                                length;

                        });
                        series.minPxSize = extremes.minSize;
                        // Prioritize min size if conflict to make sure bubbles are
                        // always visible. #5873
                        series.maxPxSize = Math.max(extremes.maxSize, extremes.minSize);

                        // Find the min and max Z
                        zData = series.zData;
                        if (zData.length) { // #1735
                            zMin = pick(seriesOptions.zMin, Math.min(
                                zMin,
                                Math.max(
                                    arrayMin(zData),
                                    seriesOptions.displayNegative === false ? seriesOptions.zThreshold : -Number.MAX_VALUE
                                )
                            ));
                            zMax = pick(seriesOptions.zMax, Math.max(zMax, arrayMax(zData)));
                        }
                    }
                }
            });

            each(activeSeries, function(series) {

                var data = series[dataKey],
                    i = data.length,
                    radius;

                if (isXAxis) {
                    series.getRadii(zMin, zMax, series.minPxSize, series.maxPxSize);
                }

                if (range > 0) {
                    while (i--) {
                        if (isNumber(data[i]) && axis.dataMin <= data[i] && data[i] <= axis.dataMax) {
                            radius = series.radii[i];
                            pxMin = Math.min(((data[i] - min) * transA) - radius, pxMin);
                            pxMax = Math.max(((data[i] - min) * transA) + radius, pxMax);
                        }
                    }
                }
            });

            if (activeSeries.length && range > 0 && !this.isLog) {
                pxMax -= axisLength;
                transA *= (axisLength + pxMin - pxMax) / axisLength;
                each([
                    ['min', 'userMin', pxMin],
                    ['max', 'userMax', pxMax]
                ], function(keys) {
                    if (pick(axis.options[keys[0]], axis[keys[1]]) === undefined) {
                        axis[keys[0]] += keys[2] / transA;
                    }
                });
            }
        };

        /* ****************************************************************************
         * End Bubble series code                                                     *
         *****************************************************************************/

    }(Highcharts));
    (function(H) {
        /**
         * (c) 2010-2016 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */
        'use strict';

        /**
         * Extensions for polar charts. Additionally, much of the geometry required for polar charts is
         * gathered in RadialAxes.js.
         *
         */

        var each = H.each,
            pick = H.pick,
            Pointer = H.Pointer,
            Series = H.Series,
            seriesTypes = H.seriesTypes,
            wrap = H.wrap,

            seriesProto = Series.prototype,
            pointerProto = Pointer.prototype,
            colProto;

        /**
         * Search a k-d tree by the point angle, used for shared tooltips in polar charts
         */
        seriesProto.searchPointByAngle = function(e) {
            var series = this,
                chart = series.chart,
                xAxis = series.xAxis,
                center = xAxis.pane.center,
                plotX = e.chartX - center[0] - chart.plotLeft,
                plotY = e.chartY - center[1] - chart.plotTop;

            return this.searchKDTree({
                clientX: 180 + (Math.atan2(plotX, plotY) * (-180 / Math.PI))
            });

        };

        /**
         * Wrap the buildKDTree function so that it searches by angle (clientX) in case of shared tooltip,
         * and by two dimensional distance in case of non-shared.
         */
        wrap(seriesProto, 'buildKDTree', function(proceed) {
            if (this.chart.polar) {
                if (this.kdByAngle) {
                    this.searchPoint = this.searchPointByAngle;
                } else {
                    this.kdDimensions = 2;
                }
            }
            proceed.apply(this);
        });

        /**
         * Translate a point's plotX and plotY from the internal angle and radius measures to
         * true plotX, plotY coordinates
         */
        seriesProto.toXY = function(point) {
            var xy,
                chart = this.chart,
                plotX = point.plotX,
                plotY = point.plotY,
                clientX;

            // Save rectangular plotX, plotY for later computation
            point.rectPlotX = plotX;
            point.rectPlotY = plotY;

            // Find the polar plotX and plotY
            xy = this.xAxis.postTranslate(point.plotX, this.yAxis.len - plotY);
            point.plotX = point.polarPlotX = xy.x - chart.plotLeft;
            point.plotY = point.polarPlotY = xy.y - chart.plotTop;

            // If shared tooltip, record the angle in degrees in order to align X points. Otherwise,
            // use a standard k-d tree to get the nearest point in two dimensions.
            if (this.kdByAngle) {
                clientX = ((plotX / Math.PI * 180) + this.xAxis.pane.options.startAngle) % 360;
                if (clientX < 0) { // #2665
                    clientX += 360;
                }
                point.clientX = clientX;
            } else {
                point.clientX = point.plotX;
            }
        };

        if (seriesTypes.spline) {
            /**
             * Overridden method for calculating a spline from one point to the next
             */
            wrap(seriesTypes.spline.prototype, 'getPointSpline', function(proceed, segment, point, i) {

                var ret,
                    smoothing = 1.5, // 1 means control points midway between points, 2 means 1/3 from the point, 3 is 1/4 etc;
                    denom = smoothing + 1,
                    plotX,
                    plotY,
                    lastPoint,
                    nextPoint,
                    lastX,
                    lastY,
                    nextX,
                    nextY,
                    leftContX,
                    leftContY,
                    rightContX,
                    rightContY,
                    distanceLeftControlPoint,
                    distanceRightControlPoint,
                    leftContAngle,
                    rightContAngle,
                    jointAngle;


                if (this.chart.polar) {

                    plotX = point.plotX;
                    plotY = point.plotY;
                    lastPoint = segment[i - 1];
                    nextPoint = segment[i + 1];

                    // Connect ends
                    if (this.connectEnds) {
                        if (!lastPoint) {
                            lastPoint = segment[segment.length - 2]; // not the last but the second last, because the segment is already connected
                        }
                        if (!nextPoint) {
                            nextPoint = segment[1];
                        }
                    }

                    // find control points
                    if (lastPoint && nextPoint) {

                        lastX = lastPoint.plotX;
                        lastY = lastPoint.plotY;
                        nextX = nextPoint.plotX;
                        nextY = nextPoint.plotY;
                        leftContX = (smoothing * plotX + lastX) / denom;
                        leftContY = (smoothing * plotY + lastY) / denom;
                        rightContX = (smoothing * plotX + nextX) / denom;
                        rightContY = (smoothing * plotY + nextY) / denom;
                        distanceLeftControlPoint = Math.sqrt(Math.pow(leftContX - plotX, 2) + Math.pow(leftContY - plotY, 2));
                        distanceRightControlPoint = Math.sqrt(Math.pow(rightContX - plotX, 2) + Math.pow(rightContY - plotY, 2));
                        leftContAngle = Math.atan2(leftContY - plotY, leftContX - plotX);
                        rightContAngle = Math.atan2(rightContY - plotY, rightContX - plotX);
                        jointAngle = (Math.PI / 2) + ((leftContAngle + rightContAngle) / 2);


                        // Ensure the right direction, jointAngle should be in the same quadrant as leftContAngle
                        if (Math.abs(leftContAngle - jointAngle) > Math.PI / 2) {
                            jointAngle -= Math.PI;
                        }

                        // Find the corrected control points for a spline straight through the point
                        leftContX = plotX + Math.cos(jointAngle) * distanceLeftControlPoint;
                        leftContY = plotY + Math.sin(jointAngle) * distanceLeftControlPoint;
                        rightContX = plotX + Math.cos(Math.PI + jointAngle) * distanceRightControlPoint;
                        rightContY = plotY + Math.sin(Math.PI + jointAngle) * distanceRightControlPoint;

                        // Record for drawing in next point
                        point.rightContX = rightContX;
                        point.rightContY = rightContY;

                    }


                    // moveTo or lineTo
                    if (!i) {
                        ret = ['M', plotX, plotY];
                    } else { // curve from last point to this
                        ret = [
                            'C',
                            lastPoint.rightContX || lastPoint.plotX,
                            lastPoint.rightContY || lastPoint.plotY,
                            leftContX || plotX,
                            leftContY || plotY,
                            plotX,
                            plotY
                        ];
                        lastPoint.rightContX = lastPoint.rightContY = null; // reset for updating series later
                    }


                } else {
                    ret = proceed.call(this, segment, point, i);
                }
                return ret;
            });
        }

        /**
         * Extend translate. The plotX and plotY values are computed as if the polar chart were a
         * cartesian plane, where plotX denotes the angle in radians and (yAxis.len - plotY) is the pixel distance from
         * center.
         */
        wrap(seriesProto, 'translate', function(proceed) {
            var chart = this.chart,
                points,
                i;

            // Run uber method
            proceed.call(this);

            // Postprocess plot coordinates
            if (chart.polar) {
                this.kdByAngle = chart.tooltip && chart.tooltip.shared;

                if (!this.preventPostTranslate) {
                    points = this.points;
                    i = points.length;

                    while (i--) {
                        // Translate plotX, plotY from angle and radius to true plot coordinates
                        this.toXY(points[i]);
                    }
                }
            }
        });

        /**
         * Extend getSegmentPath to allow connecting ends across 0 to provide a closed circle in
         * line-like series.
         */
        wrap(seriesProto, 'getGraphPath', function(proceed, points) {
            var series = this,
                i,
                firstValid;

            // Connect the path
            if (this.chart.polar) {
                points = points || this.points;

                // Append first valid point in order to connect the ends
                for (i = 0; i < points.length; i++) {
                    if (!points[i].isNull) {
                        firstValid = i;
                        break;
                    }
                }
                if (this.options.connectEnds !== false && firstValid !== undefined) {
                    this.connectEnds = true; // re-used in splines
                    points.splice(points.length, 0, points[firstValid]);
                }

                // For area charts, pseudo points are added to the graph, now we need to translate these
                each(points, function(point) {
                    if (point.polarPlotY === undefined) {
                        series.toXY(point);
                    }
                });
            }

            // Run uber method
            return proceed.apply(this, [].slice.call(arguments, 1));

        });


        function polarAnimate(proceed, init) {
            var chart = this.chart,
                animation = this.options.animation,
                group = this.group,
                markerGroup = this.markerGroup,
                center = this.xAxis.center,
                plotLeft = chart.plotLeft,
                plotTop = chart.plotTop,
                attribs;

            // Specific animation for polar charts
            if (chart.polar) {

                // Enable animation on polar charts only in SVG. In VML, the scaling is different, plus animation
                // would be so slow it would't matter.
                if (chart.renderer.isSVG) {

                    if (animation === true) {
                        animation = {};
                    }

                    // Initialize the animation
                    if (init) {

                        // Scale down the group and place it in the center
                        attribs = {
                            translateX: center[0] + plotLeft,
                            translateY: center[1] + plotTop,
                            scaleX: 0.001, // #1499
                            scaleY: 0.001
                        };

                        group.attr(attribs);
                        if (markerGroup) {
                            //markerGroup.attrSetters = group.attrSetters;
                            markerGroup.attr(attribs);
                        }

                        // Run the animation
                    } else {
                        attribs = {
                            translateX: plotLeft,
                            translateY: plotTop,
                            scaleX: 1,
                            scaleY: 1
                        };
                        group.animate(attribs, animation);
                        if (markerGroup) {
                            markerGroup.animate(attribs, animation);
                        }

                        // Delete this function to allow it only once
                        this.animate = null;
                    }
                }

                // For non-polar charts, revert to the basic animation
            } else {
                proceed.call(this, init);
            }
        }

        // Define the animate method for regular series
        wrap(seriesProto, 'animate', polarAnimate);


        if (seriesTypes.column) {

            colProto = seriesTypes.column.prototype;

            colProto.polarArc = function(low, high, start, end) {
                var center = this.xAxis.center,
                    len = this.yAxis.len;

                return this.chart.renderer.symbols.arc(
                    center[0],
                    center[1],
                    len - high,
                    null, {
                        start: start,
                        end: end,
                        innerR: len - pick(low, len)
                    }
                );
            };

            /**
             * Define the animate method for columnseries
             */
            wrap(colProto, 'animate', polarAnimate);


            /**
             * Extend the column prototype's translate method
             */
            wrap(colProto, 'translate', function(proceed) {

                var xAxis = this.xAxis,
                    startAngleRad = xAxis.startAngleRad,
                    start,
                    points,
                    point,
                    i;

                this.preventPostTranslate = true;

                // Run uber method
                proceed.call(this);

                // Postprocess plot coordinates
                if (xAxis.isRadial) {
                    points = this.points;
                    i = points.length;
                    while (i--) {
                        point = points[i];
                        start = point.barX + startAngleRad;
                        point.shapeType = 'path';
                        point.shapeArgs = {
                            d: this.polarArc(point.yBottom, point.plotY, start, start + point.pointWidth)
                        };
                        // Provide correct plotX, plotY for tooltip
                        this.toXY(point);
                        point.tooltipPos = [point.plotX, point.plotY];
                        point.ttBelow = point.plotY > xAxis.center[1];
                    }
                }
            });


            /**
             * Align column data labels outside the columns. #1199.
             */
            wrap(colProto, 'alignDataLabel', function(proceed, point, dataLabel, options, alignTo, isNew) {

                if (this.chart.polar) {
                    var angle = point.rectPlotX / Math.PI * 180,
                        align,
                        verticalAlign;

                    // Align nicely outside the perimeter of the columns
                    if (options.align === null) {
                        if (angle > 20 && angle < 160) {
                            align = 'left'; // right hemisphere
                        } else if (angle > 200 && angle < 340) {
                            align = 'right'; // left hemisphere
                        } else {
                            align = 'center'; // top or bottom
                        }
                        options.align = align;
                    }
                    if (options.verticalAlign === null) {
                        if (angle < 45 || angle > 315) {
                            verticalAlign = 'bottom'; // top part
                        } else if (angle > 135 && angle < 225) {
                            verticalAlign = 'top'; // bottom part
                        } else {
                            verticalAlign = 'middle'; // left or right
                        }
                        options.verticalAlign = verticalAlign;
                    }

                    seriesProto.alignDataLabel.call(this, point, dataLabel, options, alignTo, isNew);
                } else {
                    proceed.call(this, point, dataLabel, options, alignTo, isNew);
                }

            });
        }

        /**
         * Extend getCoordinates to prepare for polar axis values
         */
        wrap(pointerProto, 'getCoordinates', function(proceed, e) {
            var chart = this.chart,
                ret = {
                    xAxis: [],
                    yAxis: []
                };

            if (chart.polar) {

                each(chart.axes, function(axis) {
                    var isXAxis = axis.isXAxis,
                        center = axis.center,
                        x = e.chartX - center[0] - chart.plotLeft,
                        y = e.chartY - center[1] - chart.plotTop;

                    ret[isXAxis ? 'xAxis' : 'yAxis'].push({
                        axis: axis,
                        value: axis.translate(
                            isXAxis ?
                            Math.PI - Math.atan2(x, y) : // angle
                            Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)), // distance from center
                            true
                        )
                    });
                });

            } else {
                ret = proceed.call(this, e);
            }

            return ret;
        });

    }(Highcharts));
}));
/* 
 * Author:  Andreas Loeber
 * Plugin:  jquery-clock-timerpicker
 * Version: 2.3.1
 */

 (function($) {
	 
	$.fn.clockTimePicker = function(options, _value) {
		
		/************************************************************************************************
		  DEFAULT SETTINGS (CAN BE OVERRIDDEN WITH THE OPTIONS ARGUMENT)
		************************************************************************************************/
		var settings = $.extend(true, {
			afternoonHoursInOuterCircle: false,
			autosize: false,
			colors: {
				buttonTextColor: '#0797FF',
				clockFaceColor: '#EEEEEE',
				clockInnerCircleTextColor: '#888888',
				clockInnerCircleUnselectableTextColor: '#CCCCCC',
				clockOuterCircleTextColor: '#000000',
				clockOuterCircleUnselectableTextColor: '#CCCCCC',
				hoverCircleColor: '#DDDDDD',
				popupBackgroundColor: '#FFFFFF',
				popupHeaderBackgroundColor: '#0797FF',
				popupHeaderTextColor: '#FFFFFF',				
				selectorColor: '#0797FF',				
				selectorNumberColor: '#FFFFFF',
				signButtonColor: '#FFFFFF',
				signButtonBackgroundColor: '#0797FF'
			},
			duration: false,
			durationNegative: false,
			fonts: {
				fontFamily: 'Arial',
				clockOuterCircleFontSize: 14,
				clockInnerCircleFontSize: 12,
				buttonFontSize: 20
			},
			hideUnselectableNumbers: false,
			i18n: {
				okButton: 'OK',
				cancelButton: 'Cancel'
			},
			maximum: '23:59',
			minimum: '-23:59',
			modeSwitchSpeed: 500,
			onlyShowClockOnMobile: false,
			onAdjust: function(newVal, oldVal) { /*console.log('Value adjusted from ' + oldVal + ' to ' + newVal + '.');*/ },
			onChange: function(newVal, oldVal) { /*console.log('Value changed from ' + oldVal + ' to ' + newVal + '.');*/ },
			onClose: function() { },
			onModeSwitch: function() { },
			onOpen: function() { },
			popupWidthOnDesktop: 200,
			precision: 1,
			required: false,
			separator: ':',
			useAmPm: false, //NOT YET IMPLEMENTED
			useDurationPlusSign: false,
			vibrate: true
		}, typeof options == 'object' ? options : {});
		
		
		/************************************************************************************************
		  DYNAMICALLY INSERT CSS CODE FOR SELECTION ON MOBILE
		 ************************************************************************************************/
		var css = '.clock-timepicker input { caret-color: white; }';
		if (isMobile()) css += ' .clock-timepicker input::selection { background:rgba(255,255,255,0.6); } .clock-timepicker input::-moz-selection { background:rgba(255,255,255,0.6); }';
		function cssAlreadyInitialized() {
			var cssFound = false;
			$('head style').each(function() {
				if ($(this).text() == css) {
					cssFound = true;
					return false;
				}
			});
			if (cssFound) return true;
			else return false;
		}
		if (!cssAlreadyInitialized()) {			
			var style = document.createElement('style');
			style.type = 'text/css';
			if (style.styleSheet) style.styleSheet.cssText = css;
			else style.appendChild(document.createTextNode(css));
			(document.head || document.getElementsByTagName('head')[0]).appendChild(style);
		}
		
		//for each selected element
		return this.each(function() {
			
			var element = $(this);
			
			//Adjust settings by data attributes
			var dataOptions = {}, _data = element.data();
			for (var dataOption in _data) {
				if (settings.hasOwnProperty(dataOption)) {
					settings[dataOption] = _data[dataOption];
				}
			}
			
			//Validate settings
			validateSettings();
			
			//VIBRATION API
			if (!('vibrate' in navigator)) settings.vibrate = false;
			
			if (typeof options == 'string') {
				if (!$(this).parent().hasClass('clock-timepicker')) console.log('%c[jquery-clock-timepicker] Before calling a function, please initialize the ClockTimePicker!', 'color:red');
				else {
					options = options.toLowerCase();
					if (options == 'dispose') disposeTimePicker($(this));
					else if (options == 'value') {
						$(this).val(formatTime(_value));
						var mobileInput = $(this).parent().find('.clock-timepicker-mobile-input');
						if (mobileInput.length > 0) mobileInput.val(formatTime(_value));
						$(this).parent().find('canvas:first').trigger('keydown');
					}
					else console.log('%c[jquery-clock-timepicker] Invalid option passed to clockTimePicker: ' + options, 'color:red');
				}
				return;
			} else {
				if ($(this).parent().hasClass('clock-timepicker')) disposeTimePicker($(this));
			}
			
			
			
			/************************************************************************************************
			  INITIALIZE VARIABLES
			 ************************************************************************************************/
			element.val(formatTime(element.val()));
			if (isMobile()) element.prop('readonly', true);
			var oldValue = element.val();
			var enteredDigits = '';
			var selectionMode = 'HOUR'; //2 modes: 'HOUR' or 'MINUTE'
			var isDragging = false;
			var touchSignButton = false;
			var popupWidth = isMobile() ? $(document).width() - 80 : settings.popupWidthOnDesktop;
			var canvasSize = popupWidth - (isMobile() ? 50 : 20);
			var clockRadius = parseInt(canvasSize / 2);
			var clockCenterX = parseInt(canvasSize / 2);
			var clockCenterY = parseInt(canvasSize / 2);
			var clockOuterRadius = clockRadius - 16;
			var clockInnerRadius = clockOuterRadius - 29;
			
			
			
			/************************************************************************************************
			  INITIALIZE A NEW PARENT ELEMENT THAT ENCAPSULATES THE INPUT FIELD
			 ************************************************************************************************/
			element.wrap('<div class="clock-timepicker" style="display:inline-block; position:relative">');
			
			
			
			/************************************************************************************************
			  TEMPORARY AUTOSIZE ELEMENT
			 ************************************************************************************************/
			var tempAutosizeElement = $('<div class="clock-timepicker-autosize">');
			tempAutosizeElement.css('position', 'absolute')
							   .css('opacity', 0)
							   .css('display', 'none')
							   .css('top', parseInt(element.css('margin-top')) + 'px')
							   .css('left', '0px')
							   .css('font-size', element.css('font-size'))
							   .css('font-family', element.css('font-family'))
							   .css('font-weight', element.css('font-weight'))
							   .css('line-height', element.css('line-height'));
			element.parent().append(tempAutosizeElement);
			element.css('min-width', element.outerWidth());
			autosize();
			
			
			
			/************************************************************************************************
			  INITIALIZE THE DIV TO DARKEN THE WEBSITE WHILE CHOOSING A TIME
			 ************************************************************************************************/
			var background;
			if (isMobile()) {
				background = $('<div class="clock-timepicker-background">');
				background.css('zIndex', 99998)
							.css('display', 'none')
							.css('position', 'fixed')
							.css('top', '0px')
							.css('left', '0px')
							.css('width', '100%')
							.css('height', '100%')
							.css('backgroundColor', 'rgba(0,0,0,0.6)');
				element.parent().append(background);
				
				function onBackgroundTouchMove(event) {
					event.preventDefault();
				}
				background.off('touchmove', onBackgroundTouchMove);
				background.on('touchmove', onBackgroundTouchMove);
				
				function onBackgroundClick(event) {
					event.preventDefault();
					event.stopImmediatePropagation();
					if (selectionMode == 'HOUR') selectHourOnInputElement();
					else selectMinuteOnInputElement();
					return false;
				}
				background.off('click', onBackgroundClick);
				background.on('click', onBackgroundClick);				
			}
			
			
			
			/************************************************************************************************
			  INITIALIZE POPUP
			 ************************************************************************************************/
			var popup = $('<div class="clock-timepicker-popup">');
			popup.css('display', 'none')
				 .css('zIndex', 99999)
				 .css('cursor', 'default')
				 .css('position', 'absolute')
				 .css('width', popupWidth + 'px')
				 .css('backgroundColor', settings.colors.popupBackgroundColor)
				 .css('box-shadow', '0 4px 20px 0px rgba(0, 0, 0, 0.14)')
				 .css('border-radius', '5px')
				 .css('overflow', 'hidden')
				 .css('user-select', 'none');
			popup.on('contextmenu', function() { return false; });
			if (isMobile()) {
				popup.css('position', 'fixed')
					 .css('left', '40px')
					 .css('top', '40px');
				
				window.addEventListener("orientationchange", function() {
					setTimeout(function() {
						adjustMobilePopupDimensionAndPosition();
						repaintClock();
					}, 500);
				});
				
				function onPopupTouchMove(event) {
					event.preventDefault();
				}
				popup.off('touchmove', onPopupTouchMove);
				popup.on('touchmove', onPopupTouchMove);
				
				function onPopupClick(event) {
					event.stopImmediatePropagation();
					if (selectionMode == 'HOUR') selectHourOnInputElement();
					else selectMinuteOnInputElement();
					return false;
				}
				popup.off('click', onPopupClick);
				popup.on('click', onPopupClick);
			}
			element.parent().append(popup);
			
			
			
			/************************************************************************************************
			  DESKTOP VERSION: A CLICK OUTSIDE OF THE POPUP SHOULD CLOSE THE TIME PICKER
			 ************************************************************************************************/
			if (!isMobile()) {
				function onWindowClick(event) {
					if (popup.css('display') != 'none' && !($(event.target)[0] == inputElement[0] || $.contains(inputElement.parent()[0], $(event.target)[0]))) {
						hideTimePicker();
					}
				}
				$(window).off('click', onWindowClick);
				$(window).on('click', onWindowClick);
			}
			
			
			
			/************************************************************************************************
			  INITIALIZE INPUT ELEMENT
			 ************************************************************************************************/			
			var inputElement = element;
			if (isMobile()) {
				inputElement = $('<input class="clock-timepicker-mobile-input" type="text">');
				inputElement.css('display', 'inline-block')
							.css('width', '100%')
							.css('border', '0px')
							.css('border-radius', '0px')
							.css('outline', '0px')
							.css('fontSize', isMobile() ? '40px' : '20px')
							.css('margin', '0px')
							.css('padding', '10px 0px')
							.css('textAlign', 'center')
							.css('color', settings.colors.popupHeaderTextColor)
							.css('backgroundColor', settings.colors.popupHeaderBackgroundColor);
				inputElement.prop('readonly', true);
				popup.append(inputElement);
			}			
			if (element.attr('autocomplete')) element.attr('data-autocomplete-orig', element.attr('autocomplete'));
			element.prop('autocomplete', 'off');
			if (element.attr('autocorrect')) element.attr('data-autocorrect-orig', element.attr('autocorrect'));
			element.prop('autocorrect', 'off');
			if (element.attr('autocapitalize')) element.attr('data-autocapitalize-orig', element.attr('autocapitalize'));
			element.prop('autocapitalize', 'off');
			if (element.attr('spellcheck'))	element.attr('data-spellcheck-orig', element.attr('spellcheck'));
			element.prop('spellcheck', false);
			inputElement.on('drag.clockTimePicker dragend.clockTimePicker dragover.clockTimePicker dragenter.clockTimePicker dragstart.clockTimePicker dragleave.clockTimePicker drop.clockTimePicker selectstart.clockTimePicker contextmenu.clockTimePicker', onInputElementDragSelectContextMenu);
			inputElement.on('mousedown.clockTimePicker', onInputElementMouseDown);
			inputElement.on('keyup.clockTimePicker', onInputElementKeyUp);
			inputElement.on('keydown.clockTimePicker', onInputElementKeyDown);
			element.on('mousewheel.clockTimePicker', onInputElementMouseWheel);
			element.on('focus.clockTimePicker', onInputElementFocus);
			
			
					
			/************************************************************************************************
			  INITIALIZE CLOCK CANVASES
			 ************************************************************************************************/
			var canvasHolder = $('<div>');
			canvasHolder.css('position', 'relative')
						.css('width', canvasSize + 'px')
						.css('height', canvasSize + 'px')
						.css('margin', '10px ' + (isMobile() ? 25 : 10) + 'px');
			popup.append(canvasHolder);
			var clockHourCanvas = $('<canvas class="clock-timepicker-hour-canvas">');
			clockHourCanvas.css('cursor', 'default')
						   .css('position', 'absolute')
						   .css('top', '0px')
						   .css('left', '0px');
			clockHourCanvas.attr('width', canvasSize);
			clockHourCanvas.attr('height', canvasSize);
			registerDraggingEventsOnCanvas(clockHourCanvas);
			canvasHolder.append(clockHourCanvas);
			var clockMinuteCanvas = $('<canvas class="clock-timepicker-minute-canvas">');
			clockMinuteCanvas.css('cursor', 'default')
							 .css('position', 'absolute')
							 .css('top', '0px')
							 .css('left', '0px')
							 .css('display', 'none');
			clockMinuteCanvas.attr('width', canvasSize);
			clockMinuteCanvas.attr('height', canvasSize);
			registerDraggingEventsOnCanvas(clockMinuteCanvas);
			canvasHolder.append(clockMinuteCanvas);
			
			
			
			/************************************************************************************************
			  INITIALIZE BUTTON AREA
			 ************************************************************************************************/
			if (isMobile()) {
				var buttonArea = $('<div>');
				buttonArea.css('text-align', 'right')
						  .css('padding', '15px 30px');
				var buttonHtml = '<a style="text-decoration:none; color:' + settings.colors.buttonTextColor + '; font-family:Arial; font-size:' + settings.fonts.buttonFontSize + 'px; padding-left:30px">';
				var cancelButton = $(buttonHtml);
				cancelButton.html(settings.i18n.cancelButton);
				cancelButton.on('click', function() {
					hideTimePicker();
				});
				buttonArea.append(cancelButton);
				var okButton = $(buttonHtml);
				okButton.html(settings.i18n.okButton);
				okButton.on('click', function() {
					if (isMobile()) element.val(inputElement.val());
					if (settings.vibrate) navigator.vibrate(10);
					hideTimePicker();
				});
				buttonArea.append(okButton);
				popup.append(buttonArea);
			}
			
			
			
			/************************************************************************************************
			  BLUR ALL
			 ************************************************************************************************/
			function blurAll() {
				if (!$(document.activeElement).parents('.clock-timepicker').length) return;
				var tmp = document.createElement("input");
				element.parent().get(0).appendChild(tmp);
				tmp.focus();
				element.parent().get(0).removeChild(tmp);
			}
			
			
			
			/************************************************************************************************
			  REGISTER DRAGGING EVENT LISTENERS ON CANVASES
			 ************************************************************************************************/
			function registerDraggingEventsOnCanvas(canvas) {
				
				//Mouse Drag Events for Desktop Version
				if (!isMobile()) {
					canvas.on('mousedown', function(event) {
						var x = event.pageX - $(this).offset().left;
						var y = event.pageY - $(this).offset().top;
						processTimeSelection(x, y);
						isDragging = true;
					});
					canvas.on('mouseup', function(event) {
						isDragging = false;
						var x = event.pageX - $(this).offset().left;
						var y = event.pageY - $(this).offset().top;
						var selectorLength = Math.sqrt(Math.pow(Math.abs(x - clockCenterX), 2) + Math.pow(Math.abs(y - clockCenterY), 2));
						if (settings.duration && settings.durationNegative && selectorLength <= 20) {
							var oldVal = inputElement.val();
							if (oldVal.match(/^-/)) {
								newVal = oldVal.substring(1);
							} else {
								newVal = '-' + oldVal.replace(/^(-|\+)/, '');
							}
							if (settings.minimum && !isTimeSmallerOrEquals(settings.minimum, newVal)) newVal = formatTime(settings.minimum);
							if (settings.maximum && !isTimeSmallerOrEquals(newVal, settings.maximum)) newVal = formatTime(settings.maximum);
							inputElement.val(formatTime(newVal));
							repaintClock();
							settings.onAdjust.call(element.get(0), newVal.replace(/^\+/, ''), oldVal.replace(/^\+/, ''));
							if (selectionMode == 'HOUR') selectHourOnInputElement();
							else selectMinuteOnInputElement();
							return;
						}
						if (!processTimeSelection(x, y, true)) {
							if (settings.precision == 60) {
								hideTimePicker();
							} else if (selectionMode == 'HOUR') {
								switchToMinuteMode();
								selectMinuteOnInputElement();
							} else {
								hideTimePicker();
							}
							return false;
						}
						if (selectionMode == 'MINUTE' || settings.precision == 60) {
							hideTimePicker();
						}
						else {
							switchToMinuteMode();
							selectMinuteOnInputElement();
						}
					});
					canvas.on('mousemove', function(event) {
						var x = event.pageX - $(this).offset().left;
						var y = event.pageY - $(this).offset().top;
						processTimeSelection(x, y);
					});
					canvas.on('mouseleave', function(event) {
						if (selectionMode == 'HOUR') repaintClockHourCanvas();
						else repaintClockMinuteCanvas();
					});
					
					canvas.on('mousewheel', function(event) {
						processMouseWheelEvent(event);
					});
				}
				
				//Touch Events for Mobile Version
				else {
					canvas.on('touchstart', function(event) {
						event.preventDefault();
						var x = event.originalEvent.touches[0].pageX - $(this).offset().left;
						var y = event.originalEvent.touches[0].pageY - $(this).offset().top;
						var selectorLength = Math.sqrt(Math.pow(Math.abs(x - clockCenterX), 2) + Math.pow(Math.abs(y - clockCenterY), 2));
						if (settings.duration && settings.durationNegative && selectorLength <= 20) {
							touchSignButton = true;
							var oldVal = inputElement.val();
							if (oldVal.match(/^-/)) {
								newVal = oldVal.substring(1);
							} else {
								newVal = '-' + oldVal.replace(/^(-|\+)/, '');
							}
							if (settings.minimum && !isTimeSmallerOrEquals(settings.minimum, newVal)) newVal = formatTime(settings.minimum);
							if (settings.maximum && !isTimeSmallerOrEquals(newVal, settings.maximum)) newVal = formatTime(settings.maximum);
							inputElement.val(formatTime(newVal));
							repaintClock();
							settings.onAdjust.call(element.get(0), newVal.replace(/^\+/, ''), oldVal.replace(/^\+/, ''));
							if (selectionMode == 'HOUR') selectHourOnInputElement();
							else selectMinuteOnInputElement();
							return;
						}
						processTimeSelection(x, y);
						isDragging = true;
					});
					canvas.on('touchend', function(event) {
						event.preventDefault();
						isDragging = false;
						if (!touchSignButton && settings.precision != 60) {
							switchToMinuteMode();
							selectMinuteOnInputElement();
						}
						touchSignButton = false;
					});
					canvas.on('touchmove', function(event) {
						event.preventDefault();
						if (isDragging) {
							var x = event.originalEvent.touches[0].pageX - $(this).offset().left;
							var y = event.originalEvent.touches[0].pageY - $(this).offset().top;
							processTimeSelection(x, y);
						}
					});
				}
				
				canvas.on('keydown', function(event) {
					event.preventDefault();
					processTimeSelection();
					switchToHourMode();
					selectHourOnInputElement();
					oldValue = inputElement.val();
				});
			}
			
			
			
			/************************************************************************************************
			  PROCESSES LEFT OR RIGHT MOUSE CLICK AND SINGLE TAP ON MOBILE PHONES
			 ************************************************************************************************/	
			function processClick(event) {
				var popupVisible = popup.css('display') != 'none';
				if (!inputElement.val()) {
					inputElement.val(formatTime('00:00'));
					switchToHourMode(!popupVisible);
					selectHourOnInputElement();
				}
				else if (settings.precision == 60) {
					switchToHourMode(!popupVisible);
					selectHourOnInputElement();
				}
				else {
					var textDirection = inputElement.css('direction');
					if (!textDirection) textDirection = 'ltr';
					var textAlignment = inputElement.css('text-align');
					if (!textAlignment) textAlignment = 'left';
					var elementWidth = inputElement.innerWidth();
					var elementPaddingLeft = parseFloat(inputElement.css('padding-left'));
					var elementPaddingRight = parseFloat(inputElement.css('padding-right'));
					var elementInnerWidth = elementWidth - elementPaddingLeft - elementPaddingRight;
					tempAutosizeElement.css('display', 'inline-block');
					tempAutosizeElement.html(inputElement.val());
					var textWidth = tempAutosizeElement.innerWidth();
					tempAutosizeElement.html(settings.separator);
					var textCenter = tempAutosizeElement.innerWidth() / 2;
					tempAutosizeElement.html(inputElement.val().replace(new RegExp(settings.separator + '[0-9]+$'), ''));
					textCenter += tempAutosizeElement.innerWidth();
					tempAutosizeElement.css('display', 'none');
					var inputElementCenter = elementWidth / 2;
					if (textAlignment == 'left' || textAlignment == 'justify' || (textDirection == 'ltr' && textAlignment == 'start') || (textDirection == 'rtl' && textAlignment == 'end')) {
						inputElementCenter = Math.floor(elementPaddingLeft + textCenter);
					}
					else if (textAlignment == 'center') {
						inputElementCenter = Math.floor(elementPaddingLeft + ((elementInnerWidth - textWidth) / 2) + textCenter);
					}
					else if (textAlignment == 'right' || (textDirection == 'ltr' && textAlignment == 'end') || (textDirection == 'rtl' && textAlignment == 'start')) {
						inputElementCenter = Math.floor(elementPaddingLeft + elementInnerWidth - (textWidth - textCenter));
					}
					if (event.offsetX >= inputElementCenter - 2) {
						if (selectionMode == 'HOUR' && settings.vibrate) navigator.vibrate(10);
						switchToMinuteMode(!popupVisible);
						selectMinuteOnInputElement();
					} else {
						if (selectionMode == 'MINUTE' && settings.vibrate) navigator.vibrate(10);
						switchToHourMode(!popupVisible);
						selectHourOnInputElement();
					}
				}
				if (!popupVisible) showTimePicker();
			}
			
			
			
			/************************************************************************************************
			  PROCESSES THE MOUSE WHEEL EVENT AND INCREASES OR DECREASES HOURS OR MINUTES
			 ************************************************************************************************/	
			function processMouseWheelEvent(event) {
				var e = window.event || event;
				event.preventDefault();
				var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));				
				(new RegExp('^(-|\\+)?([0-9]+)(.([0-9]{1,2}))?$')).test(inputElement.val());
				var negative = settings.duration && settings.durationNegative && RegExp.$1 == '-' ? true : false;
				var h = parseInt(RegExp.$2);
				if (negative) h = -h;
				var m = RegExp.$4 ? parseInt(RegExp.$4) : 0;
				if (selectionMode == 'HOUR') {
					if (settings.duration && settings.durationNegative && h == 0 && !negative && delta == -1) negative = true;
					else if (settings.duration && settings.durationNegative && h == 0 && negative && delta == 1) negative = false;
					else h += delta;
					if (h == -1) {
						if (!settings.duration) h = 23;
						else if (!settings.durationNegative) h = 0;
					}
					if (h == 24 && !settings.duration) h = 0;
				} else {
					m += (delta * settings.precision);
					if (m < 0) m = 60 + m;
					if (m >= 60) m = m - 60;
				}
				var oldVal = inputElement.val();
				var newVal = (h < 10 && !settings.duration ? '0': '') + (negative && h == 0 ? '-' + h : h) + settings.separator + (m < 10 ? '0' : '') + m;				
				var isMinMaxFullfilled = true;
				if (settings.maximum && !isTimeSmallerOrEquals(newVal, settings.maximum)) isMinMaxFullfilled = false;
				if (settings.minimum && !isTimeSmallerOrEquals(settings.minimum, newVal)) isMinMaxFullfilled = false;
				if (!isMinMaxFullfilled && selectionMode == 'HOUR') {
					if (delta > 0) newVal = formatTime(settings.maximum);
					else newVal = formatTime(settings.minimum);
					isMinMaxFullfilled = true;
				}
				if (isMinMaxFullfilled) {
					inputElement.val(formatTime(newVal));
					autosize();
					repaintClock();
					if (selectionMode == 'HOUR') selectHourOnInputElement();
					else selectMinuteOnInputElement();
					if (newVal != oldVal) settings.onAdjust.call(element.get(0), newVal.replace(/^\+/, ''), oldVal.replace(/^\+/, ''));
				}
			}
			
			
			
			/************************************************************************************************
			  CONVERTS A CLICK / TOUCH IN THE CANVAS TO A TIME AND SETS THE NEW VALUE
			 ************************************************************************************************/	
			function processTimeSelection(x, y, clicked) {
				var selectorAngle = (360 * Math.atan((y - clockCenterY)/(x - clockCenterX)) / (2 * Math.PI)) + 90;
				var selectorLength = Math.sqrt(Math.pow(Math.abs(x - clockCenterX), 2) + Math.pow(Math.abs(y - clockCenterY), 2));				
				var hour = 0;
				var min = 0;
				var negative = false;
				if ((new RegExp('^(-|\\+)?([0-9]+).([0-9]{2})$')).test(inputElement.val())) {
					negative = settings.duration && settings.durationNegative && RegExp.$1 == '-' ? true : false;
					hour = parseInt(RegExp.$2);
					min = parseInt(RegExp.$3);
				}				
				if (selectionMode == 'HOUR') {
					selectorAngle = Math.round(selectorAngle / 30);
					var h = -1;
					if (selectorLength < clockRadius + 10 && selectorLength > clockRadius - 28) {
						if (x - clockCenterX >= 0) {
							if (selectorAngle == 0) h = 12;
							else h = selectorAngle;
						}
						else if (x - clockCenterX < 0) {
							h = selectorAngle + 6;
						}
					} else if (selectorLength < clockRadius - 28 && selectorLength > clockRadius - 65) {
						if (x - clockCenterX >= 0) {
							if (selectorAngle != 0) h = selectorAngle + 12;
							else h = 0;
						}
						else if (x - clockCenterX < 0) {
							h = selectorAngle + 18;
							if (h == 24) h = 0;
						}
					}
					if (settings.afternoonHoursInOuterCircle) {
						h = h + (h >= 12 ? -12 : 12);
					}
					if (h > -1) {
						var newVal = (negative ? '-' : '') +(h < 10 && !settings.duration ? '0' : '') + h + settings.separator + (min < 10 ? '0' : '') + min;						
						if (isDragging || clicked) {
							var isMinMaxFullfilled = true;
							if (settings.maximum && !isTimeSmallerOrEquals(newVal, settings.maximum)) isMinMaxFullfilled = false;
							if (settings.minimum && !isTimeSmallerOrEquals(settings.minimum, newVal)) isMinMaxFullfilled = false;
							if (!isMinMaxFullfilled) {
								if (settings.maximum && isTimeSmallerOrEquals((negative ? '-' : '') +(h < 10 && !settings.duration ? '0' : '') + h + settings.separator + '00', settings.maximum)) {
									newVal = formatTime(settings.maximum);
									isMinMaxFullfilled = true;
								}
								if (settings.minimum && !isTimeSmallerOrEquals(settings.minimum, (negative ? '-' : '') +(h < 10 && !settings.duration ? '0' : '') + h + settings.separator + '00')) {
									newVal = formatTime(settings.minimum);
									isMinMaxFullfilled = true;
								}
							}
							if (isMinMaxFullfilled) {
								var oldVal = inputElement.val();
								if (newVal != oldVal) {
									if (settings.vibrate) navigator.vibrate(10);
									settings.onAdjust.call(element.get(0), newVal.replace(/^\+/, ''), oldVal.replace(/^\+/, ''));
								}
								inputElement.val(formatTime(newVal));
								autosize();
							}
						}
						repaintClockHourCanvas(h == 0 ? 24 : h, settings.duration && settings.durationNegative && selectorLength <= 12);
						return true;
					}
					else {
						repaintClockHourCanvas(null, settings.duration && settings.durationNegative && selectorLength <= 12);
						return false;
					}
				}
				else if (selectionMode == 'MINUTE') {
					selectorAngle = Math.round(selectorAngle / 6);
					var m = -1;
					if (selectorLength < clockRadius + 10 && selectorLength > clockRadius - 40) {
						if (x - clockCenterX >= 0) {
							m = selectorAngle;
						} else if (x - clockCenterX < 0) {
							m = selectorAngle + 30;
							if (m == 60) m = 0;
						}
					}
					if (m > -1) {
						if (settings.precision != 1) {
							var f = Math.floor(m / settings.precision);
							m = f * settings.precision + (Math.round((m - f * settings.precision) / settings.precision) == 1 ? settings.precision : 0);
							if (m >= 60) m = 0;
						}
						var newVal = (negative ? '-' : '') + (hour < 10 && !settings.duration ? '0' : '') + hour + settings.separator + (m < 10 ? '0' : '') + m;
						var isMinMaxFullfilled = true;
						if (settings.maximum && !isTimeSmallerOrEquals(newVal, settings.maximum)) isMinMaxFullfilled = false;
						if (settings.minimum && !isTimeSmallerOrEquals(settings.minimum, newVal)) isMinMaxFullfilled = false;
						if ((isDragging || clicked) && isMinMaxFullfilled) {
							var oldVal = inputElement.val();
							if (newVal != oldVal) {
								if (settings.vibrate) navigator.vibrate(10);
								settings.onAdjust.call(element.get(0), newVal.replace(/^\+/, ''), oldVal.replace(/^\+/, ''));
							}
							inputElement.val(formatTime(newVal));
						}
						repaintClockMinuteCanvas(m == 0 ? 60 : m, settings.duration && settings.durationNegative && selectorLength <= 12);
						return true;
					}
					else {
						repaintClockMinuteCanvas(null, settings.duration && settings.durationNegative && selectorLength <= 12);
						return false;
					}
				}
			}
			
			
			
			/************************************************************************************************
			  REPAINTS THE CORRESPONDING CLOCK CANVAS DEPENDING ON CURRENT SELECTION MODE
			 ************************************************************************************************/
			function repaintClock() {
				if (selectionMode == 'HOUR') {
					repaintClockHourCanvas();
				} else {
					repaintClockMinuteCanvas();
				}
			}
			
			
			
			/************************************************************************************************
			  REPAINTS THE SIGN BUTTON (used by repaintClockHourCanvas and repaintClockMinuteCanvas)
			 ************************************************************************************************/
			function repaintSignButton(ctx, hover) {
				ctx.beginPath();
				ctx.arc(clockCenterX, clockCenterY, 12, 0, 2 * Math.PI, false);
				ctx.fillStyle = settings.colors.signButtonBackgroundColor;
				ctx.fill();
				if (hover) {
					ctx.beginPath();
					ctx.arc(clockCenterX, clockCenterY, 14, 0, 2 * Math.PI, false);
					ctx.strokeStyle = settings.colors.signButtonBackgroundColor;
					ctx.stroke();
				}
				ctx.beginPath();
				ctx.moveTo(clockCenterX - 6, clockCenterY);
				ctx.lineTo(clockCenterX + 6, clockCenterY);
				ctx.lineWidth = 2;
				ctx.strokeStyle = settings.colors.signButtonColor;
				ctx.stroke();
				if (!inputElement.val().match(/^-/)) {
					ctx.beginPath();
					ctx.moveTo(clockCenterX, clockCenterY - 6);
					ctx.lineTo(clockCenterX, clockCenterY + 6);
					ctx.lineWidth = 2;
					ctx.strokeStyle = settings.colors.signButtonColor;
					ctx.stroke();
				}
			}
			
			
			
			/************************************************************************************************
			  REPAINTS THE CLOCK HOUR CANVAS
			 ************************************************************************************************/
			function repaintClockHourCanvas(hoverHour, hoverSign) {
				
				var ctx = clockHourCanvas.get(0).getContext('2d');
				(new RegExp('^(-|\\+)?([0-9]+).([0-9]{1,2})$')).test(inputElement.val());
				var negative = RegExp.$1 == '-' ? true : false;
				var hour = parseInt(RegExp.$2);
				
				ctx.clearRect(0, 0, canvasSize, canvasSize);
				
				if (hour >= 24) {
					popup.css('visibility', 'hidden');
					return;
				} else {
					if (!settings.onlyShowClockOnMobile) popup.css('visibility', 'visible');
				}
				
				if (hour == 0) hour = 24;
				if (!inputElement.val()) hour = -1;
				
				//Paint clock circle				
				ctx.beginPath();
				ctx.arc(clockCenterX, clockCenterY, clockRadius, 0, 2 * Math.PI, false);
				ctx.fillStyle = settings.colors.clockFaceColor;
				ctx.fill();
				
				//Paint hover (if available)
				if (!isMobile() && hoverHour) {
					var isMinMaxFullfilled = true;
					if (settings.maximum && !isTimeSmallerOrEquals((negative ? '-' : '') + (hoverHour == 24 ? '00' : hoverHour) + ':00', settings.maximum)) isMinMaxFullfilled = false;
					if (settings.minimum && !isTimeSmallerOrEquals(settings.minimum, (negative ? '-' : '') + (hoverHour == 24 ? '00' : hoverHour) + ':00', true)) isMinMaxFullfilled = false;
					if (isMinMaxFullfilled) {
						ctx.beginPath();
						ctx.arc(clockCenterX + Math.cos(Math.PI / 6 * ((hoverHour % 12) - 3)) * (hoverHour > 12 ? (settings.afternoonHoursInOuterCircle ? clockOuterRadius : clockInnerRadius) : (settings.afternoonHoursInOuterCircle ? clockInnerRadius : clockOuterRadius)),
								clockCenterY + Math.sin(Math.PI / 6 * ((hoverHour % 12) - 3)) * (hoverHour > 12 ? (settings.afternoonHoursInOuterCircle ? clockOuterRadius : clockInnerRadius) : (settings.afternoonHoursInOuterCircle ? clockInnerRadius : clockOuterRadius)),
								15, 0, 2 * Math.PI, false);
						ctx.fillStyle = settings.colors.hoverCircleColor;
						ctx.fill();
					}
				}
				
				//Paint hour selector
				ctx.beginPath();
				ctx.arc(clockCenterX, clockCenterY, 3, 0, 2 * Math.PI, false);
				ctx.fillStyle = settings.colors.selectorColor;
				ctx.fill();
				if (hour > -1 && (!settings.maximum || hour == 24 || isTimeSmallerOrEquals(hour, settings.maximum))) {
					ctx.beginPath();
					ctx.moveTo(clockCenterX, clockCenterY);
					ctx.lineTo(clockCenterX + Math.cos(Math.PI / 6 * ((hour % 12) - 3)) * (hour > 12 ? (settings.afternoonHoursInOuterCircle ? clockOuterRadius : clockInnerRadius) : (settings.afternoonHoursInOuterCircle ? clockInnerRadius : clockOuterRadius)),
							   clockCenterY + Math.sin(Math.PI / 6 * ((hour % 12) - 3)) * (hour > 12 ? (settings.afternoonHoursInOuterCircle ? clockOuterRadius : clockInnerRadius) : (settings.afternoonHoursInOuterCircle ? clockInnerRadius : clockOuterRadius)));
					ctx.lineWidth = 1;
					ctx.strokeStyle = settings.colors.selectorColor;
					ctx.stroke();
					ctx.beginPath();
					ctx.arc(clockCenterX + Math.cos(Math.PI / 6 * ((hour % 12) - 3)) * (hour > 12 ? (settings.afternoonHoursInOuterCircle ? clockOuterRadius : clockInnerRadius) : (settings.afternoonHoursInOuterCircle ? clockInnerRadius : clockOuterRadius)),
							clockCenterY + Math.sin(Math.PI / 6 * ((hour % 12) - 3)) * (hour > 12 ? (settings.afternoonHoursInOuterCircle ? clockOuterRadius : clockInnerRadius) : (settings.afternoonHoursInOuterCircle ? clockInnerRadius : clockOuterRadius)),
							15, 0, 2 * Math.PI, false);
					ctx.fillStyle = settings.colors.selectorColor;
					ctx.fill();
				}
				
				//Paint hour numbers in outer circle
				ctx.font = settings.fonts.clockOuterCircleFontSize + 'px ' + settings.fonts.fontFamily;
				for(i = 1; i <= 12; i++) {
					var angle = Math.PI / 6 * (i - 3);
					var s = i;
					if (settings.afternoonHoursInOuterCircle) {
						s = i + 12;
						if (hour == i + 12) ctx.fillStyle = settings.colors.selectorNumberColor;
						else ctx.fillStyle = settings.colors.clockInnerCircleTextColor;
						if (s == 24) s = '00';
					} else {
						if (hour == i) ctx.fillStyle = settings.colors.selectorNumberColor;
						else ctx.fillStyle = settings.colors.clockOuterCircleTextColor;
					}					
					if ((!settings.maximum || isTimeSmallerOrEquals((negative ? '-' : '') + s + ':00', settings.maximum)) &&
						(!settings.minimum || isTimeSmallerOrEquals(settings.minimum, (negative ? '-' : '') + s + ':00', true))) {
						ctx.fillText(s,
							clockCenterX + Math.cos(angle) * clockOuterRadius - (ctx.measureText(s).width / 2),
							clockCenterY + Math.sin(angle) * clockOuterRadius + (settings.fonts.clockOuterCircleFontSize / 3));
					}
					else if (!settings.hideUnselectableNumbers) {
						ctx.fillStyle = settings.colors.clockOuterCircleUnselectableTextColor;
						ctx.fillText(s,
							clockCenterX + Math.cos(angle) * clockOuterRadius - (ctx.measureText(s).width / 2),
							clockCenterY + Math.sin(angle) * clockOuterRadius + (settings.fonts.clockOuterCircleFontSize / 3));
					}
				}
				
				//Paint hour numbers in inner circle
				ctx.font = settings.fonts.clockInnerCircleFontSize + 'px ' + settings.fonts.fontFamily;
				for(i = 1; i <= 12; i++) {
					var angle = Math.PI / 6 * (i - 3);
					var s = i;
					if (!settings.afternoonHoursInOuterCircle) {
						s = i + 12;
						if (hour == i + 12) ctx.fillStyle = settings.colors.selectorNumberColor;
						else ctx.fillStyle = settings.colors.clockInnerCircleTextColor;
						if (s == 24) s = '00';
					} else {
						if (hour == i) ctx.fillStyle = settings.colors.selectorNumberColor;
						else ctx.fillStyle = settings.colors.clockOuterCircleTextColor;
					}					
					if ((!settings.maximum || isTimeSmallerOrEquals((negative ? '-' : '') + s + ':00', settings.maximum)) &&
						(!settings.minimum || isTimeSmallerOrEquals(settings.minimum, (negative ? '-' : '') + s + ':00', true))) {
						ctx.fillText(s,
							clockCenterX + Math.cos(angle) * clockInnerRadius - (ctx.measureText(s).width / 2),
							clockCenterY + Math.sin(angle) * clockInnerRadius + (settings.fonts.clockInnerCircleFontSize / 3));
					}
					else if (!settings.hideUnselectableNumbers) {
						ctx.fillStyle = settings.colors.clockInnerCircleUnselectableTextColor;
						ctx.fillText(s,
							clockCenterX + Math.cos(angle) * clockInnerRadius - (ctx.measureText(s).width / 2),
							clockCenterY + Math.sin(angle) * clockInnerRadius + (settings.fonts.clockInnerCircleFontSize / 3));
					}
				}
				
				if (settings.duration && settings.durationNegative) repaintSignButton(ctx, hoverSign);
			}
			
			
			
			/************************************************************************************************
			  REPAINTS THE CLOCK MINUTE CANVAS
			 ************************************************************************************************/
			function repaintClockMinuteCanvas(hoverMinute, hoverSign) {
				
				var ctx = clockMinuteCanvas.get(0).getContext('2d');				
				(new RegExp('^(-|\\+)?([0-9]+).([0-9]{1,2})$')).test(inputElement.val());
				var negative = RegExp.$1 == '-' ? true : false;
				var hour = parseInt(RegExp.$2);
				var min = parseInt(RegExp.$3);
				if (!inputElement.val()) min = -1;
				
				if (!settings.onlyShowClockOnMobile) popup.css('visibility', 'visible');
				
				//Paint clock circle				
				ctx.clearRect(0, 0, canvasSize, canvasSize);
				ctx.beginPath();
				ctx.arc(clockCenterX, clockCenterY, clockRadius, 0, 2 * Math.PI, false);
				ctx.fillStyle = settings.colors.clockFaceColor;
				ctx.fill();
				
				//Paint hover (if available)
				if (!isMobile() && hoverMinute) {
					if (hoverMinute == 60) hoverMinute = 0;
					var isMinMaxFullfilled = true;
					if (settings.maximum && !isTimeSmallerOrEquals((negative ? '-' : '') + hour + ':' + (hoverMinute < 10 ? '0' : '') + hoverMinute, settings.maximum)) isMinMaxFullfilled = false;
					if (settings.minimum && !isTimeSmallerOrEquals(settings.minimum, (negative ? '-' : '') + hour + ':' + (hoverMinute < 10 ? '0' : '') + hoverMinute)) isMinMaxFullfilled = false;
					if (isMinMaxFullfilled) {
						ctx.beginPath();
						ctx.arc(clockCenterX + Math.cos(Math.PI / 6 * ((hoverMinute / 5) - 3)) * clockOuterRadius,
								clockCenterY + Math.sin(Math.PI / 6 * ((hoverMinute / 5) - 3)) * clockOuterRadius,
								15, 0, 2 * Math.PI, false);
						ctx.fillStyle = settings.colors.hoverCircleColor;
						ctx.fill();
					}
				}
				
				//Paint minute selector
				ctx.beginPath();
				ctx.arc(clockCenterX, clockCenterY, 3, 0, 2 * Math.PI, false);
				ctx.fillStyle = settings.colors.selectorColor;
				ctx.fill();
				if (min > -1 && (!settings.maximum || isTimeSmallerOrEquals(hour + ':' + min, settings.maximum)) && (!settings.minimum || isTimeSmallerOrEquals(settings.minimum, hour + ':' + min))) {
					ctx.beginPath();
					ctx.moveTo(clockCenterX, clockCenterY);
					ctx.lineTo(clockCenterX + Math.cos(Math.PI / 6 * ((min / 5) - 3)) * clockOuterRadius,
							   clockCenterY + Math.sin(Math.PI / 6 * ((min / 5) - 3)) * clockOuterRadius);
					ctx.lineWidth = 1;
					ctx.strokeStyle = settings.colors.selectorColor;
					ctx.stroke();
					ctx.beginPath();
					ctx.arc(clockCenterX + Math.cos(Math.PI / 6 * ((min / 5) - 3)) * clockOuterRadius,
							clockCenterY + Math.sin(Math.PI / 6 * ((min / 5) - 3)) * clockOuterRadius,
							15, 0, 2 * Math.PI, false);
					ctx.fillStyle = settings.colors.selectorColor;
					ctx.fill();
				}
				
				//Paint minute numbers 00 - 55
				ctx.font = settings.fonts.clockOuterCircleFontSize + 'px ' + settings.fonts.fontFamily;
				for(i = 1; i <= 12; i++) {
					if (Math.floor(i * 5 / settings.precision) != i * 5 / settings.precision) continue;
					var angle = Math.PI / 6 * (i - 3);
					if (min == i * 5 || (min == 0 && i == 12)) ctx.fillStyle = settings.colors.selectorNumberColor;
					else ctx.fillStyle = settings.colors.clockOuterCircleTextColor;
					var s = i * 5 == 5 ? '05' : i * 5;
					if (s == 60) s = '00';
					var isMinMaxFullfilled = true;
					if (settings.maximum && !isTimeSmallerOrEquals((negative ? '-' : '') + hour + ':' + s, settings.maximum)) isMinMaxFullfilled = false;
					if (settings.minimum && !isTimeSmallerOrEquals(settings.minimum, (negative ? '-' : '') + hour + ':' + s)) isMinMaxFullfilled = false;
					if (isMinMaxFullfilled) {
						ctx.fillText(s,
							clockCenterX + Math.cos(angle) * clockOuterRadius - (ctx.measureText(s).width / 2),
							clockCenterY + Math.sin(angle) * clockOuterRadius + (settings.fonts.clockOuterCircleFontSize / 3));
					}
					else if (!settings.hideUnselectableNumbers) {
						ctx.fillStyle = settings.colors.clockOuterCircleUnselectableTextColor;
						ctx.fillText(s,
							clockCenterX + Math.cos(angle) * clockOuterRadius - (ctx.measureText(s).width / 2),
							clockCenterY + Math.sin(angle) * clockOuterRadius + (settings.fonts.clockOuterCircleFontSize / 3));
					}
				}
				
				//For numbers not dividable by 5 paint a little white dot in the selector circle
				if (min > -1 && min % 5 != 0) {
					ctx.beginPath();
					ctx.arc(clockCenterX + Math.cos(Math.PI / 6 * ((min / 5) - 3)) * clockOuterRadius,
							clockCenterY + Math.sin(Math.PI / 6 * ((min / 5) - 3)) * clockOuterRadius,
							2, 0, 2 * Math.PI, false);
					ctx.fillStyle = 'white';
					ctx.fill();
				}
				
				if (settings.duration && settings.durationNegative) repaintSignButton(ctx, hoverSign);
			}
			
			
			/************************************************************************************************
			  ADJUST POPUP DIMENSION AND POSITION (FOR MOBILE PHONES)
			 ************************************************************************************************/	
			function adjustMobilePopupDimensionAndPosition() {

				var popupHeight;
				
				//Landscape mode
				if (window.innerHeight < 400) {
					popupWidth = window.innerHeight - 60;					
					popup.css('width', popupWidth + 200 + 'px');
					inputElement.css('position', 'absolute')
								.css('left', '0px')
								.css('top', '0px')
								.css('width', '200px')
								.css('height', popupWidth + 20 + 'px');
					canvasHolder.css('margin', '10px 25px 0px 230px');
					popupHeight = popupWidth + parseInt(canvasHolder.css('margin-top')) + parseInt(canvasHolder.css('margin-bottom'));
				}
				//Normal mode (enough space for normal popup)
				else {
					popupWidth = window.innerWidth - 80;
					if (popupWidth > 300) popupWidth = 300;
					popup.css('width', popupWidth + 'px');
					inputElement.css('position', 'static')
								.css('width', '100%')
								.css('height', 'auto');
					canvasHolder.css('margin', '10px 25px 10px 25px');
					popupHeight = popupWidth + parseInt(canvasHolder.css('margin-top')) + parseInt(canvasHolder.css('margin-bottom')) + 65;
				}
				
				//Align popup in the middle of the screen				
				popup.css('left', parseInt(($('body').prop('clientWidth') - popup.outerWidth()) / 2) + 'px');
				popup.css('top', parseInt((window.innerHeight - popupHeight) / 2) + 'px');				
				
				canvasSize = popupWidth - 50;
				clockRadius = parseInt(canvasSize / 2);
				clockCenterX = parseInt(canvasSize / 2);
				clockCenterY = parseInt(canvasSize / 2);
				clockOuterRadius = clockRadius - 16;
				clockInnerRadius = clockOuterRadius - 29;
				canvasHolder.css('width', canvasSize + 'px');
				canvasHolder.css('height', canvasSize + 'px');
				clockHourCanvas.attr('width', canvasSize);
				clockHourCanvas.attr('height', canvasSize);
				clockMinuteCanvas.attr('width', canvasSize);
				clockMinuteCanvas.attr('height', canvasSize);				
			}
			
			
			/************************************************************************************************
			  SHOWS THE TIME PICKER
			 ************************************************************************************************/	
			function showTimePicker() {
				if (!element.val()) inputElement.val(formatTime('00:00'));
				else inputElement.val(formatTime(element.val()));
				if (!isMobile() && settings.onlyShowClockOnMobile) popup.css('visibility', 'hidden');
				if (isMobile()) adjustMobilePopupDimensionAndPosition();
				popup.css('display', 'block');
				repaintClock();
				if (isMobile()) {
					background.stop().css('opacity', 0).css('display', 'block').animate({opacity: 1}, 300);
				} else {
					//Adjust popup's position horizontally
					if (popup.outerWidth() > element.outerWidth()) {
						var moveToLeft = parseInt((popup.outerWidth() - element.outerWidth()) / 2);
						if (moveToLeft < element.offset().left) {
							popup.css('left', -moveToLeft + 'px');
						}
					}
					//Adjust popup's position vertically
					var freeTopSpace = element.offset().top - $(window).scrollTop();
					var freeBottomSpace = window.innerHeight - freeTopSpace - element.outerHeight();
					if (freeBottomSpace < popup.outerHeight() && element.offset().top > popup.outerHeight()) {
						if (freeTopSpace < popup.outerHeight()) {
							if (freeTopSpace > freeBottomSpace + element.outerHeight()) {
								popup.css('top', -popup.outerHeight() + parseInt(element.css('marginTop')) + 'px');
							} else {
								popup.css('top', parseInt(element.css('marginTop')) + element.outerHeight() + 'px');
							}
						} else {
							popup.css('top', -popup.outerHeight() + parseInt(element.css('marginTop')) + 'px');
						}
					} else {
						popup.css('top', parseInt(element.css('marginTop')) + element.outerHeight() + 'px');
					}
				}
				settings.onOpen.call(element.get(0));
			}
			
			
			
			/************************************************************************************************
			  HIDES THE TIME PICKER
			 ************************************************************************************************/
			function hideTimePicker() {				
				var newValue = formatTime(element.val());
				enteredDigits = '';
				popup.css('display', 'none');
				if (isMobile()) {
					background.stop().animate({opacity: 0}, 300, function() { background.css('display', 'none'); });
				} else {
					element.val(newValue);
				}
				blurAll();
				if (!oldValue && newValue.match(new RegExp('^0+' + settings.separator + '00$'))) {
					inputElement.val('');
				}
				else if (oldValue != newValue) {
					if ('createEvent' in document) {
						var evt = document.createEvent('HTMLEvents');
						evt.initEvent('change', true, false);
						element.get(0).dispatchEvent(evt);
					}
					else {
						var evt = document.createEventObject();
						evt.eventType = 'click';
						element.get(0).fireEvent('onchange', evt);
					}
					settings.onChange.call(element.get(0), newValue.replace(/^\+/, ''), oldValue.replace(/^\+/, ''));
					oldValue = newValue;
				}
				settings.onClose.call(element.get(0));
			}
			
			
			
			/************************************************************************************************
			  SWITCH FROM MINUTE SELECTION MODE TO HOUR SELECTION MODE
			 ************************************************************************************************/
			function switchToHourMode(surpressAnimation) {
				if (selectionMode == 'HOUR') return;
				enteredDigits = '';
				repaintClockHourCanvas();
				if (surpressAnimation) {
					clockMinuteCanvas.css('display', 'none');
				}
				else {
					clockMinuteCanvas.css('zIndex', 2).stop().animate({opacity: 0, zoom:'80%', left:'10%', top:'10%'}, settings.modeSwitchSpeed, function() {
						clockMinuteCanvas.css('display', 'none');
					});
				}
				clockHourCanvas.stop().css('zoom', '100%')
									  .css('left', '0px')
									  .css('top', '0px')
									  .css('display', 'block')
									  .css('opacity', 1)
									  .css('zIndex', 1);
				selectionMode = 'HOUR';
				settings.onModeSwitch.call(element.get(0), selectionMode);
			}
			
			
			
			/************************************************************************************************
			  SWITCH FROM HOUR SELECTION MODE TO MINUTE SELECTION MODE
			 ************************************************************************************************/
			function switchToMinuteMode(surpressAnimation) {
				if (selectionMode == 'MINUTE') return;
				enteredDigits = '';
				repaintClockMinuteCanvas();
				clockMinuteCanvas.stop().css('display', 'block')
										.css('zoom', '80%')
										.css('left', '10%')
										.css('top', '10%')										
										.css('opacity', 0)
										.css('zIndex', 1);
				if (surpressAnimation) {
					clockMinuteCanvas.css('opacity', 1)
									 .css('zoom', '100%')
									 .css('left', '0px')
									 .css('top', '0px');
				}
				else {
					clockMinuteCanvas.animate({opacity: 1, zoom:'100%', left:'0px', top:'0px'});
				}
				selectionMode = 'MINUTE';
				settings.onModeSwitch.call(element.get(0), selectionMode);
			}
			
			
			
			/************************************************************************************************
			  SELECT HOUR ON INPUT ELEMENT
			 ************************************************************************************************/
			function selectHourOnInputElement() {
				inputElement.focus();
				setTimeout(function() {
					inputElement.get(0).setSelectionRange(0, inputElement.val().indexOf(settings.separator));
				}, 1);
			}
			

			
			/************************************************************************************************
			  SELECT MINUTE ON INPUT ELEMENT
			 ************************************************************************************************/
			function selectMinuteOnInputElement() {
				inputElement.focus();
				setTimeout(function() {						
					inputElement.get(0).setSelectionRange(inputElement.val().indexOf(settings.separator) + 1, inputElement.val().length);
				}, 1);
			}
			
			
			
			/************************************************************************************************
			  AUTOSIZE INPUT ELEMENT
			 ************************************************************************************************/
			function autosize() {
				if (!settings.autosize || isMobile()) return;
				tempAutosizeElement.html(element.val());
				tempAutosizeElement.css('display', 'inline-block');				
				element.css('width', tempAutosizeElement.outerWidth() + 5 + parseInt(element.css('padding-left')) + parseInt(element.css('padding-right')) + 'px');
				tempAutosizeElement.css('display', 'none');
			}
			
			
			
			/************************************************************************************************
			  FORMATS THE TIME
			 ************************************************************************************************/	
			function formatTime(time) {
				if (time == '') {
					if (settings.required) return settings.duration ? '0:00' : '00:00';
					else return time;
				}
				if ((new RegExp('^(-|\\+)?([0-9]+)(.([0-9]{1,2})?)?$', 'i')).test(time)) {
					var hour = parseInt(RegExp.$2);
					var min = parseInt(RegExp.$4);
					if (!min) min = 0;
					var negative = settings.duration && settings.durationNegative && RegExp.$1 == '-' ? true : false;
					if (hour >= 24 && !settings.duration) hour = hour % 24;
					if (min >= 60) min = min % 60;
					if (settings.precision != 1) {
						var f = Math.floor(min / settings.precision);
						min = f * settings.precision + (Math.round((min - f * settings.precision) / settings.precision) == 1 ? settings.precision : 0);
						if (min >= 60) min = 0;
					}
					time = (negative ? '-' : '') + (hour < 10 && !settings.duration ? '0' : '') + hour + settings.separator + (RegExp.$3 ? (min < 10 ? '0' : '') + min : '00');
				}
				else if ((new RegExp('^(-|\\+)?.([0-9]{1,2})')).test(time)) {
					var min = parseInt(RegExp.$2);
					var negative = settings.duration && settings.durationNegative && RegExp.$1 == '-' ? true : false;
					if (min >= 60) min = min % 60;
					time = (negative && min > 0 ? '-' : '') + '0' + (!settings.duration ? '0' : '') + settings.separator + (min < 10 ? '0' : '') + min;
				}
				else {
					time = '0' + (!settings.duration ? '0' : '') + settings.separator + '00';
				}
				return (settings.duration && settings.useDurationPlusSign && !time.match(/^\-/) && !time.match(/^0+:00$/) ? '+' : '') + time;
			}
			
			
			
			/************************************************************************************************
			  DISPOSES AN INITIALIZED CLOCK TIME PICKER
			 ************************************************************************************************/
			function disposeTimePicker(element) {
				element.parent().find('.clock-timepicker-autosize').remove();
				element.parent().find('.clock-timepicker-background').remove();
				element.parent().find('.clock-timepicker-popup').remove();
				element.unwrap();
				element.off('drag.clockTimePicker dragend.clockTimePicker dragover.clockTimePicker dragenter.clockTimePicker dragstart.clockTimePicker dragleave.clockTimePicker drop.clockTimePicker selectstart.clockTimePicker contextmenu.clockTimePicker');
				element.off('mousedown.clockTimePicker');
				element.off('keyup.clockTimePicker');
				element.off('keydown.clockTimePicker');
				element.off('mousewheel.clockTimePicker');
				element.off('focus.clockTimePicker');				
				if (element.attr('data-autocomplete-orig')) {
					element.attr('autocomplete', element.attr('data-autocomplete-orig'));
					element.removeAttr('data-autocomplete-orig');
				} else element.removeAttr('autocomplete');
				if (element.attr('data-autocorrect-orig')) {
					element.attr('autocorrect', element.attr('data-autocorrect-orig'));
					element.removeAttr('data-autocorrect-orig');
				} else element.removeAttr('autocorrect');
				if (element.attr('data-autocapitalize-orig')) {
					element.attr('autocapitalize', element.attr('data-autocapitalize-orig'));
					element.removeAttr('data-autocapitalize-orig');
				} else element.removeAttr('autocapitalize');
				if (element.attr('data-spellcheck-orig')) {
					element.attr('spellcheck', element.attr('data-spellcheck-orig'));
					element.removeAttr('data-spellcheck-orig');
				} else element.removeAttr('spellcheck');
			}	
			
			
			
			/************************************************************************************************
			  ELEMENT EVENTS
			 ************************************************************************************************/
			function onInputElementMouseWheel(event) {
				if (element.is(":focus")) processMouseWheelEvent(event);
			}
			
			
			function onInputElementFocus(event) {
				if (isMobile()) {
					showTimePicker();
					switchToHourMode(true);
					selectHourOnInputElement();
				} else {
					setTimeout(function() {
						if (popup.css('display') == 'none') onInputElementMouseDown(event);
					}, 50);
				}
			}
			
			
			function onInputElementDragSelectContextMenu(event) {
				event.stopImmediatePropagation();
				event.preventDefault();
				return false;
			}
			
			
			function onInputElementMouseDown(event) {
				processClick(event);
				event.stopImmediatePropagation();
				event.stopPropagation();
				event.preventDefault();
				return false;
			}
			
			
			function onInputElementKeyDown(event) {
				//TABULATOR
				if (event.keyCode == 9) {
					hideTimePicker();
				}
				//ENTER
				else if (event.keyCode == 13) {
					hideTimePicker();
				}
				//ESC
				else if (event.keyCode == 27) {
					inputElement.val(formatTime(oldValue));
					hideTimePicker();
				}
				//BACKSPACE OR DELETE
				else if (event.keyCode == 8 || event.keyCode == 46) {
					enteredDigits = '';
					if (!inputElement.val()) return false;
					var oldVal = inputElement.val();
					var newVal;
					event.preventDefault();
					(new RegExp('^(-|\\+)?([0-9]+)(.([0-9]{1,2}))?$')).test(inputElement.val());
					var negative = settings.duration && settings.durationNegative && RegExp.$1 == '-' ? true : false;
					var h = parseInt(RegExp.$2);
					var m = RegExp.$4 ? parseInt(RegExp.$4) : 0;
					if (selectionMode == 'HOUR') {
						if (h == 0) {
							newVal = settings.required ? (!settings.duration ? '0' : '') +'0' + settings.separator + '00' : '';							
						} else {
							newVal = (!settings.duration ? '0' : '') + '0' + settings.separator + (m < 10 ? '0' : '') + m;
						}
						inputElement.val(formatTime(newVal));
						if (!newVal) {
							hideTimePicker();
						} else {
							selectHourOnInputElement();
						}
						if (oldVal != newVal) settings.onAdjust.call(element.get(0), newVal.replace(/^\+/, ''), oldVal.replace(/^\+/, ''));
					} else {
						if (m == 0) {
							if (h == 0 && !settings.required) {
								inputElement.val('');
								if (oldVal != '') settings.onAdjust.call(element.get(0), '', oldVal.replace(/^\+/, ''));
								hideTimePicker();
							} else {
								switchToHourMode();
								selectHourOnInputElement();
							}
						} else {
							newVal = (negative ? '-' : '') + (h < 10 && !settings.duration ? '0' : '') + h + settings.separator + '00';
							inputElement.val(formatTime(newVal));
							selectMinuteOnInputElement();
							if (oldVal != newVal) settings.onAdjust.call(element.get(0), newVal.replace(/^\+/, ''), oldVal.replace(/^\+/, ''));
						}
					}
					autosize();
				}
				//ARROW LEFT OR HOME
				else if ((event.keyCode == 36 || event.keyCode == 37) && inputElement.val() != '') {
					inputElement.val(formatTime(inputElement.val()));
					if (selectionMode != 'HOUR') {
						selectHourOnInputElement();
						switchToHourMode();
					} else {
						event.preventDefault();
						event.stopPropagation();
					}
				}
				//ARROW RIGHT OR END
				else if ((event.keyCode == 35 || event.keyCode == 39) && inputElement.val() != '') {
					inputElement.val(formatTime(inputElement.val()));
					if (settings.precision != 60 && selectionMode != 'MINUTE') {
						selectMinuteOnInputElement();
						switchToMinuteMode();
					} else {
						event.preventDefault();
						event.stopPropagation();
					}
				}
				//COLON OR DOT
				else if (event.keyCode == 190 || event.key == settings.separator) {
					event.preventDefault();
					if (inputElement.val().length == 0) inputElement.val('0');
					inputElement.val(formatTime(inputElement.val()));
					if (settings.precision != 60) {
						selectMinuteOnInputElement();
						if (selectionMode != 'MINUTE') switchToMinuteMode();
					} else {
						selectHourOnInputElement();
					}
				}
				//ARROW UP OR DOWN, + OR -
				else if (event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 107 || event.keyCode == 109 || event.keyCode == 189 || (event.shiftKey && event.keyCode == 49)) {
					event.preventDefault();
					if (oldValue == '') return;
					var oldVal = inputElement.val();
					(new RegExp('^(-|\\+)?([0-9]+)(.([0-9]{1,2}))?$')).test(inputElement.val());
					var negative = settings.duration && settings.durationNegative && RegExp.$1 == '-' ? true : false;
					var h = parseInt(RegExp.$2);
					if (negative) h = -h;
					var m = RegExp.$4 ? parseInt(RegExp.$4) : 0;
					if (settings.duration && settings.durationNegative && (event.keyCode == 107 || event.keyCode == 109 || event.keyCode == 189 || (event.shiftKey && event.keyCode == 49))) {
						if (event.keyCode == 107 || event.keyCode == 49) {
							if (h < 0) h = -h;
							negative = false;
						}
						else {							
							if (h > 0) h = -h;
							negative = true;
						}
						enteredDigits = '';
					}
					else if (selectionMode == 'HOUR') {
						if (event.keyCode == 38 || event.keyCode == 107 || event.keyCode == 49) {
							if (settings.duration && settings.durationNegative && h == 0 && negative) negative = false;
							else h += 1;
						}
						else {							
							if (settings.duration && settings.durationNegative && h == 0 && !negative) negative = true;
							else h -= 1;
						}
						if (h == -1) {
							if (!settings.duration) h = 23;
							else if (!settings.durationNegative) h = 0;
						}
						if (h == 24 && !settings.duration) h = 0;
					}
					else {
						if (event.keyCode == 38 || event.keyCode == 109 || event.keyCode == 189) m -= settings.precision;
						else m += settings.precision;
						if (m < 0) m = 60 + m;
						if (m >= 60) m = m - 60;
					}
					var newVal = (h < 10 && !settings.duration ? '0': '') + (negative && h == 0 ? '-' + h : h) + settings.separator + (m < 10 ? '0' : '') + m;
					var isMinMaxFullfilled = true;
					if (settings.maximum && !isTimeSmallerOrEquals(newVal, settings.maximum)) isMinMaxFullfilled = false;
					if (settings.minimum && !isTimeSmallerOrEquals(settings.minimum, newVal)) isMinMaxFullfilled = false;
					if (!isMinMaxFullfilled && selectionMode == 'HOUR') {
						if (event.keyCode == 38) newVal = formatTime(settings.maximum);
						else newVal = formatTime(settings.minimum);
						isMinMaxFullfilled = true;
					}
					if (isMinMaxFullfilled) {
						inputElement.val(formatTime(newVal));
						if (newVal != oldVal) settings.onAdjust.call(element.get(0), newVal.replace(/^\+/, ''), oldVal.replace(/^\+/, ''));
						autosize();
						repaintClock();
						if (selectionMode == 'HOUR') selectHourOnInputElement();
						else selectMinuteOnInputElement();
					}
				}
				else {
					event.preventDefault();
					event.stopPropagation();
					event.stopImmediatePropagation();
					return false;
				}
			}
			
			
			function onInputElementKeyUp(event) {
				//on entering digits...
				if (((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) && !event.shiftKey && !event.ctrlKey && !event.altKey) {
					var hourPart = inputElement.val().replace(/.[0-9]+$/, '');
					var minPart = inputElement.val().replace(/^(\+|-)?[0-9]+./, '');
					var isNegative = inputElement.val()[0] == '-';
					var oldVal = inputElement.val();
					var newVal;
					
					//entering first digit...
					if (enteredDigits == '') {
						enteredDigits = event.key;
						//First digit in hour mode
						if (selectionMode == 'HOUR') {
							newVal = formatTime((isNegative ? '-' : '') + (!settings.duration ? '0' : '') + event.key + settings.separator + minPart);
							if (settings.maximum) {
								if (!isTimeSmallerOrEquals(newVal, settings.maximum)) {
									newVal = settings.maximum.substring(0, settings.maximum.indexOf(':')) + settings.separator + minPart;
									if (!isTimeSmallerOrEquals(newVal, settings.maximum)) {											
										newVal = settings.maximum;
									}
									newVal = formatTime(newVal);
									switchToMinutes = true;
								} else if (!isTimeSmallerOrEquals((isNegative ? '-' : '') + enteredDigits + '0' + settings.separator + minPart, settings.maximum)) {
									switchToMinutes = true;
								}
							}
							if (settings.minimum) {
								if (!isTimeSmallerOrEquals(settings.minimum, newVal)) {
									newVal = settings.minimum.substring(0, settings.minimum.indexOf(':')) + settings.separator + minPart;
									if (!isTimeSmallerOrEquals(settings.minimum, newVal)) {											
										newVal = settings.minimum;
									}
									newVal = formatTime(newVal);
									switchToMinutes = true;
								} else if (!isTimeSmallerOrEquals(settings.minimum, (isNegative ? '-' : '') + enteredDigits + '0' + settings.separator + minPart)) {
									switchToMinutes = true;
								}
							}							
							inputElement.val(formatTime(newVal));
							
							var switchToMinutes = (!settings.duration && parseInt(event.key) > 2) || (settings.maximum && !isTimeSmallerOrEquals((isNegative ? '-' : '') + parseInt(event.key) + '0:00', settings.maximum)) || (settings.minimum && !isTimeSmallerOrEquals(settings.minimum, (isNegative ? '-' : '') + parseInt(event.key) + '0:00'));
							if (switchToMinutes) {
								enteredDigits = '';
								if (settings.precision == 60) {
									hideTimePicker();
								} else {
									switchToMinuteMode();
									selectMinuteOnInputElement();
								}
							} else {
								selectHourOnInputElement();
							}
						}
						//First digit in minute mode
						else {
							if (parseInt(event.key) > 5) {
								newVal = formatTime(hourPart + settings.separator + '0' + event.key);
								if (settings.maximum && !isTimeSmallerOrEquals(newVal, settings.maximum)) {
									newVal = formatTime(settings.maximum);
									inputElement.val(newVal);
									enteredDigits = '';
								}
								else if (settings.minimum && !isTimeSmallerOrEquals(settings.minimum, newVal)) {
									newVal = formatTime(settings.minimum);
									inputElement.val(newVal);
									enteredDigits = '';
								}
								else {
									inputElement.val(newVal);
									hideTimePicker();
								}
							} else {
								newVal = formatTime(hourPart + settings.separator + event.key + '0');
								if (settings.maximum && !isTimeSmallerOrEquals(newVal, settings.maximum)) {
									newVal = formatTime(settings.maximum);
									enteredDigits = '';
								}
								if (settings.minimum && !isTimeSmallerOrEquals(settings.minimum, newVal)) {
									newVal = formatTime(settings.minimum);
									enteredDigits = '';
								}
								inputElement.val(newVal);
								selectMinuteOnInputElement();
							}
						}
					}
					
					//entering second digit...
					else {
						if (!settings.duration) {
							//Second digit in hour mode (for normal clock)
							if (selectionMode == 'HOUR') {
								var number = parseInt(enteredDigits + event.key);
								var topNumber = selectionMode == 'HOUR' ? 24 : 60;
								if (number == topNumber) {
									enteredDigits = '';
									newVal = '00' + settings.separator + minPart;
									inputElement.val(formatTime(newVal));
									if (settings.precision == 60) {
										hideTimePicker();
									} else {
										switchToMinuteMode();
										selectMinuteOnInputElement();
									}
								}
								else if (number > topNumber) {
									enteredDigits = event.key;
									newVal = '0' + enteredDigits + settings.separator + minPart;
									inputElement.val(formatTime(newVal));
									selectHourOnInputElement();
								}
								else {
									newVal = enteredDigits + event.key + settings.separator + minPart;
									inputElement.val(formatTime(newVal));
									if (settings.precision == 60) {
										hideTimePicker();
									} else {
										switchToMinuteMode();
										selectMinuteOnInputElement();
										enteredDigits = '';
									}
								}
							}
							//Second digit in minute mode (for normal clock)
							else {
								newVal = hourPart + settings.separator + enteredDigits + event.key;
								inputElement.val(formatTime(newVal));
								hideTimePicker();
							}
						} else {
							
							if (enteredDigits == '0') enteredDigits = '';
							
							//Second digit in minute mode (for duration)
							if (selectionMode == 'MINUTE') {
								newVal = formatTime(hourPart + settings.separator + enteredDigits + event.key);
								if (settings.maximum && !isTimeSmallerOrEquals(newVal, settings.maximum)) {
									newVal = formatTime(settings.maximum);
									inputElement.val(newVal);
									enteredDigits = '';
								}
								else if (settings.minimum && !isTimeSmallerOrEquals(settings.minimum, newVal)) {
									newVal = formatTime(settings.minimum);
									inputElement.val(newVal);
									enteredDigits = '';
								}
								else {
									inputElement.val(newVal);
									hideTimePicker();
								}
							}
							//Second digit in hour mode (for duration)
							else {
								enteredDigits += event.key;
								newVal = (isNegative ? '-' : '') + enteredDigits + settings.separator + minPart;
								var switchToMinutes = false;
								if (settings.maximum) {
									if (!isTimeSmallerOrEquals(newVal, settings.maximum)) {
										newVal = settings.maximum.substring(0, settings.maximum.indexOf(':')) + settings.separator + minPart;
										if (!isTimeSmallerOrEquals(newVal, settings.maximum)) {											
											newVal = settings.maximum;
										}
										newVal = formatTime(newVal);
										switchToMinutes = true;
									} else if (!isTimeSmallerOrEquals((isNegative ? '-' : '') + enteredDigits + '0' + settings.separator + minPart, settings.maximum)) {
										switchToMinutes = true;
									}
								}
								if (settings.minimum) {
									if (!isTimeSmallerOrEquals(settings.minimum, newVal)) {
										newVal = settings.minimum.substring(0, settings.minimum.indexOf(':')) + settings.separator + minPart;
										if (!isTimeSmallerOrEquals(settings.minimum, newVal)) {											
											newVal = settings.minimum;
										}
										newVal = formatTime(newVal);
										switchToMinutes = true;
									} else if (!isTimeSmallerOrEquals(settings.minimum, (isNegative ? '-' : '') + enteredDigits + '0' + settings.separator + minPart)) {
										switchToMinutes = true;
									}
								}
								inputElement.val(formatTime(newVal));
								if (!switchToMinutes) {
									selectHourOnInputElement();
								} else {
									if (settings.precision == 60) {
										hideTimePicker();
									} else {
										switchToMinuteMode();
										selectMinuteOnInputElement();
										enteredDigits = '';
									}
								}
							}
						}
					}
					if (newVal != oldVal) settings.onAdjust.call(element.get(0), newVal.replace(/^\+/, ''), oldVal.replace(/^\+/, ''));
					autosize();
				}
				repaintClock();
			}
			
		});
				
		/************************************************************************************************
		  CHECKS IF THE DEVICE IS A MOBILE
		 ************************************************************************************************/	
		function isMobile() {
			var check = false;
			(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
			return check;
		}
		
		/************************************************************************************************
		  FUNCTION TO COMPARE TWO TIMES
		 ************************************************************************************************/
		function isTimeSmallerOrEquals(time1, time2, doNotInvolveMinutePart) {
			var regex = '^(-|\\+)?([0-9]+)(.([0-9]{1,2}))?$';
			(new RegExp(regex, 'i')).test(time1);
			var t1 = parseInt(RegExp.$2) * 60;
			if (RegExp.$4 && !doNotInvolveMinutePart) t1 += parseInt(RegExp.$4);
			if (RegExp.$1 == '-') t1 *= -1;
			(new RegExp(regex, 'i')).test(time2);
			var t2 = parseInt(RegExp.$2) * 60;
			if (RegExp.$4 && !doNotInvolveMinutePart) t2 += parseInt(RegExp.$4);
			if (RegExp.$1 == '-') t2 *= -1;
			if (t1 <= t2) return true;
			else return false;
		}
		
		function validateSettings() {
			settings.precision = parseInt(settings.precision);
			settings.modeSwitchSpeed = parseInt(settings.modeSwitchSpeed);
			settings.popupWidthOnDesktop = parseInt(settings.popupWidthOnDesktop);
			settings.fonts.clockOuterCircleFontSize = parseInt(settings.fonts.clockOuterCircleFontSize);
			settings.fonts.clockInnerCircleFontSize = parseInt(settings.fonts.clockInnerCircleFontSize);
			settings.fonts.buttonFontSize = parseInt(settings.fonts.buttonFontSize);
			
			if (settings.precision != 1 && settings.precision != 5 && settings.precision != 10 && settings.precision != 15 && settings.precision != 30 && settings.precision != 60) {
				console.error('%c[jquery-clock-timepicker] Invalid precision specified: ' + settings.precision + '! Precision has to be 1, 5, 10, 15, 30 or 60. For now, the precision has been set back to: 1', 'color:orange');
				settings.precision = 1;
			}
			if (!settings.separator || ('' + settings.separator).match(/[0-9]+/)) {
				console.error('%c[jquery-clock-timepicker] Invalid separator specified: ' + (settings.separator ? settings.separator : '(empty)') + '! The separator cannot be empty nor can it contain any decimals. For now, the separator has been set back to a colon (:).', 'color:orange');
				settings.separator = ':';
			}
			if (settings.durationNegative && !settings.duration) {
				console.log('%c[jquery-clock-timepicker] durationNegative is set to true, but this has no effect because duration is false!', 'color:orange');
			}
			if (settings.maximum && !settings.maximum.match(/^-?[0-9]+:[0-9]{2}$/)) {
				console.log('%c[jquery-clock-timepicker] Invalid time format for option "maximum": ' + settings.maximum + '! Maximum not used...', 'color:orange');
				settings.maximum = null;
			}
			if (settings.minimum && !settings.minimum.match(/^-?[0-9]+:[0-9]{2}$/)) {
				console.log('%c[jquery-clock-timepicker] Invalid time format for option "minimum": ' + settings.minimum + '! Minimum not used...', 'color:orange');
				settings.minimum = null;
			}
			if (settings.minimum && settings.maximum && (settings.minimum == settings.maximum || !isTimeSmallerOrEquals(settings.minimum, settings.maximum))) {
				console.log('%c[jquery-clock-timepicker] Option "minimum" must be smaller than the option "maximum"!', 'color:orange');
				settings.minimum = null;
			}
		}
	};	
}(jQuery));
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(1b($){$.cz.1p=1b(Q,R){X S=$.cy(1c,{1P:17,2f:17,1l:{5b:\'#3P\',4z:\'#6Z\',4v:\'#9h\',6a:\'#5U\',43:\'#8o\',4s:\'#5U\',4r:\'#6W\',5L:\'#4a\',5a:\'#3P\',55:\'#4a\',2G:\'#3P\',2Q:\'#4a\',4f:\'#4a\',4e:\'#3P\'},1i:17,1v:17,1H:{3X:\'5S\',2q:14,2Z:12,3U:20},3R:17,4b:{5n:\'a5\',5o:\'6K\'},19:\'23:59\',1a:\'-23:59\',3N:5t,3G:17,2i:1b(a,b){},6G:1b(a,b){},5v:1b(){},4G:1b(){},5x:1b(){},3V:5z,1j:1,3Q:17,1h:\':\',8w:17,5D:17,1W:1c},5G Q==\'6J\'?Q:{});X T=\'.1u-1t 2L { 8k-2a: 5V; }\';V(1E())T+=\' .1u-1t 2L::6b { 3B:41(3d,3d,3d,0.6); } .1u-1t 2L::-76-6b { 3B:41(3d,3d,3d,0.6); }\';1b 6B(){X a=17;$(\'4W 3y\').6o(1b(){V($(1F).34()==T){a=1c;1n 17}});V(a)1n 1c;Y 1n 17}V(!6B()){X U=2m.5R(\'3y\');U.5Q=\'34/W\';V(U.5P)U.5P.8u=T;Y U.4M(2m.8y(T));(2m.4W||2m.8L(\'4W\')[0]).4M(U)}1n 1F.6o(1b(){X l=$(1F);X n={},4K=l.1L();2V(X o 3v 4K){V(S.71(o)){S[o]=4K[o]}}5K();V(!(\'1W\'3v 2y))S.1W=17;V(5G Q==\'8h\'){V(!$(1F).1V().5I(\'1u-1t\'))2E.3b(\'%c[2z-1u-1t] 8O 8V a 1b, 97 9c 3W 9p!\',\'2a:5F\');Y{Q=Q.a8();V(Q==\'ae\')4I($(1F));Y V(Q==\'6H\'){$(1F).11(1d(R));X p=$(1F).1V().3l(\'.1u-1t-3C-2L\');V(p.3D>0)p.11(1d(R));$(1F).1V().3l(\'3m:79\').7F(\'3F\')}Y 2E.3b(\'%c[2z-1u-1t] 3u 3H 8p 2O 1p: \'+Q,\'2a:5F\')}1n}Y{V($(1F).1V().5I(\'1u-1t\'))4I($(1F))}l.11(1d(l.11()));V(1E())l.2K(\'5C\',1c);X q=l.11();X r=\'\';X t=\'1z\';X u=17;X v=17;X w=1E()?$(2m).1B()-80:S.3V;X z=w-(1E()?50:20);X A=1f(z/2);X B=1f(z/2);X C=1f(z/2);X D=A-16;X E=D-29;l.7b(\'<2U 2H="1u-1t" 3y="1G:3O-2x; 2l:5p">\');X F=$(\'<2U 2H="1u-1t-2f">\');F.W(\'2l\',\'3s\').W(\'2p\',0).W(\'1G\',\'1S\').W(\'1r\',1f(l.W(\'2r-1r\'))+\'1C\').W(\'1w\',\'1D\').W(\'2b-4F\',l.W(\'2b-4F\')).W(\'2b-4E\',l.W(\'2b-4E\')).W(\'2b-5k\',l.W(\'2b-5k\')).W(\'5j-2h\',l.W(\'5j-2h\'));l.1V().2k(F);l.W(\'5i-1B\',l.2I());2f();X G;V(1E()){G=$(\'<2U 2H="1u-1t-3B">\');G.W(\'3j\',77).W(\'1G\',\'1S\').W(\'2l\',\'5f\').W(\'1r\',\'1D\').W(\'1w\',\'1D\').W(\'1B\',\'2M%\').W(\'2h\',\'2M%\').W(\'4C\',\'41(0,0,0,0.6)\');l.1V().2k(G);1b 4B(a){a.1O()}G.1U(\'3h\',4B);G.1x(\'3h\',4B);1b 4A(a){a.1O();a.3g();V(t==\'1z\')1J();Y 1I();1n 17}G.1U(\'2w\',4A);G.1x(\'2w\',4A)}X H=$(\'<2U 2H="1u-1t-56">\');H.W(\'1G\',\'1S\').W(\'3j\',9d).W(\'4y\',\'4w\').W(\'2l\',\'3s\').W(\'1B\',w+\'1C\').W(\'4C\',S.1l.5L).W(\'9q-9x\',\'0 9T 6i 1D 41(0, 0, 0, 0.14)\').W(\'4u-68\',\'b0\').W(\'bP\',\'4t\').W(\'cA-cB\',\'1S\');H.1x(\'4q\',1b(){1n 17});V(1E()){H.W(\'2l\',\'5f\').W(\'1w\',\'4o\').W(\'1r\',\'4o\');2c.6T("6V",1b(){3w(1b(){4n();2B()},5t)});1b 4m(a){a.1O()}H.1U(\'3h\',4m);H.1x(\'3h\',4m);1b 4l(a){a.3g();V(t==\'1z\')1J();Y 1I();1n 17}H.1U(\'2w\',4l);H.1x(\'2w\',4l)}l.1V().2k(H);V(!1E()){1b 4j(a){V(H.W(\'1G\')!=\'1S\'&&!($(a.5e)[0]==I[0]||$.7C(I.1V()[0],$(a.5e)[0]))){1K()}}$(2c).1U(\'2w\',4j);$(2c).1x(\'2w\',4j)}X I=l;V(1E()){I=$(\'<2L 2H="1u-1t-3C-2L" 5Q="34">\');I.W(\'1G\',\'3O-2x\').W(\'1B\',\'2M%\').W(\'4u\',\'1D\').W(\'4u-68\',\'1D\').W(\'8c\',\'1D\').W(\'8g\',1E()?\'4o\':\'6i\').W(\'2r\',\'1D\').W(\'2J\',\'3n 1D\').W(\'8n\',\'5c\').W(\'2a\',S.1l.55).W(\'4C\',S.1l.5a);I.2K(\'5C\',1c);H.2k(I)}V(l.1m(\'2o\'))l.1m(\'1L-2o-1M\',l.1m(\'2o\'));l.2K(\'2o\',\'1U\');V(l.1m(\'2n\'))l.1m(\'1L-2n-1M\',l.1m(\'2n\'));l.2K(\'2n\',\'1U\');V(l.1m(\'2s\'))l.1m(\'1L-2s-1M\',l.1m(\'2s\'));l.2K(\'2s\',\'1U\');V(l.1m(\'2v\'))l.1m(\'1L-2v-1M\',l.1m(\'2v\'));l.2K(\'2v\',17);I.1x(\'58.1p 51.1p 4Z.1p 4Y.1p 6e.1p 69.1p 5T.1p 5N.1p 4q.1p\',5M);I.1x(\'4h.1p\',4g);I.1x(\'5w.1p\',5m);I.1x(\'3F.1p\',5g);l.1x(\'4d.1p\',5E);l.1x(\'2T.1p\',5A);X J=$(\'<2U>\');J.W(\'2l\',\'5p\').W(\'1B\',z+\'1C\').W(\'2h\',z+\'1C\').W(\'2r\',\'3n \'+(1E()?25:10)+\'1C\');H.2k(J);X K=$(\'<3m 2H="1u-1t-6U-3m">\');K.W(\'4y\',\'4w\').W(\'2l\',\'3s\').W(\'1r\',\'1D\').W(\'1w\',\'1D\');K.1m(\'1B\',z);K.1m(\'2h\',z);4c(K);J.2k(K);X L=$(\'<3m 2H="1u-1t-6Y-3m">\');L.W(\'4y\',\'4w\').W(\'2l\',\'3s\').W(\'1r\',\'1D\').W(\'1w\',\'1D\').W(\'1G\',\'1S\');L.1m(\'1B\',z);L.1m(\'2h\',z);4c(L);J.2k(L);V(1E()){X M=$(\'<2U>\');M.W(\'34-5u\',\'42\').W(\'2J\',\'73 5h\');X N=\'<a 3y="34-78:1S; 2a:\'+S.1l.5b+\'; 2b-4E:5S; 2b-4F:\'+S.1H.3U+\'1C; 2J-1w:5h">\';X O=$(N);O.33(S.4b.5o);O.1x(\'2w\',1b(){1K()});M.2k(O);X P=$(N);P.33(S.4b.5n);P.1x(\'2w\',1b(){V(1E())l.11(I.11());V(S.1W)2y.1W(10);1K()});M.2k(P);H.2k(M)}1b 5d(){V(!$(2m.7P).88(\'.1u-1t\').3D)1n;X a=2m.5R("2L");l.1V().1A(0).4M(a);a.2T();l.1V().1A(0).8f(a)}1b 4c(d){V(!1E()){d.1x(\'4h\',1b(a){X x=a.3q-$(1F).1Y().1w;X y=a.3o-$(1F).1Y().1r;2F(x,y);u=1c});d.1x(\'8v\',1b(a){u=17;X x=a.3q-$(1F).1Y().1w;X y=a.3o-$(1F).1Y().1r;X b=Z.4i(Z.2S(Z.2W(x-B),2)+Z.2S(Z.2W(y-C),2));V(S.1i&&S.1v&&b<=20){X c=I.11();V(c.2t(/^-/)){1N=c.3a(1)}Y{1N=\'-\'+c.1s(/^(-|\\+)/,\'\')}V(S.1a&&!1e(S.1a,1N))1N=1d(S.1a);V(S.19&&!1e(1N,S.19))1N=1d(S.19);I.11(1d(1N));2B();S.2i.1Q(l.1A(0),1N.1s(/^\\+/,\'\'),c.1s(/^\\+/,\'\'));V(t==\'1z\')1J();Y 1I();1n}V(!2F(x,y,1c)){V(S.1j==60){1K()}Y V(t==\'1z\'){2e();1I()}Y{1K()}1n 17}V(t==\'2C\'||S.1j==60){1K()}Y{2e();1I()}});d.1x(\'a3\',1b(a){X x=a.3q-$(1F).1Y().1w;X y=a.3o-$(1F).1Y().1r;2F(x,y)});d.1x(\'a4\',1b(a){V(t==\'1z\')2Y();Y 2X()});d.1x(\'4d\',1b(a){4k(a)})}Y{d.1x(\'aV\',1b(a){a.1O();X x=a.3A.3z[0].3q-$(1F).1Y().1w;X y=a.3A.3z[0].3o-$(1F).1Y().1r;X b=Z.4i(Z.2S(Z.2W(x-B),2)+Z.2S(Z.2W(y-C),2));V(S.1i&&S.1v&&b<=20){v=1c;X c=I.11();V(c.2t(/^-/)){1N=c.3a(1)}Y{1N=\'-\'+c.1s(/^(-|\\+)/,\'\')}V(S.1a&&!1e(S.1a,1N))1N=1d(S.1a);V(S.19&&!1e(1N,S.19))1N=1d(S.19);I.11(1d(1N));2B();S.2i.1Q(l.1A(0),1N.1s(/^\\+/,\'\'),c.1s(/^\\+/,\'\'));V(t==\'1z\')1J();Y 1I();1n}2F(x,y);u=1c});d.1x(\'cu\',1b(a){a.1O();u=17;V(!v&&S.1j!=60){2e();1I()}v=17});d.1x(\'3h\',1b(a){a.1O();V(u){X x=a.3A.3z[0].3q-$(1F).1Y().1w;X y=a.3A.3z[0].3o-$(1F).1Y().1r;2F(x,y)}})}d.1x(\'3F\',1b(a){a.1O();2F();2A();1J();q=I.11()})}1b 5y(a){X b=H.W(\'1G\')!=\'1S\';V(!I.11()){I.11(1d(\'1o:1o\'));2A(!b);1J()}Y V(S.1j==60){2A(!b);1J()}Y{X c=I.W(\'cS\');V(!c)c=\'4p\';X d=I.W(\'34-5u\');V(!d)d=\'1w\';X e=I.3e();X f=5O(I.W(\'2J-1w\'));X g=5O(I.W(\'2J-42\'));X h=e-f-g;F.W(\'1G\',\'3O-2x\');F.33(I.11());X i=F.3e();F.33(S.1h);X j=F.3e()/2;F.33(I.11().1s(22 1g(S.1h+\'[0-9]+$\'),\'\'));j+=F.3e();F.W(\'1G\',\'1S\');X k=e/2;V(d==\'1w\'||d==\'74\'||(c==\'4p\'&&d==\'6l\')||(c==\'6v\'&&d==\'6z\')){k=Z.2R(f+j)}Y V(d==\'5c\'){k=Z.2R(f+((h-i)/2)+j)}Y V(d==\'42\'||(c==\'4p\'&&d==\'6z\')||(c==\'6v\'&&d==\'6l\')){k=Z.2R(f+h-(i-j))}V(a.7a>=k-2){V(t==\'1z\'&&S.1W)2y.1W(10);2e(!b);1I()}Y{V(t==\'2C\'&&S.1W)2y.1W(10);2A(!b);1J()}}V(!b)4x()}1b 4k(a){X e=2c.7c||a;a.1O();X b=Z.7r(-1,Z.5i(1,(e.7t||-e.7u)));(22 1g(\'^(-|\\\\+)?([0-9]+)(.([0-9]{1,2}))?$\')).26(I.11());X c=S.1i&&S.1v&&1g.$1==\'-\'?1c:17;X h=1f(1g.$2);V(c)h=-h;X m=1g.$4?1f(1g.$4):0;V(t==\'1z\'){V(S.1i&&S.1v&&h==0&&!c&&b==-1)c=1c;Y V(S.1i&&S.1v&&h==0&&c&&b==1)c=17;Y h+=b;V(h==-1){V(!S.1i)h=23;Y V(!S.1v)h=0}V(h==24&&!S.1i)h=0}Y{m+=(b*S.1j);V(m<0)m=60+m;V(m>=60)m=m-60}X d=I.11();X f=(h<10&&!S.1i?\'0\':\'\')+(c&&h==0?\'-\'+h:h)+S.1h+(m<10?\'0\':\'\')+m;X g=1c;V(S.19&&!1e(f,S.19))g=17;V(S.1a&&!1e(S.1a,f))g=17;V(!g&&t==\'1z\'){V(b>0)f=1d(S.19);Y f=1d(S.1a);g=1c}V(g){I.11(1d(f));2f();2B();V(t==\'1z\')1J();Y 1I();V(f!=d)S.2i.1Q(l.1A(0),f.1s(/^\\+/,\'\'),d.1s(/^\\+/,\'\'))}}1b 2F(x,y,a){X b=(8a*Z.8b((y-C)/(x-B))/(2*Z.1q))+90;X c=Z.4i(Z.2S(Z.2W(x-B),2)+Z.2S(Z.2W(y-C),2));X d=0;X e=0;X g=17;V((22 1g(\'^(-|\\\\+)?([0-9]+).([0-9]{2})$\')).26(I.11())){g=S.1i&&S.1v&&1g.$1==\'-\'?1c:17;d=1f(1g.$2);e=1f(1g.$3)}V(t==\'1z\'){b=Z.3L(b/30);X h=-1;V(c<A+10&&c>A-28){V(x-B>=0){V(b==0)h=12;Y h=b}Y V(x-B<0){h=b+6}}Y V(c<A-28&&c>A-65){V(x-B>=0){V(b!=0)h=b+12;Y h=0}Y V(x-B<0){h=b+18;V(h==24)h=0}}V(S.1P){h=h+(h>=12?-12:12)}V(h>-1){X i=(g?\'-\':\'\')+(h<10&&!S.1i?\'0\':\'\')+h+S.1h+(e<10?\'0\':\'\')+e;V(u||a){X j=1c;V(S.19&&!1e(i,S.19))j=17;V(S.1a&&!1e(S.1a,i))j=17;V(!j){V(S.19&&1e((g?\'-\':\'\')+(h<10&&!S.1i?\'0\':\'\')+h+S.1h+\'1o\',S.19)){i=1d(S.19);j=1c}V(S.1a&&!1e(S.1a,(g?\'-\':\'\')+(h<10&&!S.1i?\'0\':\'\')+h+S.1h+\'1o\')){i=1d(S.1a);j=1c}}V(j){X k=I.11();V(i!=k){V(S.1W)2y.1W(10);S.2i.1Q(l.1A(0),i.1s(/^\\+/,\'\'),k.1s(/^\\+/,\'\'))}I.11(1d(i));2f()}}2Y(h==0?24:h,S.1i&&S.1v&&c<=12);1n 1c}Y{2Y(3i,S.1i&&S.1v&&c<=12);1n 17}}Y V(t==\'2C\'){b=Z.3L(b/6);X m=-1;V(c<A+10&&c>A-40){V(x-B>=0){m=b}Y V(x-B<0){m=b+30;V(m==60)m=0}}V(m>-1){V(S.1j!=1){X f=Z.2R(m/S.1j);m=f*S.1j+(Z.3L((m-f*S.1j)/S.1j)==1?S.1j:0);V(m>=60)m=0}X i=(g?\'-\':\'\')+(d<10&&!S.1i?\'0\':\'\')+d+S.1h+(m<10?\'0\':\'\')+m;X j=1c;V(S.19&&!1e(i,S.19))j=17;V(S.1a&&!1e(S.1a,i))j=17;V((u||a)&&j){X k=I.11();V(i!=k){V(S.1W)2y.1W(10);S.2i.1Q(l.1A(0),i.1s(/^\\+/,\'\'),k.1s(/^\\+/,\'\'))}I.11(1d(i))}2X(m==0?60:m,S.1i&&S.1v&&c<=12);1n 1c}Y{2X(3i,S.1i&&S.1v&&c<=12);1n 17}}}1b 2B(){V(t==\'1z\'){2Y()}Y{2X()}}1b 4D(a,b){a.1T();a.2g(B,C,12,0,2*Z.1q,17);a.1y=S.1l.4e;a.2j();V(b){a.1T();a.2g(B,C,14,0,2*Z.1q,17);a.3p=S.1l.4e;a.3r()}a.1T();a.44(B-6,C);a.3Y(B+6,C);a.3S=2;a.3p=S.1l.4f;a.3r();V(!I.11().2t(/^-/)){a.1T();a.44(B,C-6);a.3Y(B,C+6);a.3S=2;a.3p=S.1l.4f;a.3r()}}1b 2Y(a,b){X c=K.1A(0).5q(\'2d\');(22 1g(\'^(-|\\\\+)?([0-9]+).([0-9]{1,2})$\')).26(I.11());X d=1g.$1==\'-\'?1c:17;X e=1f(1g.$2);c.5r(0,0,z,z);V(e>=24){H.W(\'3J\',\'4t\');1n}Y{V(!S.3G)H.W(\'3J\',\'5s\')}V(e==0)e=24;V(!I.11())e=-1;c.1T();c.2g(B,C,A,0,2*Z.1q,17);c.1y=S.1l.4z;c.2j();V(!1E()&&a){X f=1c;V(S.19&&!1e((d?\'-\':\'\')+(a==24?\'1o\':a)+\':1o\',S.19))f=17;V(S.1a&&!1e(S.1a,(d?\'-\':\'\')+(a==24?\'1o\':a)+\':1o\',1c))f=17;V(f){c.1T();c.2g(B+Z.1Z(Z.1q/6*((a%12)-3))*(a>12?(S.1P?D:E):(S.1P?E:D)),C+Z.1X(Z.1q/6*((a%12)-3))*(a>12?(S.1P?D:E):(S.1P?E:D)),15,0,2*Z.1q,17);c.1y=S.1l.4r;c.2j()}}c.1T();c.2g(B,C,3,0,2*Z.1q,17);c.1y=S.1l.2G;c.2j();V(e>-1&&(!S.19||e==24||1e(e,S.19))){c.1T();c.44(B,C);c.3Y(B+Z.1Z(Z.1q/6*((e%12)-3))*(e>12?(S.1P?D:E):(S.1P?E:D)),C+Z.1X(Z.1q/6*((e%12)-3))*(e>12?(S.1P?D:E):(S.1P?E:D)));c.3S=1;c.3p=S.1l.2G;c.3r();c.1T();c.2g(B+Z.1Z(Z.1q/6*((e%12)-3))*(e>12?(S.1P?D:E):(S.1P?E:D)),C+Z.1X(Z.1q/6*((e%12)-3))*(e>12?(S.1P?D:E):(S.1P?E:D)),15,0,2*Z.1q,17);c.1y=S.1l.2G;c.2j()}c.2b=S.1H.2q+\'1C \'+S.1H.3X;2V(i=1;i<=12;i++){X g=Z.1q/6*(i-3);X s=i;V(S.1P){s=i+12;V(e==i+12)c.1y=S.1l.2Q;Y c.1y=S.1l.4v;V(s==24)s=\'1o\'}Y{V(e==i)c.1y=S.1l.2Q;Y c.1y=S.1l.43}V((!S.19||1e((d?\'-\':\'\')+s+\':1o\',S.19))&&(!S.1a||1e(S.1a,(d?\'-\':\'\')+s+\':1o\',1c))){c.31(s,B+Z.1Z(g)*D-(c.2P(s).1B/2),C+Z.1X(g)*D+(S.1H.2q/3))}Y V(!S.3R){c.1y=S.1l.4s;c.31(s,B+Z.1Z(g)*D-(c.2P(s).1B/2),C+Z.1X(g)*D+(S.1H.2q/3))}}c.2b=S.1H.2Z+\'1C \'+S.1H.3X;2V(i=1;i<=12;i++){X g=Z.1q/6*(i-3);X s=i;V(!S.1P){s=i+12;V(e==i+12)c.1y=S.1l.2Q;Y c.1y=S.1l.4v;V(s==24)s=\'1o\'}Y{V(e==i)c.1y=S.1l.2Q;Y c.1y=S.1l.43}V((!S.19||1e((d?\'-\':\'\')+s+\':1o\',S.19))&&(!S.1a||1e(S.1a,(d?\'-\':\'\')+s+\':1o\',1c))){c.31(s,B+Z.1Z(g)*E-(c.2P(s).1B/2),C+Z.1X(g)*E+(S.1H.2Z/3))}Y V(!S.3R){c.1y=S.1l.6a;c.31(s,B+Z.1Z(g)*E-(c.2P(s).1B/2),C+Z.1X(g)*E+(S.1H.2Z/3))}}V(S.1i&&S.1v)4D(c,b)}1b 2X(a,b){X c=L.1A(0).5q(\'2d\');(22 1g(\'^(-|\\\\+)?([0-9]+).([0-9]{1,2})$\')).26(I.11());X d=1g.$1==\'-\'?1c:17;X e=1f(1g.$2);X f=1f(1g.$3);V(!I.11())f=-1;V(!S.3G)H.W(\'3J\',\'5s\');c.5r(0,0,z,z);c.1T();c.2g(B,C,A,0,2*Z.1q,17);c.1y=S.1l.4z;c.2j();V(!1E()&&a){V(a==60)a=0;X g=1c;V(S.19&&!1e((d?\'-\':\'\')+e+\':\'+(a<10?\'0\':\'\')+a,S.19))g=17;V(S.1a&&!1e(S.1a,(d?\'-\':\'\')+e+\':\'+(a<10?\'0\':\'\')+a))g=17;V(g){c.1T();c.2g(B+Z.1Z(Z.1q/6*((a/5)-3))*D,C+Z.1X(Z.1q/6*((a/5)-3))*D,15,0,2*Z.1q,17);c.1y=S.1l.4r;c.2j()}}c.1T();c.2g(B,C,3,0,2*Z.1q,17);c.1y=S.1l.2G;c.2j();V(f>-1&&(!S.19||1e(e+\':\'+f,S.19))&&(!S.1a||1e(S.1a,e+\':\'+f))){c.1T();c.44(B,C);c.3Y(B+Z.1Z(Z.1q/6*((f/5)-3))*D,C+Z.1X(Z.1q/6*((f/5)-3))*D);c.3S=1;c.3p=S.1l.2G;c.3r();c.1T();c.2g(B+Z.1Z(Z.1q/6*((f/5)-3))*D,C+Z.1X(Z.1q/6*((f/5)-3))*D,15,0,2*Z.1q,17);c.1y=S.1l.2G;c.2j()}c.2b=S.1H.2q+\'1C \'+S.1H.3X;2V(i=1;i<=12;i++){V(Z.2R(i*5/S.1j)!=i*5/S.1j)cq;X h=Z.1q/6*(i-3);V(f==i*5||(f==0&&i==12))c.1y=S.1l.2Q;Y c.1y=S.1l.43;X s=i*5==5?\'cs\':i*5;V(s==60)s=\'1o\';X g=1c;V(S.19&&!1e((d?\'-\':\'\')+e+\':\'+s,S.19))g=17;V(S.1a&&!1e(S.1a,(d?\'-\':\'\')+e+\':\'+s))g=17;V(g){c.31(s,B+Z.1Z(h)*D-(c.2P(s).1B/2),C+Z.1X(h)*D+(S.1H.2q/3))}Y V(!S.3R){c.1y=S.1l.4s;c.31(s,B+Z.1Z(h)*D-(c.2P(s).1B/2),C+Z.1X(h)*D+(S.1H.2q/3))}}V(f>-1&&f%5!=0){c.1T();c.2g(B+Z.1Z(Z.1q/6*((f/5)-3))*D,C+Z.1X(Z.1q/6*((f/5)-3))*D,2,0,2*Z.1q,17);c.1y=\'5V\';c.2j()}V(S.1i&&S.1v)4D(c,b)}1b 4n(){X a;V(2c.3T<cw){w=2c.3T-60;H.W(\'1B\',w+5z+\'1C\');I.W(\'2l\',\'3s\').W(\'1w\',\'1D\').W(\'1r\',\'1D\').W(\'1B\',\'cx\').W(\'2h\',w+20+\'1C\');J.W(\'2r\',\'3n 4H 1D cY\');a=w+1f(J.W(\'2r-1r\'))+1f(J.W(\'2r-5B\'))}Y{w=2c.3e-80;V(w>3M)w=3M;H.W(\'1B\',w+\'1C\');I.W(\'2l\',\'cC\').W(\'1B\',\'2M%\').W(\'2h\',\'cO\');J.W(\'2r\',\'3n 4H 3n 4H\');a=w+1f(J.W(\'2r-1r\'))+1f(J.W(\'2r-5B\'))+65}H.W(\'1w\',1f(($(\'cP\').2K(\'cR\')-H.2I())/2)+\'1C\');H.W(\'1r\',1f((2c.3T-a)/2)+\'1C\');z=w-50;A=1f(z/2);B=1f(z/2);C=1f(z/2);D=A-16;E=D-29;J.W(\'1B\',z+\'1C\');J.W(\'2h\',z+\'1C\');K.1m(\'1B\',z);K.1m(\'2h\',z);L.1m(\'1B\',z);L.1m(\'2h\',z)}1b 4x(){V(!l.11())I.11(1d(\'1o:1o\'));Y I.11(1d(l.11()));V(!1E()&&S.3G)H.W(\'3J\',\'4t\');V(1E())4n();H.W(\'1G\',\'2x\');2B();V(1E()){G.3k().W(\'2p\',0).W(\'1G\',\'2x\').3Z({2p:1},3M)}Y{V(H.2I()>l.2I()){X a=1f((H.2I()-l.2I())/2);V(a<l.1Y().1w){H.W(\'1w\',-a+\'1C\')}}X b=l.1Y().1r-$(2c).6I();X c=2c.3T-b-l.2u();V(c<H.2u()&&l.1Y().1r>H.2u()){V(b<H.2u()){V(b>c+l.2u()){H.W(\'1r\',-H.2u()+1f(l.W(\'3K\'))+\'1C\')}Y{H.W(\'1r\',1f(l.W(\'3K\'))+l.2u()+\'1C\')}}Y{H.W(\'1r\',-H.2u()+1f(l.W(\'3K\'))+\'1C\')}}Y{H.W(\'1r\',1f(l.W(\'3K\'))+l.2u()+\'1C\')}}S.5x.1Q(l.1A(0))}1b 1K(){X a=1d(l.11());r=\'\';H.W(\'1G\',\'1S\');V(1E()){G.3k().3Z({2p:0},3M,1b(){G.W(\'1G\',\'1S\')})}Y{l.11(a)}5d();V(!q&&a.2t(22 1g(\'^0+\'+S.1h+\'1o$\'))){I.11(\'\')}Y V(q!=a){V(\'5H\'3v 2m){X b=2m.5H(\'6L\');b.6M(\'6N\',1c,17);l.1A(0).6O(b)}Y{X b=2m.6P();b.6Q=\'2w\';l.1A(0).6R(\'6S\',b)}S.6G.1Q(l.1A(0),a.1s(/^\\+/,\'\'),q.1s(/^\\+/,\'\'));q=a}S.5v.1Q(l.1A(0))}1b 2A(a){V(t==\'1z\')1n;r=\'\';2Y();V(a){L.W(\'1G\',\'1S\')}Y{L.W(\'3j\',2).3k().3Z({2p:0,3f:\'80%\',1w:\'10%\',1r:\'10%\'},S.3N,1b(){L.W(\'1G\',\'1S\')})}K.3k().W(\'3f\',\'2M%\').W(\'1w\',\'1D\').W(\'1r\',\'1D\').W(\'1G\',\'2x\').W(\'2p\',1).W(\'3j\',1);t=\'1z\';S.4G.1Q(l.1A(0),t)}1b 2e(a){V(t==\'2C\')1n;r=\'\';2X();L.3k().W(\'1G\',\'2x\').W(\'3f\',\'80%\').W(\'1w\',\'10%\').W(\'1r\',\'10%\').W(\'2p\',0).W(\'3j\',1);V(a){L.W(\'2p\',1).W(\'3f\',\'2M%\').W(\'1w\',\'1D\').W(\'1r\',\'1D\')}Y{L.3Z({2p:1,3f:\'2M%\',1w:\'1D\',1r:\'1D\'})}t=\'2C\';S.4G.1Q(l.1A(0),t)}1b 1J(){I.2T();3w(1b(){I.1A(0).5J(0,I.11().2N(S.1h))},1)}1b 1I(){I.2T();3w(1b(){I.1A(0).5J(I.11().2N(S.1h)+1,I.11().3D)},1)}1b 2f(){V(!S.2f||1E())1n;F.33(l.11());F.W(\'1G\',\'3O-2x\');l.W(\'1B\',F.2I()+5+1f(l.W(\'2J-1w\'))+1f(l.W(\'2J-42\'))+\'1C\');F.W(\'1G\',\'1S\')}1b 1d(a){V(a==\'\'){V(S.3Q)1n S.1i?\'0:1o\':\'1o:1o\';Y 1n a}V((22 1g(\'^(-|\\\\+)?([0-9]+)(.([0-9]{1,2})?)?$\',\'i\')).26(a)){X b=1f(1g.$2);X c=1f(1g.$4);V(!c)c=0;X d=S.1i&&S.1v&&1g.$1==\'-\'?1c:17;V(b>=24&&!S.1i)b=b%24;V(c>=60)c=c%60;V(S.1j!=1){X f=Z.2R(c/S.1j);c=f*S.1j+(Z.3L((c-f*S.1j)/S.1j)==1?S.1j:0);V(c>=60)c=0}a=(d?\'-\':\'\')+(b<10&&!S.1i?\'0\':\'\')+b+S.1h+(1g.$3?(c<10?\'0\':\'\')+c:\'1o\')}Y V((22 1g(\'^(-|\\\\+)?.([0-9]{1,2})\')).26(a)){X c=1f(1g.$2);X d=S.1i&&S.1v&&1g.$1==\'-\'?1c:17;V(c>=60)c=c%60;a=(d&&c>0?\'-\':\'\')+\'0\'+(!S.1i?\'0\':\'\')+S.1h+(c<10?\'0\':\'\')+c}Y{a=\'0\'+(!S.1i?\'0\':\'\')+S.1h+\'1o\'}1n(S.1i&&S.5D&&!a.2t(/^\\-/)&&!a.2t(/^0+:1o$/)?\'+\':\'\')+a}1b 4I(a){a.1V().3l(\'.1u-1t-2f\').4J();a.1V().3l(\'.1u-1t-3B\').4J();a.1V().3l(\'.1u-1t-56\').4J();a.6X();a.1U(\'58.1p 51.1p 4Z.1p 4Y.1p 6e.1p 69.1p 5T.1p 5N.1p 4q.1p\');a.1U(\'4h.1p\');a.1U(\'5w.1p\');a.1U(\'3F.1p\');a.1U(\'4d.1p\');a.1U(\'2T.1p\');V(a.1m(\'1L-2o-1M\')){a.1m(\'2o\',a.1m(\'1L-2o-1M\'));a.2D(\'1L-2o-1M\')}Y a.2D(\'2o\');V(a.1m(\'1L-2n-1M\')){a.1m(\'2n\',a.1m(\'1L-2n-1M\'));a.2D(\'1L-2n-1M\')}Y a.2D(\'2n\');V(a.1m(\'1L-2s-1M\')){a.1m(\'2s\',a.1m(\'1L-2s-1M\'));a.2D(\'1L-2s-1M\')}Y a.2D(\'2s\');V(a.1m(\'1L-2v-1M\')){a.1m(\'2v\',a.1m(\'1L-2v-1M\'));a.2D(\'1L-2v-1M\')}Y a.2D(\'2v\')}1b 5E(a){V(l.4L(":2T"))4k(a)}1b 5A(a){V(1E()){4x();2A(1c);1J()}Y{3w(1b(){V(H.W(\'1G\')==\'1S\')4g(a)},50)}}1b 5M(a){a.3g();a.1O();1n 17}1b 4g(a){5y(a);a.3g();a.3E();a.1O();1n 17}1b 5g(a){V(a.1k==9){1K()}Y V(a.1k==13){1K()}Y V(a.1k==27){I.11(1d(q));1K()}Y V(a.1k==8||a.1k==46){r=\'\';V(!I.11())1n 17;X b=I.11();X c;a.1O();(22 1g(\'^(-|\\\\+)?([0-9]+)(.([0-9]{1,2}))?$\')).26(I.11());X d=S.1i&&S.1v&&1g.$1==\'-\'?1c:17;X h=1f(1g.$2);X m=1g.$4?1f(1g.$4):0;V(t==\'1z\'){V(h==0){c=S.3Q?(!S.1i?\'0\':\'\')+\'0\'+S.1h+\'1o\':\'\'}Y{c=(!S.1i?\'0\':\'\')+\'0\'+S.1h+(m<10?\'0\':\'\')+m}I.11(1d(c));V(!c){1K()}Y{1J()}V(b!=c)S.2i.1Q(l.1A(0),c.1s(/^\\+/,\'\'),b.1s(/^\\+/,\'\'))}Y{V(m==0){V(h==0&&!S.3Q){I.11(\'\');V(b!=\'\')S.2i.1Q(l.1A(0),\'\',b.1s(/^\\+/,\'\'));1K()}Y{2A();1J()}}Y{c=(d?\'-\':\'\')+(h<10&&!S.1i?\'0\':\'\')+h+S.1h+\'1o\';I.11(1d(c));1I();V(b!=c)S.2i.1Q(l.1A(0),c.1s(/^\\+/,\'\'),b.1s(/^\\+/,\'\'))}}2f()}Y V((a.1k==36||a.1k==37)&&I.11()!=\'\'){I.11(1d(I.11()));V(t!=\'1z\'){1J();2A()}Y{a.1O();a.3E()}}Y V((a.1k==35||a.1k==39)&&I.11()!=\'\'){I.11(1d(I.11()));V(S.1j!=60&&t!=\'2C\'){1I();2e()}Y{a.1O();a.3E()}}Y V(a.1k==75||a.1R==S.1h){a.1O();V(I.11().3D==0)I.11(\'0\');I.11(1d(I.11()));V(S.1j!=60){1I();V(t!=\'2C\')2e()}Y{1J()}}Y V(a.1k==38||a.1k==40||a.1k==3I||a.1k==4N||a.1k==4O||(a.4P&&a.1k==49)){a.1O();V(q==\'\')1n;X b=I.11();(22 1g(\'^(-|\\\\+)?([0-9]+)(.([0-9]{1,2}))?$\')).26(I.11());X d=S.1i&&S.1v&&1g.$1==\'-\'?1c:17;X h=1f(1g.$2);V(d)h=-h;X m=1g.$4?1f(1g.$4):0;V(S.1i&&S.1v&&(a.1k==3I||a.1k==4N||a.1k==4O||(a.4P&&a.1k==49))){V(a.1k==3I||a.1k==49){V(h<0)h=-h;d=17}Y{V(h>0)h=-h;d=1c}r=\'\'}Y V(t==\'1z\'){V(a.1k==38||a.1k==3I||a.1k==49){V(S.1i&&S.1v&&h==0&&d)d=17;Y h+=1}Y{V(S.1i&&S.1v&&h==0&&!d)d=1c;Y h-=1}V(h==-1){V(!S.1i)h=23;Y V(!S.1v)h=0}V(h==24&&!S.1i)h=0}Y{V(a.1k==38||a.1k==4N||a.1k==4O)m-=S.1j;Y m+=S.1j;V(m<0)m=60+m;V(m>=60)m=m-60}X c=(h<10&&!S.1i?\'0\':\'\')+(d&&h==0?\'-\'+h:h)+S.1h+(m<10?\'0\':\'\')+m;X e=1c;V(S.19&&!1e(c,S.19))e=17;V(S.1a&&!1e(S.1a,c))e=17;V(!e&&t==\'1z\'){V(a.1k==38)c=1d(S.19);Y c=1d(S.1a);e=1c}V(e){I.11(1d(c));V(c!=b)S.2i.1Q(l.1A(0),c.1s(/^\\+/,\'\'),b.1s(/^\\+/,\'\'));2f();2B();V(t==\'1z\')1J();Y 1I()}}Y{a.1O();a.3E();a.3g();1n 17}}1b 5m(a){V(((a.1k>=48&&a.1k<=57)||(a.1k>=96&&a.1k<=7d))&&!a.4P&&!a.7e&&!a.7f){X b=I.11().1s(/.[0-9]+$/,\'\');X c=I.11().1s(/^(\\+|-)?[0-9]+./,\'\');X d=I.11()[0]==\'-\';X e=I.11();X f;V(r==\'\'){r=a.1R;V(t==\'1z\'){f=1d((d?\'-\':\'\')+(!S.1i?\'0\':\'\')+a.1R+S.1h+c);V(S.19){V(!1e(f,S.19)){f=S.19.3a(0,S.19.2N(\':\'))+S.1h+c;V(!1e(f,S.19)){f=S.19}f=1d(f);g=1c}Y V(!1e((d?\'-\':\'\')+r+\'0\'+S.1h+c,S.19)){g=1c}}V(S.1a){V(!1e(S.1a,f)){f=S.1a.3a(0,S.1a.2N(\':\'))+S.1h+c;V(!1e(S.1a,f)){f=S.1a}f=1d(f);g=1c}Y V(!1e(S.1a,(d?\'-\':\'\')+r+\'0\'+S.1h+c)){g=1c}}I.11(1d(f));X g=(!S.1i&&1f(a.1R)>2)||(S.19&&!1e((d?\'-\':\'\')+1f(a.1R)+\'0:1o\',S.19))||(S.1a&&!1e(S.1a,(d?\'-\':\'\')+1f(a.1R)+\'0:1o\'));V(g){r=\'\';V(S.1j==60){1K()}Y{2e();1I()}}Y{1J()}}Y{V(1f(a.1R)>5){f=1d(b+S.1h+\'0\'+a.1R);V(S.19&&!1e(f,S.19)){f=1d(S.19);I.11(f);r=\'\'}Y V(S.1a&&!1e(S.1a,f)){f=1d(S.1a);I.11(f);r=\'\'}Y{I.11(f);1K()}}Y{f=1d(b+S.1h+a.1R+\'0\');V(S.19&&!1e(f,S.19)){f=1d(S.19);r=\'\'}V(S.1a&&!1e(S.1a,f)){f=1d(S.1a);r=\'\'}I.11(f);1I()}}}Y{V(!S.1i){V(t==\'1z\'){X h=1f(r+a.1R);X i=t==\'1z\'?24:60;V(h==i){r=\'\';f=\'1o\'+S.1h+c;I.11(1d(f));V(S.1j==60){1K()}Y{2e();1I()}}Y V(h>i){r=a.1R;f=\'0\'+r+S.1h+c;I.11(1d(f));1J()}Y{f=r+a.1R+S.1h+c;I.11(1d(f));V(S.1j==60){1K()}Y{2e();1I();r=\'\'}}}Y{f=b+S.1h+r+a.1R;I.11(1d(f));1K()}}Y{V(r==\'0\')r=\'\';V(t==\'2C\'){f=1d(b+S.1h+r+a.1R);V(S.19&&!1e(f,S.19)){f=1d(S.19);I.11(f);r=\'\'}Y V(S.1a&&!1e(S.1a,f)){f=1d(S.1a);I.11(f);r=\'\'}Y{I.11(f);1K()}}Y{r+=a.1R;f=(d?\'-\':\'\')+r+S.1h+c;X g=17;V(S.19){V(!1e(f,S.19)){f=S.19.3a(0,S.19.2N(\':\'))+S.1h+c;V(!1e(f,S.19)){f=S.19}f=1d(f);g=1c}Y V(!1e((d?\'-\':\'\')+r+\'0\'+S.1h+c,S.19)){g=1c}}V(S.1a){V(!1e(S.1a,f)){f=S.1a.3a(0,S.1a.2N(\':\'))+S.1h+c;V(!1e(S.1a,f)){f=S.1a}f=1d(f);g=1c}Y V(!1e(S.1a,(d?\'-\':\'\')+r+\'0\'+S.1h+c)){g=1c}}I.11(1d(f));V(!g){1J()}Y{V(S.1j==60){1K()}Y{2e();1I();r=\'\'}}}}}V(f!=e)S.2i.1Q(l.1A(0),f.1s(/^\\+/,\'\'),e.1s(/^\\+/,\'\'));2f()}2B()}});1b 1E(){X b=17;(1b(a){V(/(7g|bb\\d+|7h).+3C|7i|7j\\/|7k|7l|7m|7n|7o|7p|7q|5W(7s|5X)|5Y|7v|7w |7x|7y|7z|3C.+7A|7B|5Z m(7D|3v)i|7E( 62)?|7G|p(7H|7I)\\/|7J|7K|7L|7M(4|6)0|7N|7O|63\\.(7Q|7R)|7S|7T|7U ce|7V|7W/i.26(a)||/7X|7Y|7Z|82|84|50[1-6]i|86|87|a 64|89|ac(66|67|s\\-)|ai(8d|8e)|al(av|ca|co)|8i|an(8j|4Q|8l)|8m|ar(ch|4R)|as(4S|8q)|8r|au(8s|\\-m|r |s )|8t|be(ck|6c|8x)|bi(8z|8A)|bl(ac|az)|br(e|v)w|8B|bw\\-(n|u)|8C\\/|8D|8E|8F\\-|8G|8H|8I|8J\\-|co(8K|6d)|8M|8N(4T|6c|8P)|8Q|8R\\-s|8S|8T|8U|6f(c|p)o|8W(12|\\-d)|8X(49|ai)|8Y(8Z|91)|66(92|93)|94|95([4-7]0|62|64|99)|9a|9b(\\-|6g)|6h u|9e|9f|9g\\-5|g\\-4U|4R(\\.w|5X)|9i(ad|9j)|9k|9l|9m\\-(m|p|t)|9n\\-|9o(6j|6k)|9r( i|5W)|9s\\-c|9t(c(\\-| |6g|a|g|p|s|t)|9u)|9v(aw|9w)|i\\-(20|4R|4V)|9y|9z( |\\-|\\/)|9A|9B|9C|9D|9E|9F|9G|5Y|9H(t|v)a|9I|9J|9K|9L|9M|9N( |\\/)|9O|9P |9Q\\-|9R(c|k)|9S(6m|9U)|9V( g|\\/(k|l|u)|50|54|\\-[a-w])|9W|9X|9Y\\-w|9Z|a0\\/|4V(4S|a1|a2)|6n(3t|21|ca)|m\\-cr|a6(a7|6p)|a9(aa|ab|6q)|af|4U(3t|ag|bi|ah|6f|t(\\-| |o|v)|aj)|ak(50|am|v )|ao|ap|aq[0-2]|at[2-3]|ax(0|2)|aA(0|2|5)|aB(0(0|1)|10)|aC((c|m)\\-|1x|aD|aE|aF|aG)|aH(6|i)|aI|aJ|aK(aL|aM)|aN|aO|aP|aQ(a|d|t)|aR|aS(13|\\-([1-8]|c))|aT|aU|6r(ay|aW)|aX\\-2|aY(ck|aZ|6s)|b1|b2|6j\\-g|b4\\-a|b5(b6|12|21|32|60|\\-[2-7]|i\\-)|b7|b8|b9|ba|bc|bd(bf|bg)|bh\\/|bj(bk|4V|bm|bn|4Q|bo)|bp(3t|h\\-|67|p\\-)|bq\\/|6s(c(\\-|0|1)|47|6n|6d|6p)|bs\\-|bt|bu(\\-|m)|bv\\-0|bx(45|by)|bz(al|ar|b3|4T|bA)|bB(bC|4Q)|bD(3t|h\\-|v\\-|v )|bE(3t|bF)|bG(18|50)|bH(1o|10|18)|6k(bI|bJ)|bK\\-|bL\\-|bM(i|m)|bN\\-|t\\-4U|2O(6r|bO)|6q(70|m\\-|bQ|bR)|bS\\-9|63(\\.b|6h|bT)|bU|bV|bW|bX|bY(bZ|4S)|c0(40|5[0-3]|\\-v)|c1|c2|c3|c4(52|53|60|61|70|80|81|83|85|98)|c5(\\-| )|c6|c7|c8(g |c9|cb)|cc|cd|cf|cg\\-|ci|cj|cl\\-/i.26(a.cm(0,4)))b=1c})(2y.cn||2y.cp||2c.5Z);1n b}1b 1e(a,b,c){X d=\'^(-|\\\\+)?([0-9]+)(.([0-9]{1,2}))?$\';(22 1g(d,\'i\')).26(a);X e=1f(1g.$2)*60;V(1g.$4&&!c)e+=1f(1g.$4);V(1g.$1==\'-\')e*=-1;(22 1g(d,\'i\')).26(b);X f=1f(1g.$2)*60;V(1g.$4&&!c)f+=1f(1g.$4);V(1g.$1==\'-\')f*=-1;V(e<=f)1n 1c;Y 1n 17}1b 5K(){S.1j=1f(S.1j);S.3N=1f(S.3N);S.3V=1f(S.3V);S.1H.2q=1f(S.1H.2q);S.1H.2Z=1f(S.1H.2Z);S.1H.3U=1f(S.1H.3U);V(S.1j!=1&&S.1j!=5&&S.1j!=10&&S.1j!=15&&S.1j!=30&&S.1j!=60){2E.6t(\'%c[2z-1u-1t] 3u 1j 6u: \'+S.1j+\'! ct 3x 2O be 1, 5, 10, 15, 30 cv 60. 6w 6x, 3W 1j 3x 6y 4X 6A 2O: 1\',\'2a:3c\');S.1j=1}V(!S.1h||(\'\'+S.1h).2t(/[0-9]+/)){2E.6t(\'%c[2z-1u-1t] 3u 1h 6u: \'+(S.1h?S.1h:\'(6C)\')+\'! cD 1h cE be 6C cF cG 4T cH cI cJ. 6w 6x, 3W 1h 3x 6y 4X 6A 2O a cK (:).\',\'2a:3c\');S.1h=\':\'}V(S.1v&&!S.1i){2E.3b(\'%c[2z-1u-1t] 1v 4L 4X 2O 1c, cL 1F 3x 6m cM cN 1i 4L 17!\',\'2a:3c\')}V(S.19&&!S.19.2t(/^-?[0-9]+:[0-9]{2}$/)){2E.3b(\'%c[2z-1u-1t] 3u 6D 6E 2V 3H "19": \'+S.19+\'! cQ 6F 5l...\',\'2a:3c\');S.19=3i}V(S.1a&&!S.1a.2t(/^-?[0-9]+:[0-9]{2}$/)){2E.3b(\'%c[2z-1u-1t] 3u 6D 6E 2V 3H "1a": \'+S.1a+\'! cT 6F 5l...\',\'2a:3c\');S.1a=3i}V(S.1a&&S.19&&(S.1a==S.19||!1e(S.1a,S.19))){2E.3b(\'%c[2z-1u-1t] cU "1a" cV be cW cX 3W 3H "19"!\',\'2a:3c\');S.1a=3i}}}}(72));',62,805,'|||||||||||||||||||||||||||||||||||||||||||||||||||||||||if|css|var|else|Math||val||||||false||maximum|minimum|function|true|formatTime|isTimeSmallerOrEquals|parseInt|RegExp|separator|duration|precision|keyCode|colors|attr|return|00|clockTimePicker|PI|top|replace|timepicker|clock|durationNegative|left|on|fillStyle|HOUR|get|width|px|0px|isMobile|this|display|fonts|selectMinuteOnInputElement|selectHourOnInputElement|hideTimePicker|data|orig|newVal|preventDefault|afternoonHoursInOuterCircle|call|key|none|beginPath|off|parent|vibrate|sin|offset|cos|||new||||test||||color|font|window||switchToMinuteMode|autosize|arc|height|onAdjust|fill|append|position|document|autocorrect|autocomplete|opacity|clockOuterCircleFontSize|margin|autocapitalize|match|outerHeight|spellcheck|click|block|navigator|jquery|switchToHourMode|repaintClock|MINUTE|removeAttr|console|processTimeSelection|selectorColor|class|outerWidth|padding|prop|input|100|indexOf|to|measureText|selectorNumberColor|floor|pow|focus|div|for|abs|repaintClockMinuteCanvas|repaintClockHourCanvas|clockInnerCircleFontSize||fillText||html|text||||||substring|log|orange|255|innerWidth|zoom|stopImmediatePropagation|touchmove|null|zIndex|stop|find|canvas|10px|pageY|strokeStyle|pageX|stroke|absolute|01|Invalid|in|setTimeout|has|style|touches|originalEvent|background|mobile|length|stopPropagation|keydown|onlyShowClockOnMobile|option|107|visibility|marginTop|round|300|modeSwitchSpeed|inline|0797FF|required|hideUnselectableNumbers|lineWidth|innerHeight|buttonFontSize|popupWidthOnDesktop|the|fontFamily|lineTo|animate||rgba|right|clockOuterCircleTextColor|moveTo||||||FFFFFF|i18n|registerDraggingEventsOnCanvas|mousewheel|signButtonBackgroundColor|signButtonColor|onInputElementMouseDown|mousedown|sqrt|onWindowClick|processMouseWheelEvent|onPopupClick|onPopupTouchMove|adjustMobilePopupDimensionAndPosition|40px|ltr|contextmenu|hoverCircleColor|clockOuterCircleUnselectableTextColor|hidden|border|clockInnerCircleTextColor|default|showTimePicker|cursor|clockFaceColor|onBackgroundClick|onBackgroundTouchMove|backgroundColor|repaintSignButton|family|size|onModeSwitch|25px|disposeTimePicker|remove|_data|is|appendChild|109|189|shiftKey|ny|go|te|it|mo|ma|head|set|dragenter|dragover||dragend||||popupHeaderTextColor|popup||drag||popupHeaderBackgroundColor|buttonTextColor|center|blurAll|target|fixed|onInputElementKeyDown|30px|min|line|weight|used|onInputElementKeyUp|okButton|cancelButton|relative|getContext|clearRect|visible|500|align|onClose|keyup|onOpen|processClick|200|onInputElementFocus|bottom|readonly|useDurationPlusSign|onInputElementMouseWheel|red|typeof|createEvent|hasClass|setSelectionRange|validateSettings|popupBackgroundColor|onInputElementDragSelectContextMenu|selectstart|parseFloat|styleSheet|type|createElement|Arial|drop|CCCCCC|white|ip|od|iris|opera|||os|up|wa||er|oo|radius|dragleave|clockInnerCircleUnselectableTextColor|selection|ll|nd|dragstart|do|_|g1|20px|pt|ta|start|no|mc|each|ri|ts|pl|se|error|specified|rtl|For|now|been|end|back|cssAlreadyInitialized|empty|time|format|not|onChange|value|scrollTop|object|Cancel|HTMLEvents|initEvent|change|dispatchEvent|createEventObject|eventType|fireEvent|onchange|addEventListener|hour|orientationchange|DDDDDD|unwrap|minute|EEEEEE||hasOwnProperty|jQuery|15px|justify|190|moz|99998|decoration|first|offsetX|wrap|event|105|ctrlKey|altKey|android|meego|avantgo|bada|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|max|hone|wheelDelta|detail|kindle|lge|maemo|midp|mmp|firefox|netfront|contains|ob|palm|trigger|phone|ixi|re|plucker|pocket|psp|series|symbian|treo|activeElement|browser|link|vodafone|wap|windows|xda|xiino|1207|6310|6590|||3gso||4thp||770s|802s|parents|abac|360|atan|outline|ko|rn|removeChild|fontSize|string|amoi|ex|caret|yw|aptu|textAlign|000000|passed|us|attw|di|avan|cssText|mouseup|useAmPm|nq|createTextNode|lb|rd|bumb|c55|capi|ccwa|cdm|cell|chtm|cldc|cmd|mp|getElementsByTagName|craw|da|Before|ng|dbte|dc|devi|dica|dmob|calling|ds|el|em|l2||ul|ic|k0|esl8|ez||please||ze|fetc|fly|initialize|99999|g560|gene|gf|888888|gr|un|haie|hcit|hd|hei|hi|ClockTimePicker|box|hp|hs|ht|tp|hu|tc|shadow|i230|iac|ibro|idea|ig01|ikom|im1k|inno|ipaq|ja|jbro|jemu|jigs|kddi|keji|kgt|klon|kpt|kwc|kyo|le|4px|xi|lg|libw|lynx|m1|m3ga|m50|ui|xo|mousemove|mouseleave|OK|me|rc|toLowerCase|mi|o8|oa|||dispose|mmef|02|de||zz|mt||p1||mwbp|mywa|n10|||n20||||n30|||n50|n7|ne|tf|wf|wg|wt|nok|nzph|o2im|op|ti|wv|oran|owg1|p800|pan|pdxg|pg|phil|pire|touchstart|uc|pn|po|rt|5px|prox|psio||qa|qc|07|qtek|r380|r600|raks||rim9|ro||ve|zo|s55||sa|ge||mm|ms|va|sc|sdk||sgh|shar|sie|sk||sl|id|sm|t5|so|ft|sp|sy|mb|t2|t6|gt|lk|tcl|tdg|tel|tim|sh|overflow|m3|m5|tx|si|utst|v400|v750|veri|vi|rg|vk|vm40|voda|vulc|vx|w3c|webc|whit|wi|nc||nw|wmlb|wonu||x700|yas||your|zeto||zte|substr|userAgent||vendor|continue||05|Precision|touchend|or|400|200px|extend|fn|user|select|static|The|cannot|nor|can|contain|any|decimals|colon|but|effect|because|auto|body|Maximum|clientWidth|direction|Minimum|Option|must|smaller|than|230px'.split('|'),0,{}))
;
/*
Turbolinks 5.0.0
Copyright © 2016 Basecamp, LLC
 */

(function(){(function(){(function(){this.Turbolinks={supported:function(){return null!=window.history.pushState&&null!=window.requestAnimationFrame}(),visit:function(e,r){return t.controller.visit(e,r)},clearCache:function(){return t.controller.clearCache()}}}).call(this)}).call(this);var t=this.Turbolinks;(function(){(function(){var e,r;t.copyObject=function(t){var e,r,n;r={};for(e in t)n=t[e],r[e]=n;return r},t.closest=function(t,r){return e.call(t,r)},e=function(){var t,e;return t=document.documentElement,null!=(e=t.closest)?e:function(t){var e;for(e=this;e;){if(e.nodeType===Node.ELEMENT_NODE&&r.call(e,t))return e;e=e.parentNode}}}(),t.defer=function(t){return setTimeout(t,1)},t.dispatch=function(t,e){var r,n,o,i,s;return i=null!=e?e:{},s=i.target,r=i.cancelable,n=i.data,o=document.createEvent("Events"),o.initEvent(t,!0,r===!0),o.data=null!=n?n:{},(null!=s?s:document).dispatchEvent(o),o},t.match=function(t,e){return r.call(t,e)},r=function(){var t,e,r,n;return t=document.documentElement,null!=(e=null!=(r=null!=(n=t.matchesSelector)?n:t.webkitMatchesSelector)?r:t.msMatchesSelector)?e:t.mozMatchesSelector}(),t.uuid=function(){var t,e,r;for(r="",t=e=1;36>=e;t=++e)r+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return r}}).call(this),function(){t.Location=function(){function t(t){var e,r;null==t&&(t=""),r=document.createElement("a"),r.href=t.toString(),this.absoluteURL=r.href,e=r.hash.length,2>e?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=r.hash.slice(1))}var e,r,n,o;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.absoluteURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t,e;return null!=(t=null!=(e=this.getLastPathComponent().match(/\.[^.]*$/))?e[0]:void 0)?t:""},t.prototype.isHTML=function(){return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)},t.prototype.isPrefixedBy=function(t){var e;return e=r(t),this.isEqualTo(t)||o(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},r=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return n(t,"/")?t:t+"/"},o=function(t,e){return t.slice(0,e.length)===e},n=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.HttpRequest=function(){function r(r,n,o){this.delegate=r,this.requestCanceled=e(this.requestCanceled,this),this.requestTimedOut=e(this.requestTimedOut,this),this.requestFailed=e(this.requestFailed,this),this.requestLoaded=e(this.requestLoaded,this),this.requestProgressed=e(this.requestProgressed,this),this.url=t.Location.wrap(n).requestURL,this.referrer=t.Location.wrap(o).absoluteURL,this.createXHR()}return r.NETWORK_FAILURE=0,r.TIMEOUT_FAILURE=-1,r.timeout=60,r.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},r.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},r.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},r.prototype.requestLoaded=function(){return this.endRequest(function(t){return function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}}(this))},r.prototype.requestFailed=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}}(this))},r.prototype.requestTimedOut=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}}(this))},r.prototype.requestCanceled=function(){return this.endRequest()},r.prototype.notifyApplicationBeforeRequestStart=function(){return t.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},r.prototype.notifyApplicationAfterRequestEnd=function(){return t.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},r.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},r.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},r.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},r.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ProgressBar=function(){function t(){this.trickle=e(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var r;return r=300,t.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width "+r+"ms ease-out, opacity "+r/2+"ms "+r/2+"ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",t.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},t.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement(function(t){return function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}}(this))):void 0},t.prototype.setValue=function(t){return this.value=t,this.refresh()},t.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},t.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},t.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,1.5*r)},t.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},t.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,r)},t.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},t.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},t.prototype.refresh=function(){return requestAnimationFrame(function(t){return function(){return t.progressElement.style.width=10+90*t.value+"%"}}(this))},t.prototype.createStylesheetElement=function(){var t;return t=document.createElement("style"),t.type="text/css",t.textContent=this.constructor.defaultCSS,t},t.prototype.createProgressElement=function(){var t;return t=document.createElement("div"),t.className="turbolinks-progress-bar",t},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.BrowserAdapter=function(){function r(r){this.controller=r,this.showProgressBar=e(this.showProgressBar,this),this.progressBar=new t.ProgressBar}var n,o,i,s;return s=t.HttpRequest,n=s.NETWORK_FAILURE,i=s.TIMEOUT_FAILURE,o=500,r.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},r.prototype.visitStarted=function(t){return t.issueRequest(),t.changeHistory(),t.loadCachedSnapshot()},r.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},r.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},r.prototype.visitRequestCompleted=function(t){return t.loadResponse()},r.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case n:case i:return this.reload();default:return t.loadResponse()}},r.prototype.visitRequestFinished=function(t){return this.hideProgressBar()},r.prototype.visitCompleted=function(t){return t.followRedirect()},r.prototype.pageInvalidated=function(){return this.reload()},r.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,o)},r.prototype.showProgressBar=function(){return this.progressBar.show()},r.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},r.prototype.reload=function(){return window.location.reload()},r}()}.call(this),function(){var e,r=function(t,e){return function(){return t.apply(e,arguments)}};e=!1,addEventListener("load",function(){return t.defer(function(){return e=!0})},!1),t.History=function(){function n(t){this.delegate=t,this.onPopState=r(this.onPopState,this)}return n.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),this.started=!0)},n.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),this.started=!1):void 0},n.prototype.push=function(e,r){return e=t.Location.wrap(e),this.update("push",e,r)},n.prototype.replace=function(e,r){return e=t.Location.wrap(e),this.update("replace",e,r)},n.prototype.onPopState=function(e){var r,n,o,i;return this.shouldHandlePopState()&&(i=null!=(n=e.state)?n.turbolinks:void 0)?(r=t.Location.wrap(window.location),o=i.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(r,o)):void 0},n.prototype.shouldHandlePopState=function(){return e===!0},n.prototype.update=function(t,e,r){var n;return n={turbolinks:{restorationIdentifier:r}},history[t+"State"](n,null,e)},n}()}.call(this),function(){t.Snapshot=function(){function e(t){var e,r;r=t.head,e=t.body,this.head=null!=r?r:document.createElement("head"),this.body=null!=e?e:document.createElement("body")}return e.wrap=function(t){return t instanceof this?t:this.fromHTML(t)},e.fromHTML=function(t){var e;return e=document.createElement("html"),e.innerHTML=t,this.fromElement(e)},e.fromElement=function(t){return new this({head:t.querySelector("head"),body:t.querySelector("body")})},e.prototype.clone=function(){return new e({head:this.head.cloneNode(!0),body:this.body.cloneNode(!0)})},e.prototype.getRootLocation=function(){var e,r;return r=null!=(e=this.getSetting("root"))?e:"/",new t.Location(r)},e.prototype.getCacheControlValue=function(){return this.getSetting("cache-control")},e.prototype.hasAnchor=function(t){try{return null!=this.body.querySelector("[id='"+t+"']")}catch(e){}},e.prototype.isPreviewable=function(){return"no-preview"!==this.getCacheControlValue()},e.prototype.isCacheable=function(){return"no-cache"!==this.getCacheControlValue()},e.prototype.getSetting=function(t){var e,r;return r=this.head.querySelectorAll("meta[name='turbolinks-"+t+"']"),e=r[r.length-1],null!=e?e.getAttribute("content"):void 0},e}()}.call(this),function(){var e=[].slice;t.Renderer=function(){function t(){}var r;return t.render=function(){var t,r,n,o;return n=arguments[0],r=arguments[1],t=3<=arguments.length?e.call(arguments,2):[],o=function(t,e,r){r.prototype=t.prototype;var n=new r,o=t.apply(n,e);return Object(o)===o?o:n}(this,t,function(){}),o.delegate=n,o.render(r),o},t.prototype.renderView=function(t){return this.delegate.viewWillRender(this.newBody),t(),this.delegate.viewRendered(this.newBody)},t.prototype.invalidateView=function(){return this.delegate.viewInvalidated()},t.prototype.createScriptElement=function(t){var e;return"false"===t.getAttribute("data-turbolinks-eval")?t:(e=document.createElement("script"),e.textContent=t.textContent,r(e,t),e)},r=function(t,e){var r,n,o,i,s,a,u;for(i=e.attributes,a=[],r=0,n=i.length;n>r;r++)s=i[r],o=s.name,u=s.value,a.push(t.setAttribute(o,u));return a},t}()}.call(this),function(){t.HeadDetails=function(){function t(t){var e,r,i,s,a,u,c;for(this.element=t,this.elements={},c=this.element.childNodes,s=0,u=c.length;u>s;s++)i=c[s],i.nodeType===Node.ELEMENT_NODE&&(a=i.outerHTML,r=null!=(e=this.elements)[a]?e[a]:e[a]={type:o(i),tracked:n(i),elements:[]},r.elements.push(i))}var e,r,n,o;return t.prototype.hasElementWithKey=function(t){return t in this.elements},t.prototype.getTrackedElementSignature=function(){var t,e;return function(){var r,n;r=this.elements,n=[];for(t in r)e=r[t].tracked,e&&n.push(t);return n}.call(this).join("")},t.prototype.getScriptElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("script",t)},t.prototype.getStylesheetElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("stylesheet",t)},t.prototype.getElementsMatchingTypeNotInDetails=function(t,e){var r,n,o,i,s,a;o=this.elements,s=[];for(n in o)i=o[n],a=i.type,r=i.elements,a!==t||e.hasElementWithKey(n)||s.push(r[0]);return s},t.prototype.getProvisionalElements=function(){var t,e,r,n,o,i,s;r=[],n=this.elements;for(e in n)o=n[e],s=o.type,i=o.tracked,t=o.elements,null!=s||i?t.length>1&&r.push.apply(r,t.slice(1)):r.push.apply(r,t);return r},o=function(t){return e(t)?"script":r(t)?"stylesheet":void 0},n=function(t){return"reload"===t.getAttribute("data-turbolinks-track")},e=function(t){var e;return e=t.tagName.toLowerCase(),"script"===e},r=function(t){var e;return e=t.tagName.toLowerCase(),"style"===e||"link"===e&&"stylesheet"===t.getAttribute("rel")},t}()}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.SnapshotRenderer=function(r){function n(e,r){this.currentSnapshot=e,this.newSnapshot=r,this.currentHeadDetails=new t.HeadDetails(this.currentSnapshot.head),this.newHeadDetails=new t.HeadDetails(this.newSnapshot.head),this.newBody=this.newSnapshot.body}return e(n,r),n.prototype.render=function(t){return this.trackedElementsAreIdentical()?(this.mergeHead(),this.renderView(function(e){return function(){return e.replaceBody(),e.focusFirstAutofocusableElement(),t()}}(this))):this.invalidateView()},n.prototype.mergeHead=function(){return this.copyNewHeadStylesheetElements(),this.copyNewHeadScriptElements(),this.removeCurrentHeadProvisionalElements(),this.copyNewHeadProvisionalElements()},n.prototype.replaceBody=function(){return this.activateBodyScriptElements(),this.importBodyPermanentElements(),this.assignNewBody()},n.prototype.trackedElementsAreIdentical=function(){return this.currentHeadDetails.getTrackedElementSignature()===this.newHeadDetails.getTrackedElementSignature()},n.prototype.copyNewHeadStylesheetElements=function(){var t,e,r,n,o;for(n=this.getNewHeadStylesheetElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.copyNewHeadScriptElements=function(){var t,e,r,n,o;for(n=this.getNewHeadScriptElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(this.createScriptElement(t)));return o},n.prototype.removeCurrentHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getCurrentHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.removeChild(t));return o},n.prototype.copyNewHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getNewHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.importBodyPermanentElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyPermanentElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],(t=this.findCurrentBodyPermanentElement(o))?i.push(o.parentNode.replaceChild(t,o)):i.push(void 0);return i},n.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},n.prototype.assignNewBody=function(){return document.body=this.newBody},n.prototype.focusFirstAutofocusableElement=function(){var t;return null!=(t=this.findFirstAutofocusableElement())?t.focus():void 0},n.prototype.getNewHeadStylesheetElements=function(){return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)},n.prototype.getNewHeadScriptElements=function(){return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)},n.prototype.getCurrentHeadProvisionalElements=function(){return this.currentHeadDetails.getProvisionalElements()},n.prototype.getNewHeadProvisionalElements=function(){return this.newHeadDetails.getProvisionalElements()},n.prototype.getNewBodyPermanentElements=function(){return this.newBody.querySelectorAll("[id][data-turbolinks-permanent]")},n.prototype.findCurrentBodyPermanentElement=function(t){return document.body.querySelector("#"+t.id+"[data-turbolinks-permanent]")},n.prototype.getNewBodyScriptElements=function(){return this.newBody.querySelectorAll("script")},n.prototype.findFirstAutofocusableElement=function(){return document.body.querySelector("[autofocus]")},n}(t.Renderer)}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.ErrorRenderer=function(t){function r(t){this.html=t}return e(r,t),r.prototype.render=function(t){return this.renderView(function(e){return function(){return e.replaceDocumentHTML(),e.activateBodyScriptElements(),t()}}(this))},r.prototype.replaceDocumentHTML=function(){return document.documentElement.innerHTML=this.html},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.getScriptElements=function(){return document.documentElement.querySelectorAll("script")},r}(t.Renderer)}.call(this),function(){t.View=function(){function e(t){this.delegate=t,this.element=document.documentElement}return e.prototype.getRootLocation=function(){return this.getSnapshot().getRootLocation()},e.prototype.getSnapshot=function(){return t.Snapshot.fromElement(this.element)},e.prototype.render=function(t,e){var r,n,o;return o=t.snapshot,r=t.error,n=t.isPreview,this.markAsPreview(n),null!=o?this.renderSnapshot(o,e):this.renderError(r,e)},e.prototype.markAsPreview=function(t){return t?this.element.setAttribute("data-turbolinks-preview",""):this.element.removeAttribute("data-turbolinks-preview")},e.prototype.renderSnapshot=function(e,r){return t.SnapshotRenderer.render(this.delegate,r,this.getSnapshot(),t.Snapshot.wrap(e))},e.prototype.renderError=function(e,r){return t.ErrorRenderer.render(this.delegate,r,e)},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ScrollManager=function(){function t(t){this.delegate=t,this.onScroll=e(this.onScroll,this)}return t.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},t.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},t.prototype.scrollToElement=function(t){return t.scrollIntoView()},t.prototype.scrollToPosition=function(t){var e,r;return e=t.x,r=t.y,window.scrollTo(e,r)},t.prototype.onScroll=function(t){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},t.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},t}()}.call(this),function(){t.SnapshotCache=function(){function e(t){this.size=t,this.keys=[],this.snapshots={}}var r;return e.prototype.has=function(t){var e;return e=r(t),e in this.snapshots},e.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},e.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},e.prototype.read=function(t){var e;return e=r(t),this.snapshots[e]},e.prototype.write=function(t,e){var n;return n=r(t),this.snapshots[n]=e},e.prototype.touch=function(t){var e,n;return n=r(t),e=this.keys.indexOf(n),e>-1&&this.keys.splice(e,1),this.keys.unshift(n),this.trim()},e.prototype.trim=function(){var t,e,r,n,o;for(n=this.keys.splice(this.size),o=[],t=0,r=n.length;r>t;t++)e=n[t],o.push(delete this.snapshots[e]);return o},r=function(e){return t.Location.wrap(e).toCacheKey()},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Visit=function(){function r(r,n,o){this.controller=r,this.action=o,this.performScroll=e(this.performScroll,this),this.identifier=t.uuid(),this.location=t.Location.wrap(n),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var n;return r.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},r.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},r.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},r.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},r.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=n(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},r.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new t.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},r.prototype.getCachedSnapshot=function(){var t;return!(t=this.controller.getCachedSnapshotForLocation(this.location))||null!=this.location.anchor&&!t.hasAnchor(this.location.anchor)||"restore"!==this.action&&!t.isPreviewable()?void 0:t},r.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},r.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var r;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(r=this.adapter).visitRendered&&r.visitRendered(this),t?void 0:this.complete()})):void 0},r.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({error:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},r.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},r.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},r.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},r.prototype.requestCompletedWithResponse=function(e,r){return this.response=e,null!=r&&(this.redirectedToLocation=t.Location.wrap(r)),this.adapter.visitRequestCompleted(this)},r.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},r.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},r.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},r.prototype.scrollToRestoredPosition=function(){var t,e;return t=null!=(e=this.restorationData)?e.scrollPosition:void 0,null!=t?(this.controller.scrollToPosition(t),!0):void 0},r.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},r.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},r.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},r.prototype.getTimingMetrics=function(){return t.copyObject(this.timingMetrics)},n=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},r.prototype.shouldIssueRequest=function(){return"restore"===this.action?!this.hasCachedSnapshot():!0},r.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},r.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame(function(e){return function(){return e.frame=null,t.call(e)}}(this))},r.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Controller=function(){function r(){this.clickBubbled=e(this.clickBubbled,this),this.clickCaptured=e(this.clickCaptured,this),this.pageLoaded=e(this.pageLoaded,this),this.history=new t.History(this),this.view=new t.View(this),this.scrollManager=new t.ScrollManager(this),this.restorationData={},this.clearCache()}return r.prototype.start=function(){return t.supported&&!this.started?(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0):void 0},r.prototype.disable=function(){return this.enabled=!1},r.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},r.prototype.clearCache=function(){return this.cache=new t.SnapshotCache(10)},r.prototype.visit=function(e,r){var n,o;return null==r&&(r={}),e=t.Location.wrap(e),this.applicationAllowsVisitingLocation(e)?this.locationIsVisitable(e)?(n=null!=(o=r.action)?o:"advance",this.adapter.visitProposedToLocationWithAction(e,n)):window.location=e:void 0},r.prototype.startVisitToLocationWithAction=function(e,r,n){var o;return t.supported?(o=this.getRestorationDataForIdentifier(n),this.startVisit(e,r,{restorationData:o})):window.location=e},r.prototype.startHistory=function(){return this.location=t.Location.wrap(window.location),this.restorationIdentifier=t.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.stopHistory=function(){return this.history.stop()},r.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.push(this.location,this.restorationIdentifier)},r.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.historyPoppedToLocationWithRestorationIdentifier=function(e,r){var n;return this.restorationIdentifier=r,this.enabled?(n=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(e,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:n,historyChanged:!0}),this.location=t.Location.wrap(e)):this.adapter.pageInvalidated()},r.prototype.getCachedSnapshotForLocation=function(t){var e;return e=this.cache.get(t),e?e.clone():void 0},r.prototype.shouldCacheSnapshot=function(){return this.view.getSnapshot().isCacheable()},r.prototype.cacheSnapshot=function(){var t;return this.shouldCacheSnapshot()?(this.notifyApplicationBeforeCachingSnapshot(),t=this.view.getSnapshot(),this.cache.put(this.lastRenderedLocation,t.clone())):void 0},r.prototype.scrollToAnchor=function(t){var e;return(e=document.getElementById(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},r.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},r.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},r.prototype.scrollPositionChanged=function(t){var e;return e=this.getCurrentRestorationData(),e.scrollPosition=t},r.prototype.render=function(t,e){return this.view.render(t,e)},r.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},r.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},r.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},r.prototype.pageLoaded=function(){return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},r.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},r.prototype.clickBubbled=function(t){var e,r,n;return this.enabled&&this.clickEventIsSignificant(t)&&(r=this.getVisitableLinkForNode(t.target))&&(n=this.getVisitableLocationForLink(r))&&this.applicationAllowsFollowingLinkToLocation(r,n)?(t.preventDefault(),e=this.getActionForLink(r),this.visit(n,{action:e})):void 0},r.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){var r;return r=this.notifyApplicationAfterClickingLinkToLocation(t,e),!r.defaultPrevented},r.prototype.applicationAllowsVisitingLocation=function(t){var e;return e=this.notifyApplicationBeforeVisitingLocation(t),!e.defaultPrevented},r.prototype.notifyApplicationAfterClickingLinkToLocation=function(e,r){return t.dispatch("turbolinks:click",{target:e,data:{url:r.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationBeforeVisitingLocation=function(e){return t.dispatch("turbolinks:before-visit",{data:{url:e.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationAfterVisitingLocation=function(e){return t.dispatch("turbolinks:visit",{data:{url:e.absoluteURL}})},r.prototype.notifyApplicationBeforeCachingSnapshot=function(){return t.dispatch("turbolinks:before-cache")},r.prototype.notifyApplicationBeforeRender=function(e){return t.dispatch("turbolinks:before-render",{data:{newBody:e}})},r.prototype.notifyApplicationAfterRender=function(){return t.dispatch("turbolinks:render")},r.prototype.notifyApplicationAfterPageLoad=function(e){return null==e&&(e={}),t.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:e}})},r.prototype.startVisit=function(t,e,r){var n;return null!=(n=this.currentVisit)&&n.cancel(),this.currentVisit=this.createVisit(t,e,r),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},r.prototype.createVisit=function(e,r,n){
var o,i,s,a,u;return i=null!=n?n:{},a=i.restorationIdentifier,s=i.restorationData,o=i.historyChanged,u=new t.Visit(this,e,r),u.restorationIdentifier=null!=a?a:t.uuid(),u.restorationData=t.copyObject(s),u.historyChanged=o,u.referrer=this.location,u},r.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},r.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},r.prototype.getVisitableLinkForNode=function(e){return this.nodeIsVisitable(e)?t.closest(e,"a[href]:not([target])"):void 0},r.prototype.getVisitableLocationForLink=function(e){var r;return r=new t.Location(e.getAttribute("href")),this.locationIsVisitable(r)?r:void 0},r.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},r.prototype.nodeIsVisitable=function(e){var r;return(r=t.closest(e,"[data-turbolinks]"))?"false"!==r.getAttribute("data-turbolinks"):!0},r.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.view.getRootLocation())&&t.isHTML()},r.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},r.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},r}()}.call(this),function(){var e,r,n;t.start=function(){return r()?(null==t.controller&&(t.controller=e()),t.controller.start()):void 0},r=function(){return null==window.Turbolinks&&(window.Turbolinks=t),n()},e=function(){var e;return e=new t.Controller,e.adapter=new t.BrowserAdapter(e),e},n=function(){return window.Turbolinks===t},n()&&t.start()}.call(this)}).call(this),"object"==typeof module&&module.exports?module.exports=t:"function"==typeof define&&define.amd&&define(t)}).call(this);
(function() {
  (function() {
    (function() {
      var slice = [].slice;

      this.ActionCable = {
        INTERNAL: {
          "message_types": {
            "welcome": "welcome",
            "ping": "ping",
            "confirmation": "confirm_subscription",
            "rejection": "reject_subscription"
          },
          "default_mount_path": "/cable",
          "protocols": ["actioncable-v1-json", "actioncable-unsupported"]
        },
        createConsumer: function(url) {
          var ref;
          if (url == null) {
            url = (ref = this.getConfig("url")) != null ? ref : this.INTERNAL.default_mount_path;
          }
          return new ActionCable.Consumer(this.createWebSocketURL(url));
        },
        getConfig: function(name) {
          var element;
          element = document.head.querySelector("meta[name='action-cable-" + name + "']");
          return element != null ? element.getAttribute("content") : void 0;
        },
        createWebSocketURL: function(url) {
          var a;
          if (url && !/^wss?:/i.test(url)) {
            a = document.createElement("a");
            a.href = url;
            a.href = a.href;
            a.protocol = a.protocol.replace("http", "ws");
            return a.href;
          } else {
            return url;
          }
        },
        startDebugging: function() {
          return this.debugging = true;
        },
        stopDebugging: function() {
          return this.debugging = null;
        },
        log: function() {
          var messages;
          messages = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          if (this.debugging) {
            messages.push(Date.now());
            return console.log.apply(console, ["[ActionCable]"].concat(slice.call(messages)));
          }
        }
      };

    }).call(this);
  }).call(this);

  var ActionCable = this.ActionCable;

  (function() {
    (function() {
      var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

      ActionCable.ConnectionMonitor = (function() {
        var clamp, now, secondsSince;

        ConnectionMonitor.pollInterval = {
          min: 3,
          max: 30
        };

        ConnectionMonitor.staleThreshold = 6;

        function ConnectionMonitor(connection) {
          this.connection = connection;
          this.visibilityDidChange = bind(this.visibilityDidChange, this);
          this.reconnectAttempts = 0;
        }

        ConnectionMonitor.prototype.start = function() {
          if (!this.isRunning()) {
            this.startedAt = now();
            delete this.stoppedAt;
            this.startPolling();
            document.addEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor started. pollInterval = " + (this.getPollInterval()) + " ms");
          }
        };

        ConnectionMonitor.prototype.stop = function() {
          if (this.isRunning()) {
            this.stoppedAt = now();
            this.stopPolling();
            document.removeEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor stopped");
          }
        };

        ConnectionMonitor.prototype.isRunning = function() {
          return (this.startedAt != null) && (this.stoppedAt == null);
        };

        ConnectionMonitor.prototype.recordPing = function() {
          return this.pingedAt = now();
        };

        ConnectionMonitor.prototype.recordConnect = function() {
          this.reconnectAttempts = 0;
          this.recordPing();
          delete this.disconnectedAt;
          return ActionCable.log("ConnectionMonitor recorded connect");
        };

        ConnectionMonitor.prototype.recordDisconnect = function() {
          this.disconnectedAt = now();
          return ActionCable.log("ConnectionMonitor recorded disconnect");
        };

        ConnectionMonitor.prototype.startPolling = function() {
          this.stopPolling();
          return this.poll();
        };

        ConnectionMonitor.prototype.stopPolling = function() {
          return clearTimeout(this.pollTimeout);
        };

        ConnectionMonitor.prototype.poll = function() {
          return this.pollTimeout = setTimeout((function(_this) {
            return function() {
              _this.reconnectIfStale();
              return _this.poll();
            };
          })(this), this.getPollInterval());
        };

        ConnectionMonitor.prototype.getPollInterval = function() {
          var interval, max, min, ref;
          ref = this.constructor.pollInterval, min = ref.min, max = ref.max;
          interval = 5 * Math.log(this.reconnectAttempts + 1);
          return Math.round(clamp(interval, min, max) * 1000);
        };

        ConnectionMonitor.prototype.reconnectIfStale = function() {
          if (this.connectionIsStale()) {
            ActionCable.log("ConnectionMonitor detected stale connection. reconnectAttempts = " + this.reconnectAttempts + ", pollInterval = " + (this.getPollInterval()) + " ms, time disconnected = " + (secondsSince(this.disconnectedAt)) + " s, stale threshold = " + this.constructor.staleThreshold + " s");
            this.reconnectAttempts++;
            if (this.disconnectedRecently()) {
              return ActionCable.log("ConnectionMonitor skipping reopening recent disconnect");
            } else {
              ActionCable.log("ConnectionMonitor reopening");
              return this.connection.reopen();
            }
          }
        };

        ConnectionMonitor.prototype.connectionIsStale = function() {
          var ref;
          return secondsSince((ref = this.pingedAt) != null ? ref : this.startedAt) > this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.disconnectedRecently = function() {
          return this.disconnectedAt && secondsSince(this.disconnectedAt) < this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.visibilityDidChange = function() {
          if (document.visibilityState === "visible") {
            return setTimeout((function(_this) {
              return function() {
                if (_this.connectionIsStale() || !_this.connection.isOpen()) {
                  ActionCable.log("ConnectionMonitor reopening stale connection on visibilitychange. visbilityState = " + document.visibilityState);
                  return _this.connection.reopen();
                }
              };
            })(this), 200);
          }
        };

        now = function() {
          return new Date().getTime();
        };

        secondsSince = function(time) {
          return (now() - time) / 1000;
        };

        clamp = function(number, min, max) {
          return Math.max(min, Math.min(max, number));
        };

        return ConnectionMonitor;

      })();

    }).call(this);
    (function() {
      var i, message_types, protocols, ref, supportedProtocols, unsupportedProtocol,
        slice = [].slice,
        bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

      ref = ActionCable.INTERNAL, message_types = ref.message_types, protocols = ref.protocols;

      supportedProtocols = 2 <= protocols.length ? slice.call(protocols, 0, i = protocols.length - 1) : (i = 0, []), unsupportedProtocol = protocols[i++];

      ActionCable.Connection = (function() {
        Connection.reopenDelay = 500;

        function Connection(consumer) {
          this.consumer = consumer;
          this.open = bind(this.open, this);
          this.subscriptions = this.consumer.subscriptions;
          this.monitor = new ActionCable.ConnectionMonitor(this);
          this.disconnected = true;
        }

        Connection.prototype.send = function(data) {
          if (this.isOpen()) {
            this.webSocket.send(JSON.stringify(data));
            return true;
          } else {
            return false;
          }
        };

        Connection.prototype.open = function() {
          if (this.isActive()) {
            ActionCable.log("Attempted to open WebSocket, but existing socket is " + (this.getState()));
            throw new Error("Existing connection must be closed before opening");
          } else {
            ActionCable.log("Opening WebSocket, current state is " + (this.getState()) + ", subprotocols: " + protocols);
            if (this.webSocket != null) {
              this.uninstallEventHandlers();
            }
            this.webSocket = new WebSocket(this.consumer.url, protocols);
            this.installEventHandlers();
            this.monitor.start();
            return true;
          }
        };

        Connection.prototype.close = function(arg) {
          var allowReconnect, ref1;
          allowReconnect = (arg != null ? arg : {
            allowReconnect: true
          }).allowReconnect;
          if (!allowReconnect) {
            this.monitor.stop();
          }
          if (this.isActive()) {
            return (ref1 = this.webSocket) != null ? ref1.close() : void 0;
          }
        };

        Connection.prototype.reopen = function() {
          var error;
          ActionCable.log("Reopening WebSocket, current state is " + (this.getState()));
          if (this.isActive()) {
            try {
              return this.close();
            } catch (error1) {
              error = error1;
              return ActionCable.log("Failed to reopen WebSocket", error);
            } finally {
              ActionCable.log("Reopening WebSocket in " + this.constructor.reopenDelay + "ms");
              setTimeout(this.open, this.constructor.reopenDelay);
            }
          } else {
            return this.open();
          }
        };

        Connection.prototype.getProtocol = function() {
          var ref1;
          return (ref1 = this.webSocket) != null ? ref1.protocol : void 0;
        };

        Connection.prototype.isOpen = function() {
          return this.isState("open");
        };

        Connection.prototype.isActive = function() {
          return this.isState("open", "connecting");
        };

        Connection.prototype.isProtocolSupported = function() {
          var ref1;
          return ref1 = this.getProtocol(), indexOf.call(supportedProtocols, ref1) >= 0;
        };

        Connection.prototype.isState = function() {
          var ref1, states;
          states = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return ref1 = this.getState(), indexOf.call(states, ref1) >= 0;
        };

        Connection.prototype.getState = function() {
          var ref1, state, value;
          for (state in WebSocket) {
            value = WebSocket[state];
            if (value === ((ref1 = this.webSocket) != null ? ref1.readyState : void 0)) {
              return state.toLowerCase();
            }
          }
          return null;
        };

        Connection.prototype.installEventHandlers = function() {
          var eventName, handler;
          for (eventName in this.events) {
            handler = this.events[eventName].bind(this);
            this.webSocket["on" + eventName] = handler;
          }
        };

        Connection.prototype.uninstallEventHandlers = function() {
          var eventName;
          for (eventName in this.events) {
            this.webSocket["on" + eventName] = function() {};
          }
        };

        Connection.prototype.events = {
          message: function(event) {
            var identifier, message, ref1, type;
            if (!this.isProtocolSupported()) {
              return;
            }
            ref1 = JSON.parse(event.data), identifier = ref1.identifier, message = ref1.message, type = ref1.type;
            switch (type) {
              case message_types.welcome:
                this.monitor.recordConnect();
                return this.subscriptions.reload();
              case message_types.ping:
                return this.monitor.recordPing();
              case message_types.confirmation:
                return this.subscriptions.notify(identifier, "connected");
              case message_types.rejection:
                return this.subscriptions.reject(identifier);
              default:
                return this.subscriptions.notify(identifier, "received", message);
            }
          },
          open: function() {
            ActionCable.log("WebSocket onopen event, using '" + (this.getProtocol()) + "' subprotocol");
            this.disconnected = false;
            if (!this.isProtocolSupported()) {
              ActionCable.log("Protocol is unsupported. Stopping monitor and disconnecting.");
              return this.close({
                allowReconnect: false
              });
            }
          },
          close: function(event) {
            ActionCable.log("WebSocket onclose event");
            if (this.disconnected) {
              return;
            }
            this.disconnected = true;
            this.monitor.recordDisconnect();
            return this.subscriptions.notifyAll("disconnected", {
              willAttemptReconnect: this.monitor.isRunning()
            });
          },
          error: function() {
            return ActionCable.log("WebSocket onerror event");
          }
        };

        return Connection;

      })();

    }).call(this);
    (function() {
      var slice = [].slice;

      ActionCable.Subscriptions = (function() {
        function Subscriptions(consumer) {
          this.consumer = consumer;
          this.subscriptions = [];
        }

        Subscriptions.prototype.create = function(channelName, mixin) {
          var channel, params, subscription;
          channel = channelName;
          params = typeof channel === "object" ? channel : {
            channel: channel
          };
          subscription = new ActionCable.Subscription(this.consumer, params, mixin);
          return this.add(subscription);
        };

        Subscriptions.prototype.add = function(subscription) {
          this.subscriptions.push(subscription);
          this.consumer.ensureActiveConnection();
          this.notify(subscription, "initialized");
          this.sendCommand(subscription, "subscribe");
          return subscription;
        };

        Subscriptions.prototype.remove = function(subscription) {
          this.forget(subscription);
          if (!this.findAll(subscription.identifier).length) {
            this.sendCommand(subscription, "unsubscribe");
          }
          return subscription;
        };

        Subscriptions.prototype.reject = function(identifier) {
          var i, len, ref, results, subscription;
          ref = this.findAll(identifier);
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            this.forget(subscription);
            this.notify(subscription, "rejected");
            results.push(subscription);
          }
          return results;
        };

        Subscriptions.prototype.forget = function(subscription) {
          var s;
          this.subscriptions = (function() {
            var i, len, ref, results;
            ref = this.subscriptions;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              s = ref[i];
              if (s !== subscription) {
                results.push(s);
              }
            }
            return results;
          }).call(this);
          return subscription;
        };

        Subscriptions.prototype.findAll = function(identifier) {
          var i, len, ref, results, s;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            s = ref[i];
            if (s.identifier === identifier) {
              results.push(s);
            }
          }
          return results;
        };

        Subscriptions.prototype.reload = function() {
          var i, len, ref, results, subscription;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.sendCommand(subscription, "subscribe"));
          }
          return results;
        };

        Subscriptions.prototype.notifyAll = function() {
          var args, callbackName, i, len, ref, results, subscription;
          callbackName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.notify.apply(this, [subscription, callbackName].concat(slice.call(args))));
          }
          return results;
        };

        Subscriptions.prototype.notify = function() {
          var args, callbackName, i, len, results, subscription, subscriptions;
          subscription = arguments[0], callbackName = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
          if (typeof subscription === "string") {
            subscriptions = this.findAll(subscription);
          } else {
            subscriptions = [subscription];
          }
          results = [];
          for (i = 0, len = subscriptions.length; i < len; i++) {
            subscription = subscriptions[i];
            results.push(typeof subscription[callbackName] === "function" ? subscription[callbackName].apply(subscription, args) : void 0);
          }
          return results;
        };

        Subscriptions.prototype.sendCommand = function(subscription, command) {
          var identifier;
          identifier = subscription.identifier;
          return this.consumer.send({
            command: command,
            identifier: identifier
          });
        };

        return Subscriptions;

      })();

    }).call(this);
    (function() {
      ActionCable.Subscription = (function() {
        var extend;

        function Subscription(consumer, params, mixin) {
          this.consumer = consumer;
          if (params == null) {
            params = {};
          }
          this.identifier = JSON.stringify(params);
          extend(this, mixin);
        }

        Subscription.prototype.perform = function(action, data) {
          if (data == null) {
            data = {};
          }
          data.action = action;
          return this.send(data);
        };

        Subscription.prototype.send = function(data) {
          return this.consumer.send({
            command: "message",
            identifier: this.identifier,
            data: JSON.stringify(data)
          });
        };

        Subscription.prototype.unsubscribe = function() {
          return this.consumer.subscriptions.remove(this);
        };

        extend = function(object, properties) {
          var key, value;
          if (properties != null) {
            for (key in properties) {
              value = properties[key];
              object[key] = value;
            }
          }
          return object;
        };

        return Subscription;

      })();

    }).call(this);
    (function() {
      ActionCable.Consumer = (function() {
        function Consumer(url) {
          this.url = url;
          this.subscriptions = new ActionCable.Subscriptions(this);
          this.connection = new ActionCable.Connection(this);
        }

        Consumer.prototype.send = function(data) {
          return this.connection.send(data);
        };

        Consumer.prototype.connect = function() {
          return this.connection.open();
        };

        Consumer.prototype.disconnect = function() {
          return this.connection.close({
            allowReconnect: false
          });
        };

        Consumer.prototype.ensureActiveConnection = function() {
          if (!this.connection.isActive()) {
            return this.connection.open();
          }
        };

        return Consumer;

      })();

    }).call(this);
  }).call(this);

  if (typeof module === "object" && module.exports) {
    module.exports = ActionCable;
  } else if (typeof define === "function" && define.amd) {
    define(ActionCable);
  }
}).call(this);
// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the rails generate channel command.
//




(function() {
  this.App || (this.App = {});

  App.cable = ActionCable.createConsumer();

}).call(this);
(function() {


}).call(this);
jQuery(function($) {
  $(document).on('turbolinks:load', function() {
	$('#timemeal').clockTimePicker();
	$('#timemmol').clockTimePicker();
    $('#timeinsulin').clockTimePicker();
    $('#timeExerciseBegining').clockTimePicker();
    $('#timeExerciseEnding').clockTimePicker();
    $('#timeWarningBegining').clockTimePicker();
    $('#timeWarningEnding').clockTimePicker();
  });
});
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//











;
