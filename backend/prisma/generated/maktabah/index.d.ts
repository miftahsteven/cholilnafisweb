
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model MaktabahBook
 * 
 */
export type MaktabahBook = $Result.DefaultSelection<Prisma.$MaktabahBookPayload>
/**
 * Model MaktabahChapter
 * 
 */
export type MaktabahChapter = $Result.DefaultSelection<Prisma.$MaktabahChapterPayload>
/**
 * Model MaktabahContent
 * 
 */
export type MaktabahContent = $Result.DefaultSelection<Prisma.$MaktabahContentPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more MaktabahBooks
 * const maktabahBooks = await prisma.maktabahBook.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more MaktabahBooks
   * const maktabahBooks = await prisma.maktabahBook.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.maktabahBook`: Exposes CRUD operations for the **MaktabahBook** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MaktabahBooks
    * const maktabahBooks = await prisma.maktabahBook.findMany()
    * ```
    */
  get maktabahBook(): Prisma.MaktabahBookDelegate<ExtArgs>;

  /**
   * `prisma.maktabahChapter`: Exposes CRUD operations for the **MaktabahChapter** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MaktabahChapters
    * const maktabahChapters = await prisma.maktabahChapter.findMany()
    * ```
    */
  get maktabahChapter(): Prisma.MaktabahChapterDelegate<ExtArgs>;

  /**
   * `prisma.maktabahContent`: Exposes CRUD operations for the **MaktabahContent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MaktabahContents
    * const maktabahContents = await prisma.maktabahContent.findMany()
    * ```
    */
  get maktabahContent(): Prisma.MaktabahContentDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    MaktabahBook: 'MaktabahBook',
    MaktabahChapter: 'MaktabahChapter',
    MaktabahContent: 'MaktabahContent'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "maktabahBook" | "maktabahChapter" | "maktabahContent"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      MaktabahBook: {
        payload: Prisma.$MaktabahBookPayload<ExtArgs>
        fields: Prisma.MaktabahBookFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MaktabahBookFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaktabahBookPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MaktabahBookFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaktabahBookPayload>
          }
          findFirst: {
            args: Prisma.MaktabahBookFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaktabahBookPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MaktabahBookFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaktabahBookPayload>
          }
          findMany: {
            args: Prisma.MaktabahBookFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaktabahBookPayload>[]
          }
          create: {
            args: Prisma.MaktabahBookCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaktabahBookPayload>
          }
          createMany: {
            args: Prisma.MaktabahBookCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MaktabahBookCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaktabahBookPayload>[]
          }
          delete: {
            args: Prisma.MaktabahBookDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaktabahBookPayload>
          }
          update: {
            args: Prisma.MaktabahBookUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaktabahBookPayload>
          }
          deleteMany: {
            args: Prisma.MaktabahBookDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MaktabahBookUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MaktabahBookUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaktabahBookPayload>
          }
          aggregate: {
            args: Prisma.MaktabahBookAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMaktabahBook>
          }
          groupBy: {
            args: Prisma.MaktabahBookGroupByArgs<ExtArgs>
            result: $Utils.Optional<MaktabahBookGroupByOutputType>[]
          }
          count: {
            args: Prisma.MaktabahBookCountArgs<ExtArgs>
            result: $Utils.Optional<MaktabahBookCountAggregateOutputType> | number
          }
        }
      }
      MaktabahChapter: {
        payload: Prisma.$MaktabahChapterPayload<ExtArgs>
        fields: Prisma.MaktabahChapterFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MaktabahChapterFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaktabahChapterPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MaktabahChapterFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaktabahChapterPayload>
          }
          findFirst: {
            args: Prisma.MaktabahChapterFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaktabahChapterPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MaktabahChapterFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaktabahChapterPayload>
          }
          findMany: {
            args: Prisma.MaktabahChapterFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaktabahChapterPayload>[]
          }
          create: {
            args: Prisma.MaktabahChapterCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaktabahChapterPayload>
          }
          createMany: {
            args: Prisma.MaktabahChapterCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MaktabahChapterCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaktabahChapterPayload>[]
          }
          delete: {
            args: Prisma.MaktabahChapterDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaktabahChapterPayload>
          }
          update: {
            args: Prisma.MaktabahChapterUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaktabahChapterPayload>
          }
          deleteMany: {
            args: Prisma.MaktabahChapterDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MaktabahChapterUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MaktabahChapterUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaktabahChapterPayload>
          }
          aggregate: {
            args: Prisma.MaktabahChapterAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMaktabahChapter>
          }
          groupBy: {
            args: Prisma.MaktabahChapterGroupByArgs<ExtArgs>
            result: $Utils.Optional<MaktabahChapterGroupByOutputType>[]
          }
          count: {
            args: Prisma.MaktabahChapterCountArgs<ExtArgs>
            result: $Utils.Optional<MaktabahChapterCountAggregateOutputType> | number
          }
        }
      }
      MaktabahContent: {
        payload: Prisma.$MaktabahContentPayload<ExtArgs>
        fields: Prisma.MaktabahContentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MaktabahContentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaktabahContentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MaktabahContentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaktabahContentPayload>
          }
          findFirst: {
            args: Prisma.MaktabahContentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaktabahContentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MaktabahContentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaktabahContentPayload>
          }
          findMany: {
            args: Prisma.MaktabahContentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaktabahContentPayload>[]
          }
          create: {
            args: Prisma.MaktabahContentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaktabahContentPayload>
          }
          createMany: {
            args: Prisma.MaktabahContentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MaktabahContentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaktabahContentPayload>[]
          }
          delete: {
            args: Prisma.MaktabahContentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaktabahContentPayload>
          }
          update: {
            args: Prisma.MaktabahContentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaktabahContentPayload>
          }
          deleteMany: {
            args: Prisma.MaktabahContentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MaktabahContentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MaktabahContentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaktabahContentPayload>
          }
          aggregate: {
            args: Prisma.MaktabahContentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMaktabahContent>
          }
          groupBy: {
            args: Prisma.MaktabahContentGroupByArgs<ExtArgs>
            result: $Utils.Optional<MaktabahContentGroupByOutputType>[]
          }
          count: {
            args: Prisma.MaktabahContentCountArgs<ExtArgs>
            result: $Utils.Optional<MaktabahContentCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type MaktabahBookCountOutputType
   */

  export type MaktabahBookCountOutputType = {
    chapters: number
    contents: number
  }

  export type MaktabahBookCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chapters?: boolean | MaktabahBookCountOutputTypeCountChaptersArgs
    contents?: boolean | MaktabahBookCountOutputTypeCountContentsArgs
  }

  // Custom InputTypes
  /**
   * MaktabahBookCountOutputType without action
   */
  export type MaktabahBookCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaktabahBookCountOutputType
     */
    select?: MaktabahBookCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MaktabahBookCountOutputType without action
   */
  export type MaktabahBookCountOutputTypeCountChaptersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MaktabahChapterWhereInput
  }

  /**
   * MaktabahBookCountOutputType without action
   */
  export type MaktabahBookCountOutputTypeCountContentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MaktabahContentWhereInput
  }


  /**
   * Count Type MaktabahChapterCountOutputType
   */

  export type MaktabahChapterCountOutputType = {
    contents: number
  }

  export type MaktabahChapterCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contents?: boolean | MaktabahChapterCountOutputTypeCountContentsArgs
  }

  // Custom InputTypes
  /**
   * MaktabahChapterCountOutputType without action
   */
  export type MaktabahChapterCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaktabahChapterCountOutputType
     */
    select?: MaktabahChapterCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MaktabahChapterCountOutputType without action
   */
  export type MaktabahChapterCountOutputTypeCountContentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MaktabahContentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model MaktabahBook
   */

  export type AggregateMaktabahBook = {
    _count: MaktabahBookCountAggregateOutputType | null
    _avg: MaktabahBookAvgAggregateOutputType | null
    _sum: MaktabahBookSumAggregateOutputType | null
    _min: MaktabahBookMinAggregateOutputType | null
    _max: MaktabahBookMaxAggregateOutputType | null
  }

  export type MaktabahBookAvgAggregateOutputType = {
    id: number | null
  }

  export type MaktabahBookSumAggregateOutputType = {
    id: number | null
  }

  export type MaktabahBookMinAggregateOutputType = {
    id: number | null
    title: string | null
    titleAr: string | null
    author: string | null
    authorAr: string | null
    category: string | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MaktabahBookMaxAggregateOutputType = {
    id: number | null
    title: string | null
    titleAr: string | null
    author: string | null
    authorAr: string | null
    category: string | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MaktabahBookCountAggregateOutputType = {
    id: number
    title: number
    titleAr: number
    author: number
    authorAr: number
    category: number
    source: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MaktabahBookAvgAggregateInputType = {
    id?: true
  }

  export type MaktabahBookSumAggregateInputType = {
    id?: true
  }

  export type MaktabahBookMinAggregateInputType = {
    id?: true
    title?: true
    titleAr?: true
    author?: true
    authorAr?: true
    category?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MaktabahBookMaxAggregateInputType = {
    id?: true
    title?: true
    titleAr?: true
    author?: true
    authorAr?: true
    category?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MaktabahBookCountAggregateInputType = {
    id?: true
    title?: true
    titleAr?: true
    author?: true
    authorAr?: true
    category?: true
    source?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MaktabahBookAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MaktabahBook to aggregate.
     */
    where?: MaktabahBookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaktabahBooks to fetch.
     */
    orderBy?: MaktabahBookOrderByWithRelationInput | MaktabahBookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MaktabahBookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaktabahBooks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaktabahBooks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MaktabahBooks
    **/
    _count?: true | MaktabahBookCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MaktabahBookAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MaktabahBookSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MaktabahBookMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MaktabahBookMaxAggregateInputType
  }

  export type GetMaktabahBookAggregateType<T extends MaktabahBookAggregateArgs> = {
        [P in keyof T & keyof AggregateMaktabahBook]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMaktabahBook[P]>
      : GetScalarType<T[P], AggregateMaktabahBook[P]>
  }




  export type MaktabahBookGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MaktabahBookWhereInput
    orderBy?: MaktabahBookOrderByWithAggregationInput | MaktabahBookOrderByWithAggregationInput[]
    by: MaktabahBookScalarFieldEnum[] | MaktabahBookScalarFieldEnum
    having?: MaktabahBookScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MaktabahBookCountAggregateInputType | true
    _avg?: MaktabahBookAvgAggregateInputType
    _sum?: MaktabahBookSumAggregateInputType
    _min?: MaktabahBookMinAggregateInputType
    _max?: MaktabahBookMaxAggregateInputType
  }

  export type MaktabahBookGroupByOutputType = {
    id: number
    title: string
    titleAr: string | null
    author: string | null
    authorAr: string | null
    category: string | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
    _count: MaktabahBookCountAggregateOutputType | null
    _avg: MaktabahBookAvgAggregateOutputType | null
    _sum: MaktabahBookSumAggregateOutputType | null
    _min: MaktabahBookMinAggregateOutputType | null
    _max: MaktabahBookMaxAggregateOutputType | null
  }

  type GetMaktabahBookGroupByPayload<T extends MaktabahBookGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MaktabahBookGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MaktabahBookGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MaktabahBookGroupByOutputType[P]>
            : GetScalarType<T[P], MaktabahBookGroupByOutputType[P]>
        }
      >
    >


  export type MaktabahBookSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    titleAr?: boolean
    author?: boolean
    authorAr?: boolean
    category?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    chapters?: boolean | MaktabahBook$chaptersArgs<ExtArgs>
    contents?: boolean | MaktabahBook$contentsArgs<ExtArgs>
    _count?: boolean | MaktabahBookCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["maktabahBook"]>

  export type MaktabahBookSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    titleAr?: boolean
    author?: boolean
    authorAr?: boolean
    category?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["maktabahBook"]>

  export type MaktabahBookSelectScalar = {
    id?: boolean
    title?: boolean
    titleAr?: boolean
    author?: boolean
    authorAr?: boolean
    category?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MaktabahBookInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chapters?: boolean | MaktabahBook$chaptersArgs<ExtArgs>
    contents?: boolean | MaktabahBook$contentsArgs<ExtArgs>
    _count?: boolean | MaktabahBookCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MaktabahBookIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MaktabahBookPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MaktabahBook"
    objects: {
      chapters: Prisma.$MaktabahChapterPayload<ExtArgs>[]
      contents: Prisma.$MaktabahContentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      titleAr: string | null
      author: string | null
      authorAr: string | null
      category: string | null
      source: string | null
      createdAt: Date | null
      updatedAt: Date | null
    }, ExtArgs["result"]["maktabahBook"]>
    composites: {}
  }

  type MaktabahBookGetPayload<S extends boolean | null | undefined | MaktabahBookDefaultArgs> = $Result.GetResult<Prisma.$MaktabahBookPayload, S>

  type MaktabahBookCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MaktabahBookFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MaktabahBookCountAggregateInputType | true
    }

  export interface MaktabahBookDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MaktabahBook'], meta: { name: 'MaktabahBook' } }
    /**
     * Find zero or one MaktabahBook that matches the filter.
     * @param {MaktabahBookFindUniqueArgs} args - Arguments to find a MaktabahBook
     * @example
     * // Get one MaktabahBook
     * const maktabahBook = await prisma.maktabahBook.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MaktabahBookFindUniqueArgs>(args: SelectSubset<T, MaktabahBookFindUniqueArgs<ExtArgs>>): Prisma__MaktabahBookClient<$Result.GetResult<Prisma.$MaktabahBookPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one MaktabahBook that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MaktabahBookFindUniqueOrThrowArgs} args - Arguments to find a MaktabahBook
     * @example
     * // Get one MaktabahBook
     * const maktabahBook = await prisma.maktabahBook.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MaktabahBookFindUniqueOrThrowArgs>(args: SelectSubset<T, MaktabahBookFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MaktabahBookClient<$Result.GetResult<Prisma.$MaktabahBookPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first MaktabahBook that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaktabahBookFindFirstArgs} args - Arguments to find a MaktabahBook
     * @example
     * // Get one MaktabahBook
     * const maktabahBook = await prisma.maktabahBook.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MaktabahBookFindFirstArgs>(args?: SelectSubset<T, MaktabahBookFindFirstArgs<ExtArgs>>): Prisma__MaktabahBookClient<$Result.GetResult<Prisma.$MaktabahBookPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first MaktabahBook that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaktabahBookFindFirstOrThrowArgs} args - Arguments to find a MaktabahBook
     * @example
     * // Get one MaktabahBook
     * const maktabahBook = await prisma.maktabahBook.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MaktabahBookFindFirstOrThrowArgs>(args?: SelectSubset<T, MaktabahBookFindFirstOrThrowArgs<ExtArgs>>): Prisma__MaktabahBookClient<$Result.GetResult<Prisma.$MaktabahBookPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more MaktabahBooks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaktabahBookFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MaktabahBooks
     * const maktabahBooks = await prisma.maktabahBook.findMany()
     * 
     * // Get first 10 MaktabahBooks
     * const maktabahBooks = await prisma.maktabahBook.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const maktabahBookWithIdOnly = await prisma.maktabahBook.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MaktabahBookFindManyArgs>(args?: SelectSubset<T, MaktabahBookFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaktabahBookPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a MaktabahBook.
     * @param {MaktabahBookCreateArgs} args - Arguments to create a MaktabahBook.
     * @example
     * // Create one MaktabahBook
     * const MaktabahBook = await prisma.maktabahBook.create({
     *   data: {
     *     // ... data to create a MaktabahBook
     *   }
     * })
     * 
     */
    create<T extends MaktabahBookCreateArgs>(args: SelectSubset<T, MaktabahBookCreateArgs<ExtArgs>>): Prisma__MaktabahBookClient<$Result.GetResult<Prisma.$MaktabahBookPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many MaktabahBooks.
     * @param {MaktabahBookCreateManyArgs} args - Arguments to create many MaktabahBooks.
     * @example
     * // Create many MaktabahBooks
     * const maktabahBook = await prisma.maktabahBook.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MaktabahBookCreateManyArgs>(args?: SelectSubset<T, MaktabahBookCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MaktabahBooks and returns the data saved in the database.
     * @param {MaktabahBookCreateManyAndReturnArgs} args - Arguments to create many MaktabahBooks.
     * @example
     * // Create many MaktabahBooks
     * const maktabahBook = await prisma.maktabahBook.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MaktabahBooks and only return the `id`
     * const maktabahBookWithIdOnly = await prisma.maktabahBook.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MaktabahBookCreateManyAndReturnArgs>(args?: SelectSubset<T, MaktabahBookCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaktabahBookPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a MaktabahBook.
     * @param {MaktabahBookDeleteArgs} args - Arguments to delete one MaktabahBook.
     * @example
     * // Delete one MaktabahBook
     * const MaktabahBook = await prisma.maktabahBook.delete({
     *   where: {
     *     // ... filter to delete one MaktabahBook
     *   }
     * })
     * 
     */
    delete<T extends MaktabahBookDeleteArgs>(args: SelectSubset<T, MaktabahBookDeleteArgs<ExtArgs>>): Prisma__MaktabahBookClient<$Result.GetResult<Prisma.$MaktabahBookPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one MaktabahBook.
     * @param {MaktabahBookUpdateArgs} args - Arguments to update one MaktabahBook.
     * @example
     * // Update one MaktabahBook
     * const maktabahBook = await prisma.maktabahBook.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MaktabahBookUpdateArgs>(args: SelectSubset<T, MaktabahBookUpdateArgs<ExtArgs>>): Prisma__MaktabahBookClient<$Result.GetResult<Prisma.$MaktabahBookPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more MaktabahBooks.
     * @param {MaktabahBookDeleteManyArgs} args - Arguments to filter MaktabahBooks to delete.
     * @example
     * // Delete a few MaktabahBooks
     * const { count } = await prisma.maktabahBook.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MaktabahBookDeleteManyArgs>(args?: SelectSubset<T, MaktabahBookDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MaktabahBooks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaktabahBookUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MaktabahBooks
     * const maktabahBook = await prisma.maktabahBook.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MaktabahBookUpdateManyArgs>(args: SelectSubset<T, MaktabahBookUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MaktabahBook.
     * @param {MaktabahBookUpsertArgs} args - Arguments to update or create a MaktabahBook.
     * @example
     * // Update or create a MaktabahBook
     * const maktabahBook = await prisma.maktabahBook.upsert({
     *   create: {
     *     // ... data to create a MaktabahBook
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MaktabahBook we want to update
     *   }
     * })
     */
    upsert<T extends MaktabahBookUpsertArgs>(args: SelectSubset<T, MaktabahBookUpsertArgs<ExtArgs>>): Prisma__MaktabahBookClient<$Result.GetResult<Prisma.$MaktabahBookPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of MaktabahBooks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaktabahBookCountArgs} args - Arguments to filter MaktabahBooks to count.
     * @example
     * // Count the number of MaktabahBooks
     * const count = await prisma.maktabahBook.count({
     *   where: {
     *     // ... the filter for the MaktabahBooks we want to count
     *   }
     * })
    **/
    count<T extends MaktabahBookCountArgs>(
      args?: Subset<T, MaktabahBookCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MaktabahBookCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MaktabahBook.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaktabahBookAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MaktabahBookAggregateArgs>(args: Subset<T, MaktabahBookAggregateArgs>): Prisma.PrismaPromise<GetMaktabahBookAggregateType<T>>

    /**
     * Group by MaktabahBook.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaktabahBookGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MaktabahBookGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MaktabahBookGroupByArgs['orderBy'] }
        : { orderBy?: MaktabahBookGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MaktabahBookGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMaktabahBookGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MaktabahBook model
   */
  readonly fields: MaktabahBookFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MaktabahBook.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MaktabahBookClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    chapters<T extends MaktabahBook$chaptersArgs<ExtArgs> = {}>(args?: Subset<T, MaktabahBook$chaptersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaktabahChapterPayload<ExtArgs>, T, "findMany"> | Null>
    contents<T extends MaktabahBook$contentsArgs<ExtArgs> = {}>(args?: Subset<T, MaktabahBook$contentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaktabahContentPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MaktabahBook model
   */ 
  interface MaktabahBookFieldRefs {
    readonly id: FieldRef<"MaktabahBook", 'Int'>
    readonly title: FieldRef<"MaktabahBook", 'String'>
    readonly titleAr: FieldRef<"MaktabahBook", 'String'>
    readonly author: FieldRef<"MaktabahBook", 'String'>
    readonly authorAr: FieldRef<"MaktabahBook", 'String'>
    readonly category: FieldRef<"MaktabahBook", 'String'>
    readonly source: FieldRef<"MaktabahBook", 'String'>
    readonly createdAt: FieldRef<"MaktabahBook", 'DateTime'>
    readonly updatedAt: FieldRef<"MaktabahBook", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MaktabahBook findUnique
   */
  export type MaktabahBookFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaktabahBook
     */
    select?: MaktabahBookSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaktabahBookInclude<ExtArgs> | null
    /**
     * Filter, which MaktabahBook to fetch.
     */
    where: MaktabahBookWhereUniqueInput
  }

  /**
   * MaktabahBook findUniqueOrThrow
   */
  export type MaktabahBookFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaktabahBook
     */
    select?: MaktabahBookSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaktabahBookInclude<ExtArgs> | null
    /**
     * Filter, which MaktabahBook to fetch.
     */
    where: MaktabahBookWhereUniqueInput
  }

  /**
   * MaktabahBook findFirst
   */
  export type MaktabahBookFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaktabahBook
     */
    select?: MaktabahBookSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaktabahBookInclude<ExtArgs> | null
    /**
     * Filter, which MaktabahBook to fetch.
     */
    where?: MaktabahBookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaktabahBooks to fetch.
     */
    orderBy?: MaktabahBookOrderByWithRelationInput | MaktabahBookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MaktabahBooks.
     */
    cursor?: MaktabahBookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaktabahBooks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaktabahBooks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MaktabahBooks.
     */
    distinct?: MaktabahBookScalarFieldEnum | MaktabahBookScalarFieldEnum[]
  }

  /**
   * MaktabahBook findFirstOrThrow
   */
  export type MaktabahBookFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaktabahBook
     */
    select?: MaktabahBookSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaktabahBookInclude<ExtArgs> | null
    /**
     * Filter, which MaktabahBook to fetch.
     */
    where?: MaktabahBookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaktabahBooks to fetch.
     */
    orderBy?: MaktabahBookOrderByWithRelationInput | MaktabahBookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MaktabahBooks.
     */
    cursor?: MaktabahBookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaktabahBooks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaktabahBooks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MaktabahBooks.
     */
    distinct?: MaktabahBookScalarFieldEnum | MaktabahBookScalarFieldEnum[]
  }

  /**
   * MaktabahBook findMany
   */
  export type MaktabahBookFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaktabahBook
     */
    select?: MaktabahBookSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaktabahBookInclude<ExtArgs> | null
    /**
     * Filter, which MaktabahBooks to fetch.
     */
    where?: MaktabahBookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaktabahBooks to fetch.
     */
    orderBy?: MaktabahBookOrderByWithRelationInput | MaktabahBookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MaktabahBooks.
     */
    cursor?: MaktabahBookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaktabahBooks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaktabahBooks.
     */
    skip?: number
    distinct?: MaktabahBookScalarFieldEnum | MaktabahBookScalarFieldEnum[]
  }

  /**
   * MaktabahBook create
   */
  export type MaktabahBookCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaktabahBook
     */
    select?: MaktabahBookSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaktabahBookInclude<ExtArgs> | null
    /**
     * The data needed to create a MaktabahBook.
     */
    data: XOR<MaktabahBookCreateInput, MaktabahBookUncheckedCreateInput>
  }

  /**
   * MaktabahBook createMany
   */
  export type MaktabahBookCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MaktabahBooks.
     */
    data: MaktabahBookCreateManyInput | MaktabahBookCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MaktabahBook createManyAndReturn
   */
  export type MaktabahBookCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaktabahBook
     */
    select?: MaktabahBookSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many MaktabahBooks.
     */
    data: MaktabahBookCreateManyInput | MaktabahBookCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MaktabahBook update
   */
  export type MaktabahBookUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaktabahBook
     */
    select?: MaktabahBookSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaktabahBookInclude<ExtArgs> | null
    /**
     * The data needed to update a MaktabahBook.
     */
    data: XOR<MaktabahBookUpdateInput, MaktabahBookUncheckedUpdateInput>
    /**
     * Choose, which MaktabahBook to update.
     */
    where: MaktabahBookWhereUniqueInput
  }

  /**
   * MaktabahBook updateMany
   */
  export type MaktabahBookUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MaktabahBooks.
     */
    data: XOR<MaktabahBookUpdateManyMutationInput, MaktabahBookUncheckedUpdateManyInput>
    /**
     * Filter which MaktabahBooks to update
     */
    where?: MaktabahBookWhereInput
  }

  /**
   * MaktabahBook upsert
   */
  export type MaktabahBookUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaktabahBook
     */
    select?: MaktabahBookSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaktabahBookInclude<ExtArgs> | null
    /**
     * The filter to search for the MaktabahBook to update in case it exists.
     */
    where: MaktabahBookWhereUniqueInput
    /**
     * In case the MaktabahBook found by the `where` argument doesn't exist, create a new MaktabahBook with this data.
     */
    create: XOR<MaktabahBookCreateInput, MaktabahBookUncheckedCreateInput>
    /**
     * In case the MaktabahBook was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MaktabahBookUpdateInput, MaktabahBookUncheckedUpdateInput>
  }

  /**
   * MaktabahBook delete
   */
  export type MaktabahBookDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaktabahBook
     */
    select?: MaktabahBookSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaktabahBookInclude<ExtArgs> | null
    /**
     * Filter which MaktabahBook to delete.
     */
    where: MaktabahBookWhereUniqueInput
  }

  /**
   * MaktabahBook deleteMany
   */
  export type MaktabahBookDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MaktabahBooks to delete
     */
    where?: MaktabahBookWhereInput
  }

  /**
   * MaktabahBook.chapters
   */
  export type MaktabahBook$chaptersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaktabahChapter
     */
    select?: MaktabahChapterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaktabahChapterInclude<ExtArgs> | null
    where?: MaktabahChapterWhereInput
    orderBy?: MaktabahChapterOrderByWithRelationInput | MaktabahChapterOrderByWithRelationInput[]
    cursor?: MaktabahChapterWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MaktabahChapterScalarFieldEnum | MaktabahChapterScalarFieldEnum[]
  }

  /**
   * MaktabahBook.contents
   */
  export type MaktabahBook$contentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaktabahContent
     */
    select?: MaktabahContentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaktabahContentInclude<ExtArgs> | null
    where?: MaktabahContentWhereInput
    orderBy?: MaktabahContentOrderByWithRelationInput | MaktabahContentOrderByWithRelationInput[]
    cursor?: MaktabahContentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MaktabahContentScalarFieldEnum | MaktabahContentScalarFieldEnum[]
  }

  /**
   * MaktabahBook without action
   */
  export type MaktabahBookDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaktabahBook
     */
    select?: MaktabahBookSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaktabahBookInclude<ExtArgs> | null
  }


  /**
   * Model MaktabahChapter
   */

  export type AggregateMaktabahChapter = {
    _count: MaktabahChapterCountAggregateOutputType | null
    _avg: MaktabahChapterAvgAggregateOutputType | null
    _sum: MaktabahChapterSumAggregateOutputType | null
    _min: MaktabahChapterMinAggregateOutputType | null
    _max: MaktabahChapterMaxAggregateOutputType | null
  }

  export type MaktabahChapterAvgAggregateOutputType = {
    id: number | null
    bookId: number | null
    orderNo: number | null
  }

  export type MaktabahChapterSumAggregateOutputType = {
    id: number | null
    bookId: number | null
    orderNo: number | null
  }

  export type MaktabahChapterMinAggregateOutputType = {
    id: number | null
    bookId: number | null
    title: string | null
    titleAr: string | null
    orderNo: number | null
  }

  export type MaktabahChapterMaxAggregateOutputType = {
    id: number | null
    bookId: number | null
    title: string | null
    titleAr: string | null
    orderNo: number | null
  }

  export type MaktabahChapterCountAggregateOutputType = {
    id: number
    bookId: number
    title: number
    titleAr: number
    orderNo: number
    _all: number
  }


  export type MaktabahChapterAvgAggregateInputType = {
    id?: true
    bookId?: true
    orderNo?: true
  }

  export type MaktabahChapterSumAggregateInputType = {
    id?: true
    bookId?: true
    orderNo?: true
  }

  export type MaktabahChapterMinAggregateInputType = {
    id?: true
    bookId?: true
    title?: true
    titleAr?: true
    orderNo?: true
  }

  export type MaktabahChapterMaxAggregateInputType = {
    id?: true
    bookId?: true
    title?: true
    titleAr?: true
    orderNo?: true
  }

  export type MaktabahChapterCountAggregateInputType = {
    id?: true
    bookId?: true
    title?: true
    titleAr?: true
    orderNo?: true
    _all?: true
  }

  export type MaktabahChapterAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MaktabahChapter to aggregate.
     */
    where?: MaktabahChapterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaktabahChapters to fetch.
     */
    orderBy?: MaktabahChapterOrderByWithRelationInput | MaktabahChapterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MaktabahChapterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaktabahChapters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaktabahChapters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MaktabahChapters
    **/
    _count?: true | MaktabahChapterCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MaktabahChapterAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MaktabahChapterSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MaktabahChapterMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MaktabahChapterMaxAggregateInputType
  }

  export type GetMaktabahChapterAggregateType<T extends MaktabahChapterAggregateArgs> = {
        [P in keyof T & keyof AggregateMaktabahChapter]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMaktabahChapter[P]>
      : GetScalarType<T[P], AggregateMaktabahChapter[P]>
  }




  export type MaktabahChapterGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MaktabahChapterWhereInput
    orderBy?: MaktabahChapterOrderByWithAggregationInput | MaktabahChapterOrderByWithAggregationInput[]
    by: MaktabahChapterScalarFieldEnum[] | MaktabahChapterScalarFieldEnum
    having?: MaktabahChapterScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MaktabahChapterCountAggregateInputType | true
    _avg?: MaktabahChapterAvgAggregateInputType
    _sum?: MaktabahChapterSumAggregateInputType
    _min?: MaktabahChapterMinAggregateInputType
    _max?: MaktabahChapterMaxAggregateInputType
  }

  export type MaktabahChapterGroupByOutputType = {
    id: number
    bookId: number
    title: string
    titleAr: string | null
    orderNo: number | null
    _count: MaktabahChapterCountAggregateOutputType | null
    _avg: MaktabahChapterAvgAggregateOutputType | null
    _sum: MaktabahChapterSumAggregateOutputType | null
    _min: MaktabahChapterMinAggregateOutputType | null
    _max: MaktabahChapterMaxAggregateOutputType | null
  }

  type GetMaktabahChapterGroupByPayload<T extends MaktabahChapterGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MaktabahChapterGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MaktabahChapterGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MaktabahChapterGroupByOutputType[P]>
            : GetScalarType<T[P], MaktabahChapterGroupByOutputType[P]>
        }
      >
    >


  export type MaktabahChapterSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bookId?: boolean
    title?: boolean
    titleAr?: boolean
    orderNo?: boolean
    book?: boolean | MaktabahBookDefaultArgs<ExtArgs>
    contents?: boolean | MaktabahChapter$contentsArgs<ExtArgs>
    _count?: boolean | MaktabahChapterCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["maktabahChapter"]>

  export type MaktabahChapterSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bookId?: boolean
    title?: boolean
    titleAr?: boolean
    orderNo?: boolean
    book?: boolean | MaktabahBookDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["maktabahChapter"]>

  export type MaktabahChapterSelectScalar = {
    id?: boolean
    bookId?: boolean
    title?: boolean
    titleAr?: boolean
    orderNo?: boolean
  }

  export type MaktabahChapterInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    book?: boolean | MaktabahBookDefaultArgs<ExtArgs>
    contents?: boolean | MaktabahChapter$contentsArgs<ExtArgs>
    _count?: boolean | MaktabahChapterCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MaktabahChapterIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    book?: boolean | MaktabahBookDefaultArgs<ExtArgs>
  }

  export type $MaktabahChapterPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MaktabahChapter"
    objects: {
      book: Prisma.$MaktabahBookPayload<ExtArgs>
      contents: Prisma.$MaktabahContentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      bookId: number
      title: string
      titleAr: string | null
      orderNo: number | null
    }, ExtArgs["result"]["maktabahChapter"]>
    composites: {}
  }

  type MaktabahChapterGetPayload<S extends boolean | null | undefined | MaktabahChapterDefaultArgs> = $Result.GetResult<Prisma.$MaktabahChapterPayload, S>

  type MaktabahChapterCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MaktabahChapterFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MaktabahChapterCountAggregateInputType | true
    }

  export interface MaktabahChapterDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MaktabahChapter'], meta: { name: 'MaktabahChapter' } }
    /**
     * Find zero or one MaktabahChapter that matches the filter.
     * @param {MaktabahChapterFindUniqueArgs} args - Arguments to find a MaktabahChapter
     * @example
     * // Get one MaktabahChapter
     * const maktabahChapter = await prisma.maktabahChapter.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MaktabahChapterFindUniqueArgs>(args: SelectSubset<T, MaktabahChapterFindUniqueArgs<ExtArgs>>): Prisma__MaktabahChapterClient<$Result.GetResult<Prisma.$MaktabahChapterPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one MaktabahChapter that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MaktabahChapterFindUniqueOrThrowArgs} args - Arguments to find a MaktabahChapter
     * @example
     * // Get one MaktabahChapter
     * const maktabahChapter = await prisma.maktabahChapter.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MaktabahChapterFindUniqueOrThrowArgs>(args: SelectSubset<T, MaktabahChapterFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MaktabahChapterClient<$Result.GetResult<Prisma.$MaktabahChapterPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first MaktabahChapter that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaktabahChapterFindFirstArgs} args - Arguments to find a MaktabahChapter
     * @example
     * // Get one MaktabahChapter
     * const maktabahChapter = await prisma.maktabahChapter.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MaktabahChapterFindFirstArgs>(args?: SelectSubset<T, MaktabahChapterFindFirstArgs<ExtArgs>>): Prisma__MaktabahChapterClient<$Result.GetResult<Prisma.$MaktabahChapterPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first MaktabahChapter that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaktabahChapterFindFirstOrThrowArgs} args - Arguments to find a MaktabahChapter
     * @example
     * // Get one MaktabahChapter
     * const maktabahChapter = await prisma.maktabahChapter.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MaktabahChapterFindFirstOrThrowArgs>(args?: SelectSubset<T, MaktabahChapterFindFirstOrThrowArgs<ExtArgs>>): Prisma__MaktabahChapterClient<$Result.GetResult<Prisma.$MaktabahChapterPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more MaktabahChapters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaktabahChapterFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MaktabahChapters
     * const maktabahChapters = await prisma.maktabahChapter.findMany()
     * 
     * // Get first 10 MaktabahChapters
     * const maktabahChapters = await prisma.maktabahChapter.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const maktabahChapterWithIdOnly = await prisma.maktabahChapter.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MaktabahChapterFindManyArgs>(args?: SelectSubset<T, MaktabahChapterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaktabahChapterPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a MaktabahChapter.
     * @param {MaktabahChapterCreateArgs} args - Arguments to create a MaktabahChapter.
     * @example
     * // Create one MaktabahChapter
     * const MaktabahChapter = await prisma.maktabahChapter.create({
     *   data: {
     *     // ... data to create a MaktabahChapter
     *   }
     * })
     * 
     */
    create<T extends MaktabahChapterCreateArgs>(args: SelectSubset<T, MaktabahChapterCreateArgs<ExtArgs>>): Prisma__MaktabahChapterClient<$Result.GetResult<Prisma.$MaktabahChapterPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many MaktabahChapters.
     * @param {MaktabahChapterCreateManyArgs} args - Arguments to create many MaktabahChapters.
     * @example
     * // Create many MaktabahChapters
     * const maktabahChapter = await prisma.maktabahChapter.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MaktabahChapterCreateManyArgs>(args?: SelectSubset<T, MaktabahChapterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MaktabahChapters and returns the data saved in the database.
     * @param {MaktabahChapterCreateManyAndReturnArgs} args - Arguments to create many MaktabahChapters.
     * @example
     * // Create many MaktabahChapters
     * const maktabahChapter = await prisma.maktabahChapter.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MaktabahChapters and only return the `id`
     * const maktabahChapterWithIdOnly = await prisma.maktabahChapter.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MaktabahChapterCreateManyAndReturnArgs>(args?: SelectSubset<T, MaktabahChapterCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaktabahChapterPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a MaktabahChapter.
     * @param {MaktabahChapterDeleteArgs} args - Arguments to delete one MaktabahChapter.
     * @example
     * // Delete one MaktabahChapter
     * const MaktabahChapter = await prisma.maktabahChapter.delete({
     *   where: {
     *     // ... filter to delete one MaktabahChapter
     *   }
     * })
     * 
     */
    delete<T extends MaktabahChapterDeleteArgs>(args: SelectSubset<T, MaktabahChapterDeleteArgs<ExtArgs>>): Prisma__MaktabahChapterClient<$Result.GetResult<Prisma.$MaktabahChapterPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one MaktabahChapter.
     * @param {MaktabahChapterUpdateArgs} args - Arguments to update one MaktabahChapter.
     * @example
     * // Update one MaktabahChapter
     * const maktabahChapter = await prisma.maktabahChapter.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MaktabahChapterUpdateArgs>(args: SelectSubset<T, MaktabahChapterUpdateArgs<ExtArgs>>): Prisma__MaktabahChapterClient<$Result.GetResult<Prisma.$MaktabahChapterPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more MaktabahChapters.
     * @param {MaktabahChapterDeleteManyArgs} args - Arguments to filter MaktabahChapters to delete.
     * @example
     * // Delete a few MaktabahChapters
     * const { count } = await prisma.maktabahChapter.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MaktabahChapterDeleteManyArgs>(args?: SelectSubset<T, MaktabahChapterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MaktabahChapters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaktabahChapterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MaktabahChapters
     * const maktabahChapter = await prisma.maktabahChapter.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MaktabahChapterUpdateManyArgs>(args: SelectSubset<T, MaktabahChapterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MaktabahChapter.
     * @param {MaktabahChapterUpsertArgs} args - Arguments to update or create a MaktabahChapter.
     * @example
     * // Update or create a MaktabahChapter
     * const maktabahChapter = await prisma.maktabahChapter.upsert({
     *   create: {
     *     // ... data to create a MaktabahChapter
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MaktabahChapter we want to update
     *   }
     * })
     */
    upsert<T extends MaktabahChapterUpsertArgs>(args: SelectSubset<T, MaktabahChapterUpsertArgs<ExtArgs>>): Prisma__MaktabahChapterClient<$Result.GetResult<Prisma.$MaktabahChapterPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of MaktabahChapters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaktabahChapterCountArgs} args - Arguments to filter MaktabahChapters to count.
     * @example
     * // Count the number of MaktabahChapters
     * const count = await prisma.maktabahChapter.count({
     *   where: {
     *     // ... the filter for the MaktabahChapters we want to count
     *   }
     * })
    **/
    count<T extends MaktabahChapterCountArgs>(
      args?: Subset<T, MaktabahChapterCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MaktabahChapterCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MaktabahChapter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaktabahChapterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MaktabahChapterAggregateArgs>(args: Subset<T, MaktabahChapterAggregateArgs>): Prisma.PrismaPromise<GetMaktabahChapterAggregateType<T>>

    /**
     * Group by MaktabahChapter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaktabahChapterGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MaktabahChapterGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MaktabahChapterGroupByArgs['orderBy'] }
        : { orderBy?: MaktabahChapterGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MaktabahChapterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMaktabahChapterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MaktabahChapter model
   */
  readonly fields: MaktabahChapterFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MaktabahChapter.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MaktabahChapterClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    book<T extends MaktabahBookDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MaktabahBookDefaultArgs<ExtArgs>>): Prisma__MaktabahBookClient<$Result.GetResult<Prisma.$MaktabahBookPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    contents<T extends MaktabahChapter$contentsArgs<ExtArgs> = {}>(args?: Subset<T, MaktabahChapter$contentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaktabahContentPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MaktabahChapter model
   */ 
  interface MaktabahChapterFieldRefs {
    readonly id: FieldRef<"MaktabahChapter", 'Int'>
    readonly bookId: FieldRef<"MaktabahChapter", 'Int'>
    readonly title: FieldRef<"MaktabahChapter", 'String'>
    readonly titleAr: FieldRef<"MaktabahChapter", 'String'>
    readonly orderNo: FieldRef<"MaktabahChapter", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * MaktabahChapter findUnique
   */
  export type MaktabahChapterFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaktabahChapter
     */
    select?: MaktabahChapterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaktabahChapterInclude<ExtArgs> | null
    /**
     * Filter, which MaktabahChapter to fetch.
     */
    where: MaktabahChapterWhereUniqueInput
  }

  /**
   * MaktabahChapter findUniqueOrThrow
   */
  export type MaktabahChapterFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaktabahChapter
     */
    select?: MaktabahChapterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaktabahChapterInclude<ExtArgs> | null
    /**
     * Filter, which MaktabahChapter to fetch.
     */
    where: MaktabahChapterWhereUniqueInput
  }

  /**
   * MaktabahChapter findFirst
   */
  export type MaktabahChapterFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaktabahChapter
     */
    select?: MaktabahChapterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaktabahChapterInclude<ExtArgs> | null
    /**
     * Filter, which MaktabahChapter to fetch.
     */
    where?: MaktabahChapterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaktabahChapters to fetch.
     */
    orderBy?: MaktabahChapterOrderByWithRelationInput | MaktabahChapterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MaktabahChapters.
     */
    cursor?: MaktabahChapterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaktabahChapters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaktabahChapters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MaktabahChapters.
     */
    distinct?: MaktabahChapterScalarFieldEnum | MaktabahChapterScalarFieldEnum[]
  }

  /**
   * MaktabahChapter findFirstOrThrow
   */
  export type MaktabahChapterFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaktabahChapter
     */
    select?: MaktabahChapterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaktabahChapterInclude<ExtArgs> | null
    /**
     * Filter, which MaktabahChapter to fetch.
     */
    where?: MaktabahChapterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaktabahChapters to fetch.
     */
    orderBy?: MaktabahChapterOrderByWithRelationInput | MaktabahChapterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MaktabahChapters.
     */
    cursor?: MaktabahChapterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaktabahChapters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaktabahChapters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MaktabahChapters.
     */
    distinct?: MaktabahChapterScalarFieldEnum | MaktabahChapterScalarFieldEnum[]
  }

  /**
   * MaktabahChapter findMany
   */
  export type MaktabahChapterFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaktabahChapter
     */
    select?: MaktabahChapterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaktabahChapterInclude<ExtArgs> | null
    /**
     * Filter, which MaktabahChapters to fetch.
     */
    where?: MaktabahChapterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaktabahChapters to fetch.
     */
    orderBy?: MaktabahChapterOrderByWithRelationInput | MaktabahChapterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MaktabahChapters.
     */
    cursor?: MaktabahChapterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaktabahChapters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaktabahChapters.
     */
    skip?: number
    distinct?: MaktabahChapterScalarFieldEnum | MaktabahChapterScalarFieldEnum[]
  }

  /**
   * MaktabahChapter create
   */
  export type MaktabahChapterCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaktabahChapter
     */
    select?: MaktabahChapterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaktabahChapterInclude<ExtArgs> | null
    /**
     * The data needed to create a MaktabahChapter.
     */
    data: XOR<MaktabahChapterCreateInput, MaktabahChapterUncheckedCreateInput>
  }

  /**
   * MaktabahChapter createMany
   */
  export type MaktabahChapterCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MaktabahChapters.
     */
    data: MaktabahChapterCreateManyInput | MaktabahChapterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MaktabahChapter createManyAndReturn
   */
  export type MaktabahChapterCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaktabahChapter
     */
    select?: MaktabahChapterSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many MaktabahChapters.
     */
    data: MaktabahChapterCreateManyInput | MaktabahChapterCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaktabahChapterIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MaktabahChapter update
   */
  export type MaktabahChapterUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaktabahChapter
     */
    select?: MaktabahChapterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaktabahChapterInclude<ExtArgs> | null
    /**
     * The data needed to update a MaktabahChapter.
     */
    data: XOR<MaktabahChapterUpdateInput, MaktabahChapterUncheckedUpdateInput>
    /**
     * Choose, which MaktabahChapter to update.
     */
    where: MaktabahChapterWhereUniqueInput
  }

  /**
   * MaktabahChapter updateMany
   */
  export type MaktabahChapterUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MaktabahChapters.
     */
    data: XOR<MaktabahChapterUpdateManyMutationInput, MaktabahChapterUncheckedUpdateManyInput>
    /**
     * Filter which MaktabahChapters to update
     */
    where?: MaktabahChapterWhereInput
  }

  /**
   * MaktabahChapter upsert
   */
  export type MaktabahChapterUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaktabahChapter
     */
    select?: MaktabahChapterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaktabahChapterInclude<ExtArgs> | null
    /**
     * The filter to search for the MaktabahChapter to update in case it exists.
     */
    where: MaktabahChapterWhereUniqueInput
    /**
     * In case the MaktabahChapter found by the `where` argument doesn't exist, create a new MaktabahChapter with this data.
     */
    create: XOR<MaktabahChapterCreateInput, MaktabahChapterUncheckedCreateInput>
    /**
     * In case the MaktabahChapter was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MaktabahChapterUpdateInput, MaktabahChapterUncheckedUpdateInput>
  }

  /**
   * MaktabahChapter delete
   */
  export type MaktabahChapterDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaktabahChapter
     */
    select?: MaktabahChapterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaktabahChapterInclude<ExtArgs> | null
    /**
     * Filter which MaktabahChapter to delete.
     */
    where: MaktabahChapterWhereUniqueInput
  }

  /**
   * MaktabahChapter deleteMany
   */
  export type MaktabahChapterDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MaktabahChapters to delete
     */
    where?: MaktabahChapterWhereInput
  }

  /**
   * MaktabahChapter.contents
   */
  export type MaktabahChapter$contentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaktabahContent
     */
    select?: MaktabahContentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaktabahContentInclude<ExtArgs> | null
    where?: MaktabahContentWhereInput
    orderBy?: MaktabahContentOrderByWithRelationInput | MaktabahContentOrderByWithRelationInput[]
    cursor?: MaktabahContentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MaktabahContentScalarFieldEnum | MaktabahContentScalarFieldEnum[]
  }

  /**
   * MaktabahChapter without action
   */
  export type MaktabahChapterDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaktabahChapter
     */
    select?: MaktabahChapterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaktabahChapterInclude<ExtArgs> | null
  }


  /**
   * Model MaktabahContent
   */

  export type AggregateMaktabahContent = {
    _count: MaktabahContentCountAggregateOutputType | null
    _avg: MaktabahContentAvgAggregateOutputType | null
    _sum: MaktabahContentSumAggregateOutputType | null
    _min: MaktabahContentMinAggregateOutputType | null
    _max: MaktabahContentMaxAggregateOutputType | null
  }

  export type MaktabahContentAvgAggregateOutputType = {
    id: number | null
    bookId: number | null
    chapterId: number | null
    page: number | null
    volume: number | null
  }

  export type MaktabahContentSumAggregateOutputType = {
    id: number | null
    bookId: number | null
    chapterId: number | null
    page: number | null
    volume: number | null
  }

  export type MaktabahContentMinAggregateOutputType = {
    id: number | null
    bookId: number | null
    chapterId: number | null
    page: number | null
    volume: number | null
    contentAr: string | null
    contentText: string | null
    normalized: string | null
    searchText: string | null
  }

  export type MaktabahContentMaxAggregateOutputType = {
    id: number | null
    bookId: number | null
    chapterId: number | null
    page: number | null
    volume: number | null
    contentAr: string | null
    contentText: string | null
    normalized: string | null
    searchText: string | null
  }

  export type MaktabahContentCountAggregateOutputType = {
    id: number
    bookId: number
    chapterId: number
    page: number
    volume: number
    contentAr: number
    contentText: number
    normalized: number
    searchText: number
    _all: number
  }


  export type MaktabahContentAvgAggregateInputType = {
    id?: true
    bookId?: true
    chapterId?: true
    page?: true
    volume?: true
  }

  export type MaktabahContentSumAggregateInputType = {
    id?: true
    bookId?: true
    chapterId?: true
    page?: true
    volume?: true
  }

  export type MaktabahContentMinAggregateInputType = {
    id?: true
    bookId?: true
    chapterId?: true
    page?: true
    volume?: true
    contentAr?: true
    contentText?: true
    normalized?: true
    searchText?: true
  }

  export type MaktabahContentMaxAggregateInputType = {
    id?: true
    bookId?: true
    chapterId?: true
    page?: true
    volume?: true
    contentAr?: true
    contentText?: true
    normalized?: true
    searchText?: true
  }

  export type MaktabahContentCountAggregateInputType = {
    id?: true
    bookId?: true
    chapterId?: true
    page?: true
    volume?: true
    contentAr?: true
    contentText?: true
    normalized?: true
    searchText?: true
    _all?: true
  }

  export type MaktabahContentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MaktabahContent to aggregate.
     */
    where?: MaktabahContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaktabahContents to fetch.
     */
    orderBy?: MaktabahContentOrderByWithRelationInput | MaktabahContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MaktabahContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaktabahContents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaktabahContents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MaktabahContents
    **/
    _count?: true | MaktabahContentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MaktabahContentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MaktabahContentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MaktabahContentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MaktabahContentMaxAggregateInputType
  }

  export type GetMaktabahContentAggregateType<T extends MaktabahContentAggregateArgs> = {
        [P in keyof T & keyof AggregateMaktabahContent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMaktabahContent[P]>
      : GetScalarType<T[P], AggregateMaktabahContent[P]>
  }




  export type MaktabahContentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MaktabahContentWhereInput
    orderBy?: MaktabahContentOrderByWithAggregationInput | MaktabahContentOrderByWithAggregationInput[]
    by: MaktabahContentScalarFieldEnum[] | MaktabahContentScalarFieldEnum
    having?: MaktabahContentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MaktabahContentCountAggregateInputType | true
    _avg?: MaktabahContentAvgAggregateInputType
    _sum?: MaktabahContentSumAggregateInputType
    _min?: MaktabahContentMinAggregateInputType
    _max?: MaktabahContentMaxAggregateInputType
  }

  export type MaktabahContentGroupByOutputType = {
    id: number
    bookId: number
    chapterId: number | null
    page: number | null
    volume: number | null
    contentAr: string
    contentText: string | null
    normalized: string | null
    searchText: string | null
    _count: MaktabahContentCountAggregateOutputType | null
    _avg: MaktabahContentAvgAggregateOutputType | null
    _sum: MaktabahContentSumAggregateOutputType | null
    _min: MaktabahContentMinAggregateOutputType | null
    _max: MaktabahContentMaxAggregateOutputType | null
  }

  type GetMaktabahContentGroupByPayload<T extends MaktabahContentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MaktabahContentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MaktabahContentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MaktabahContentGroupByOutputType[P]>
            : GetScalarType<T[P], MaktabahContentGroupByOutputType[P]>
        }
      >
    >


  export type MaktabahContentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bookId?: boolean
    chapterId?: boolean
    page?: boolean
    volume?: boolean
    contentAr?: boolean
    contentText?: boolean
    normalized?: boolean
    searchText?: boolean
    book?: boolean | MaktabahBookDefaultArgs<ExtArgs>
    chapter?: boolean | MaktabahContent$chapterArgs<ExtArgs>
  }, ExtArgs["result"]["maktabahContent"]>

  export type MaktabahContentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bookId?: boolean
    chapterId?: boolean
    page?: boolean
    volume?: boolean
    contentAr?: boolean
    contentText?: boolean
    normalized?: boolean
    searchText?: boolean
    book?: boolean | MaktabahBookDefaultArgs<ExtArgs>
    chapter?: boolean | MaktabahContent$chapterArgs<ExtArgs>
  }, ExtArgs["result"]["maktabahContent"]>

  export type MaktabahContentSelectScalar = {
    id?: boolean
    bookId?: boolean
    chapterId?: boolean
    page?: boolean
    volume?: boolean
    contentAr?: boolean
    contentText?: boolean
    normalized?: boolean
    searchText?: boolean
  }

  export type MaktabahContentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    book?: boolean | MaktabahBookDefaultArgs<ExtArgs>
    chapter?: boolean | MaktabahContent$chapterArgs<ExtArgs>
  }
  export type MaktabahContentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    book?: boolean | MaktabahBookDefaultArgs<ExtArgs>
    chapter?: boolean | MaktabahContent$chapterArgs<ExtArgs>
  }

  export type $MaktabahContentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MaktabahContent"
    objects: {
      book: Prisma.$MaktabahBookPayload<ExtArgs>
      chapter: Prisma.$MaktabahChapterPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      bookId: number
      chapterId: number | null
      page: number | null
      volume: number | null
      contentAr: string
      contentText: string | null
      normalized: string | null
      searchText: string | null
    }, ExtArgs["result"]["maktabahContent"]>
    composites: {}
  }

  type MaktabahContentGetPayload<S extends boolean | null | undefined | MaktabahContentDefaultArgs> = $Result.GetResult<Prisma.$MaktabahContentPayload, S>

  type MaktabahContentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MaktabahContentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MaktabahContentCountAggregateInputType | true
    }

  export interface MaktabahContentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MaktabahContent'], meta: { name: 'MaktabahContent' } }
    /**
     * Find zero or one MaktabahContent that matches the filter.
     * @param {MaktabahContentFindUniqueArgs} args - Arguments to find a MaktabahContent
     * @example
     * // Get one MaktabahContent
     * const maktabahContent = await prisma.maktabahContent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MaktabahContentFindUniqueArgs>(args: SelectSubset<T, MaktabahContentFindUniqueArgs<ExtArgs>>): Prisma__MaktabahContentClient<$Result.GetResult<Prisma.$MaktabahContentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one MaktabahContent that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MaktabahContentFindUniqueOrThrowArgs} args - Arguments to find a MaktabahContent
     * @example
     * // Get one MaktabahContent
     * const maktabahContent = await prisma.maktabahContent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MaktabahContentFindUniqueOrThrowArgs>(args: SelectSubset<T, MaktabahContentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MaktabahContentClient<$Result.GetResult<Prisma.$MaktabahContentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first MaktabahContent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaktabahContentFindFirstArgs} args - Arguments to find a MaktabahContent
     * @example
     * // Get one MaktabahContent
     * const maktabahContent = await prisma.maktabahContent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MaktabahContentFindFirstArgs>(args?: SelectSubset<T, MaktabahContentFindFirstArgs<ExtArgs>>): Prisma__MaktabahContentClient<$Result.GetResult<Prisma.$MaktabahContentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first MaktabahContent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaktabahContentFindFirstOrThrowArgs} args - Arguments to find a MaktabahContent
     * @example
     * // Get one MaktabahContent
     * const maktabahContent = await prisma.maktabahContent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MaktabahContentFindFirstOrThrowArgs>(args?: SelectSubset<T, MaktabahContentFindFirstOrThrowArgs<ExtArgs>>): Prisma__MaktabahContentClient<$Result.GetResult<Prisma.$MaktabahContentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more MaktabahContents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaktabahContentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MaktabahContents
     * const maktabahContents = await prisma.maktabahContent.findMany()
     * 
     * // Get first 10 MaktabahContents
     * const maktabahContents = await prisma.maktabahContent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const maktabahContentWithIdOnly = await prisma.maktabahContent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MaktabahContentFindManyArgs>(args?: SelectSubset<T, MaktabahContentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaktabahContentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a MaktabahContent.
     * @param {MaktabahContentCreateArgs} args - Arguments to create a MaktabahContent.
     * @example
     * // Create one MaktabahContent
     * const MaktabahContent = await prisma.maktabahContent.create({
     *   data: {
     *     // ... data to create a MaktabahContent
     *   }
     * })
     * 
     */
    create<T extends MaktabahContentCreateArgs>(args: SelectSubset<T, MaktabahContentCreateArgs<ExtArgs>>): Prisma__MaktabahContentClient<$Result.GetResult<Prisma.$MaktabahContentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many MaktabahContents.
     * @param {MaktabahContentCreateManyArgs} args - Arguments to create many MaktabahContents.
     * @example
     * // Create many MaktabahContents
     * const maktabahContent = await prisma.maktabahContent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MaktabahContentCreateManyArgs>(args?: SelectSubset<T, MaktabahContentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MaktabahContents and returns the data saved in the database.
     * @param {MaktabahContentCreateManyAndReturnArgs} args - Arguments to create many MaktabahContents.
     * @example
     * // Create many MaktabahContents
     * const maktabahContent = await prisma.maktabahContent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MaktabahContents and only return the `id`
     * const maktabahContentWithIdOnly = await prisma.maktabahContent.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MaktabahContentCreateManyAndReturnArgs>(args?: SelectSubset<T, MaktabahContentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaktabahContentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a MaktabahContent.
     * @param {MaktabahContentDeleteArgs} args - Arguments to delete one MaktabahContent.
     * @example
     * // Delete one MaktabahContent
     * const MaktabahContent = await prisma.maktabahContent.delete({
     *   where: {
     *     // ... filter to delete one MaktabahContent
     *   }
     * })
     * 
     */
    delete<T extends MaktabahContentDeleteArgs>(args: SelectSubset<T, MaktabahContentDeleteArgs<ExtArgs>>): Prisma__MaktabahContentClient<$Result.GetResult<Prisma.$MaktabahContentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one MaktabahContent.
     * @param {MaktabahContentUpdateArgs} args - Arguments to update one MaktabahContent.
     * @example
     * // Update one MaktabahContent
     * const maktabahContent = await prisma.maktabahContent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MaktabahContentUpdateArgs>(args: SelectSubset<T, MaktabahContentUpdateArgs<ExtArgs>>): Prisma__MaktabahContentClient<$Result.GetResult<Prisma.$MaktabahContentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more MaktabahContents.
     * @param {MaktabahContentDeleteManyArgs} args - Arguments to filter MaktabahContents to delete.
     * @example
     * // Delete a few MaktabahContents
     * const { count } = await prisma.maktabahContent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MaktabahContentDeleteManyArgs>(args?: SelectSubset<T, MaktabahContentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MaktabahContents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaktabahContentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MaktabahContents
     * const maktabahContent = await prisma.maktabahContent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MaktabahContentUpdateManyArgs>(args: SelectSubset<T, MaktabahContentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MaktabahContent.
     * @param {MaktabahContentUpsertArgs} args - Arguments to update or create a MaktabahContent.
     * @example
     * // Update or create a MaktabahContent
     * const maktabahContent = await prisma.maktabahContent.upsert({
     *   create: {
     *     // ... data to create a MaktabahContent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MaktabahContent we want to update
     *   }
     * })
     */
    upsert<T extends MaktabahContentUpsertArgs>(args: SelectSubset<T, MaktabahContentUpsertArgs<ExtArgs>>): Prisma__MaktabahContentClient<$Result.GetResult<Prisma.$MaktabahContentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of MaktabahContents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaktabahContentCountArgs} args - Arguments to filter MaktabahContents to count.
     * @example
     * // Count the number of MaktabahContents
     * const count = await prisma.maktabahContent.count({
     *   where: {
     *     // ... the filter for the MaktabahContents we want to count
     *   }
     * })
    **/
    count<T extends MaktabahContentCountArgs>(
      args?: Subset<T, MaktabahContentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MaktabahContentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MaktabahContent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaktabahContentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MaktabahContentAggregateArgs>(args: Subset<T, MaktabahContentAggregateArgs>): Prisma.PrismaPromise<GetMaktabahContentAggregateType<T>>

    /**
     * Group by MaktabahContent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaktabahContentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MaktabahContentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MaktabahContentGroupByArgs['orderBy'] }
        : { orderBy?: MaktabahContentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MaktabahContentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMaktabahContentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MaktabahContent model
   */
  readonly fields: MaktabahContentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MaktabahContent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MaktabahContentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    book<T extends MaktabahBookDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MaktabahBookDefaultArgs<ExtArgs>>): Prisma__MaktabahBookClient<$Result.GetResult<Prisma.$MaktabahBookPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    chapter<T extends MaktabahContent$chapterArgs<ExtArgs> = {}>(args?: Subset<T, MaktabahContent$chapterArgs<ExtArgs>>): Prisma__MaktabahChapterClient<$Result.GetResult<Prisma.$MaktabahChapterPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MaktabahContent model
   */ 
  interface MaktabahContentFieldRefs {
    readonly id: FieldRef<"MaktabahContent", 'Int'>
    readonly bookId: FieldRef<"MaktabahContent", 'Int'>
    readonly chapterId: FieldRef<"MaktabahContent", 'Int'>
    readonly page: FieldRef<"MaktabahContent", 'Int'>
    readonly volume: FieldRef<"MaktabahContent", 'Int'>
    readonly contentAr: FieldRef<"MaktabahContent", 'String'>
    readonly contentText: FieldRef<"MaktabahContent", 'String'>
    readonly normalized: FieldRef<"MaktabahContent", 'String'>
    readonly searchText: FieldRef<"MaktabahContent", 'String'>
  }
    

  // Custom InputTypes
  /**
   * MaktabahContent findUnique
   */
  export type MaktabahContentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaktabahContent
     */
    select?: MaktabahContentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaktabahContentInclude<ExtArgs> | null
    /**
     * Filter, which MaktabahContent to fetch.
     */
    where: MaktabahContentWhereUniqueInput
  }

  /**
   * MaktabahContent findUniqueOrThrow
   */
  export type MaktabahContentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaktabahContent
     */
    select?: MaktabahContentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaktabahContentInclude<ExtArgs> | null
    /**
     * Filter, which MaktabahContent to fetch.
     */
    where: MaktabahContentWhereUniqueInput
  }

  /**
   * MaktabahContent findFirst
   */
  export type MaktabahContentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaktabahContent
     */
    select?: MaktabahContentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaktabahContentInclude<ExtArgs> | null
    /**
     * Filter, which MaktabahContent to fetch.
     */
    where?: MaktabahContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaktabahContents to fetch.
     */
    orderBy?: MaktabahContentOrderByWithRelationInput | MaktabahContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MaktabahContents.
     */
    cursor?: MaktabahContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaktabahContents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaktabahContents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MaktabahContents.
     */
    distinct?: MaktabahContentScalarFieldEnum | MaktabahContentScalarFieldEnum[]
  }

  /**
   * MaktabahContent findFirstOrThrow
   */
  export type MaktabahContentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaktabahContent
     */
    select?: MaktabahContentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaktabahContentInclude<ExtArgs> | null
    /**
     * Filter, which MaktabahContent to fetch.
     */
    where?: MaktabahContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaktabahContents to fetch.
     */
    orderBy?: MaktabahContentOrderByWithRelationInput | MaktabahContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MaktabahContents.
     */
    cursor?: MaktabahContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaktabahContents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaktabahContents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MaktabahContents.
     */
    distinct?: MaktabahContentScalarFieldEnum | MaktabahContentScalarFieldEnum[]
  }

  /**
   * MaktabahContent findMany
   */
  export type MaktabahContentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaktabahContent
     */
    select?: MaktabahContentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaktabahContentInclude<ExtArgs> | null
    /**
     * Filter, which MaktabahContents to fetch.
     */
    where?: MaktabahContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaktabahContents to fetch.
     */
    orderBy?: MaktabahContentOrderByWithRelationInput | MaktabahContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MaktabahContents.
     */
    cursor?: MaktabahContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaktabahContents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaktabahContents.
     */
    skip?: number
    distinct?: MaktabahContentScalarFieldEnum | MaktabahContentScalarFieldEnum[]
  }

  /**
   * MaktabahContent create
   */
  export type MaktabahContentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaktabahContent
     */
    select?: MaktabahContentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaktabahContentInclude<ExtArgs> | null
    /**
     * The data needed to create a MaktabahContent.
     */
    data: XOR<MaktabahContentCreateInput, MaktabahContentUncheckedCreateInput>
  }

  /**
   * MaktabahContent createMany
   */
  export type MaktabahContentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MaktabahContents.
     */
    data: MaktabahContentCreateManyInput | MaktabahContentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MaktabahContent createManyAndReturn
   */
  export type MaktabahContentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaktabahContent
     */
    select?: MaktabahContentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many MaktabahContents.
     */
    data: MaktabahContentCreateManyInput | MaktabahContentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaktabahContentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MaktabahContent update
   */
  export type MaktabahContentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaktabahContent
     */
    select?: MaktabahContentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaktabahContentInclude<ExtArgs> | null
    /**
     * The data needed to update a MaktabahContent.
     */
    data: XOR<MaktabahContentUpdateInput, MaktabahContentUncheckedUpdateInput>
    /**
     * Choose, which MaktabahContent to update.
     */
    where: MaktabahContentWhereUniqueInput
  }

  /**
   * MaktabahContent updateMany
   */
  export type MaktabahContentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MaktabahContents.
     */
    data: XOR<MaktabahContentUpdateManyMutationInput, MaktabahContentUncheckedUpdateManyInput>
    /**
     * Filter which MaktabahContents to update
     */
    where?: MaktabahContentWhereInput
  }

  /**
   * MaktabahContent upsert
   */
  export type MaktabahContentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaktabahContent
     */
    select?: MaktabahContentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaktabahContentInclude<ExtArgs> | null
    /**
     * The filter to search for the MaktabahContent to update in case it exists.
     */
    where: MaktabahContentWhereUniqueInput
    /**
     * In case the MaktabahContent found by the `where` argument doesn't exist, create a new MaktabahContent with this data.
     */
    create: XOR<MaktabahContentCreateInput, MaktabahContentUncheckedCreateInput>
    /**
     * In case the MaktabahContent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MaktabahContentUpdateInput, MaktabahContentUncheckedUpdateInput>
  }

  /**
   * MaktabahContent delete
   */
  export type MaktabahContentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaktabahContent
     */
    select?: MaktabahContentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaktabahContentInclude<ExtArgs> | null
    /**
     * Filter which MaktabahContent to delete.
     */
    where: MaktabahContentWhereUniqueInput
  }

  /**
   * MaktabahContent deleteMany
   */
  export type MaktabahContentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MaktabahContents to delete
     */
    where?: MaktabahContentWhereInput
  }

  /**
   * MaktabahContent.chapter
   */
  export type MaktabahContent$chapterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaktabahChapter
     */
    select?: MaktabahChapterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaktabahChapterInclude<ExtArgs> | null
    where?: MaktabahChapterWhereInput
  }

  /**
   * MaktabahContent without action
   */
  export type MaktabahContentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaktabahContent
     */
    select?: MaktabahContentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaktabahContentInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const MaktabahBookScalarFieldEnum: {
    id: 'id',
    title: 'title',
    titleAr: 'titleAr',
    author: 'author',
    authorAr: 'authorAr',
    category: 'category',
    source: 'source',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MaktabahBookScalarFieldEnum = (typeof MaktabahBookScalarFieldEnum)[keyof typeof MaktabahBookScalarFieldEnum]


  export const MaktabahChapterScalarFieldEnum: {
    id: 'id',
    bookId: 'bookId',
    title: 'title',
    titleAr: 'titleAr',
    orderNo: 'orderNo'
  };

  export type MaktabahChapterScalarFieldEnum = (typeof MaktabahChapterScalarFieldEnum)[keyof typeof MaktabahChapterScalarFieldEnum]


  export const MaktabahContentScalarFieldEnum: {
    id: 'id',
    bookId: 'bookId',
    chapterId: 'chapterId',
    page: 'page',
    volume: 'volume',
    contentAr: 'contentAr',
    contentText: 'contentText',
    normalized: 'normalized',
    searchText: 'searchText'
  };

  export type MaktabahContentScalarFieldEnum = (typeof MaktabahContentScalarFieldEnum)[keyof typeof MaktabahContentScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type MaktabahBookWhereInput = {
    AND?: MaktabahBookWhereInput | MaktabahBookWhereInput[]
    OR?: MaktabahBookWhereInput[]
    NOT?: MaktabahBookWhereInput | MaktabahBookWhereInput[]
    id?: IntFilter<"MaktabahBook"> | number
    title?: StringFilter<"MaktabahBook"> | string
    titleAr?: StringNullableFilter<"MaktabahBook"> | string | null
    author?: StringNullableFilter<"MaktabahBook"> | string | null
    authorAr?: StringNullableFilter<"MaktabahBook"> | string | null
    category?: StringNullableFilter<"MaktabahBook"> | string | null
    source?: StringNullableFilter<"MaktabahBook"> | string | null
    createdAt?: DateTimeNullableFilter<"MaktabahBook"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"MaktabahBook"> | Date | string | null
    chapters?: MaktabahChapterListRelationFilter
    contents?: MaktabahContentListRelationFilter
  }

  export type MaktabahBookOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    titleAr?: SortOrderInput | SortOrder
    author?: SortOrderInput | SortOrder
    authorAr?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    chapters?: MaktabahChapterOrderByRelationAggregateInput
    contents?: MaktabahContentOrderByRelationAggregateInput
  }

  export type MaktabahBookWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MaktabahBookWhereInput | MaktabahBookWhereInput[]
    OR?: MaktabahBookWhereInput[]
    NOT?: MaktabahBookWhereInput | MaktabahBookWhereInput[]
    title?: StringFilter<"MaktabahBook"> | string
    titleAr?: StringNullableFilter<"MaktabahBook"> | string | null
    author?: StringNullableFilter<"MaktabahBook"> | string | null
    authorAr?: StringNullableFilter<"MaktabahBook"> | string | null
    category?: StringNullableFilter<"MaktabahBook"> | string | null
    source?: StringNullableFilter<"MaktabahBook"> | string | null
    createdAt?: DateTimeNullableFilter<"MaktabahBook"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"MaktabahBook"> | Date | string | null
    chapters?: MaktabahChapterListRelationFilter
    contents?: MaktabahContentListRelationFilter
  }, "id">

  export type MaktabahBookOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    titleAr?: SortOrderInput | SortOrder
    author?: SortOrderInput | SortOrder
    authorAr?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: MaktabahBookCountOrderByAggregateInput
    _avg?: MaktabahBookAvgOrderByAggregateInput
    _max?: MaktabahBookMaxOrderByAggregateInput
    _min?: MaktabahBookMinOrderByAggregateInput
    _sum?: MaktabahBookSumOrderByAggregateInput
  }

  export type MaktabahBookScalarWhereWithAggregatesInput = {
    AND?: MaktabahBookScalarWhereWithAggregatesInput | MaktabahBookScalarWhereWithAggregatesInput[]
    OR?: MaktabahBookScalarWhereWithAggregatesInput[]
    NOT?: MaktabahBookScalarWhereWithAggregatesInput | MaktabahBookScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"MaktabahBook"> | number
    title?: StringWithAggregatesFilter<"MaktabahBook"> | string
    titleAr?: StringNullableWithAggregatesFilter<"MaktabahBook"> | string | null
    author?: StringNullableWithAggregatesFilter<"MaktabahBook"> | string | null
    authorAr?: StringNullableWithAggregatesFilter<"MaktabahBook"> | string | null
    category?: StringNullableWithAggregatesFilter<"MaktabahBook"> | string | null
    source?: StringNullableWithAggregatesFilter<"MaktabahBook"> | string | null
    createdAt?: DateTimeNullableWithAggregatesFilter<"MaktabahBook"> | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"MaktabahBook"> | Date | string | null
  }

  export type MaktabahChapterWhereInput = {
    AND?: MaktabahChapterWhereInput | MaktabahChapterWhereInput[]
    OR?: MaktabahChapterWhereInput[]
    NOT?: MaktabahChapterWhereInput | MaktabahChapterWhereInput[]
    id?: IntFilter<"MaktabahChapter"> | number
    bookId?: IntFilter<"MaktabahChapter"> | number
    title?: StringFilter<"MaktabahChapter"> | string
    titleAr?: StringNullableFilter<"MaktabahChapter"> | string | null
    orderNo?: IntNullableFilter<"MaktabahChapter"> | number | null
    book?: XOR<MaktabahBookRelationFilter, MaktabahBookWhereInput>
    contents?: MaktabahContentListRelationFilter
  }

  export type MaktabahChapterOrderByWithRelationInput = {
    id?: SortOrder
    bookId?: SortOrder
    title?: SortOrder
    titleAr?: SortOrderInput | SortOrder
    orderNo?: SortOrderInput | SortOrder
    book?: MaktabahBookOrderByWithRelationInput
    contents?: MaktabahContentOrderByRelationAggregateInput
  }

  export type MaktabahChapterWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MaktabahChapterWhereInput | MaktabahChapterWhereInput[]
    OR?: MaktabahChapterWhereInput[]
    NOT?: MaktabahChapterWhereInput | MaktabahChapterWhereInput[]
    bookId?: IntFilter<"MaktabahChapter"> | number
    title?: StringFilter<"MaktabahChapter"> | string
    titleAr?: StringNullableFilter<"MaktabahChapter"> | string | null
    orderNo?: IntNullableFilter<"MaktabahChapter"> | number | null
    book?: XOR<MaktabahBookRelationFilter, MaktabahBookWhereInput>
    contents?: MaktabahContentListRelationFilter
  }, "id">

  export type MaktabahChapterOrderByWithAggregationInput = {
    id?: SortOrder
    bookId?: SortOrder
    title?: SortOrder
    titleAr?: SortOrderInput | SortOrder
    orderNo?: SortOrderInput | SortOrder
    _count?: MaktabahChapterCountOrderByAggregateInput
    _avg?: MaktabahChapterAvgOrderByAggregateInput
    _max?: MaktabahChapterMaxOrderByAggregateInput
    _min?: MaktabahChapterMinOrderByAggregateInput
    _sum?: MaktabahChapterSumOrderByAggregateInput
  }

  export type MaktabahChapterScalarWhereWithAggregatesInput = {
    AND?: MaktabahChapterScalarWhereWithAggregatesInput | MaktabahChapterScalarWhereWithAggregatesInput[]
    OR?: MaktabahChapterScalarWhereWithAggregatesInput[]
    NOT?: MaktabahChapterScalarWhereWithAggregatesInput | MaktabahChapterScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"MaktabahChapter"> | number
    bookId?: IntWithAggregatesFilter<"MaktabahChapter"> | number
    title?: StringWithAggregatesFilter<"MaktabahChapter"> | string
    titleAr?: StringNullableWithAggregatesFilter<"MaktabahChapter"> | string | null
    orderNo?: IntNullableWithAggregatesFilter<"MaktabahChapter"> | number | null
  }

  export type MaktabahContentWhereInput = {
    AND?: MaktabahContentWhereInput | MaktabahContentWhereInput[]
    OR?: MaktabahContentWhereInput[]
    NOT?: MaktabahContentWhereInput | MaktabahContentWhereInput[]
    id?: IntFilter<"MaktabahContent"> | number
    bookId?: IntFilter<"MaktabahContent"> | number
    chapterId?: IntNullableFilter<"MaktabahContent"> | number | null
    page?: IntNullableFilter<"MaktabahContent"> | number | null
    volume?: IntNullableFilter<"MaktabahContent"> | number | null
    contentAr?: StringFilter<"MaktabahContent"> | string
    contentText?: StringNullableFilter<"MaktabahContent"> | string | null
    normalized?: StringNullableFilter<"MaktabahContent"> | string | null
    searchText?: StringNullableFilter<"MaktabahContent"> | string | null
    book?: XOR<MaktabahBookRelationFilter, MaktabahBookWhereInput>
    chapter?: XOR<MaktabahChapterNullableRelationFilter, MaktabahChapterWhereInput> | null
  }

  export type MaktabahContentOrderByWithRelationInput = {
    id?: SortOrder
    bookId?: SortOrder
    chapterId?: SortOrderInput | SortOrder
    page?: SortOrderInput | SortOrder
    volume?: SortOrderInput | SortOrder
    contentAr?: SortOrder
    contentText?: SortOrderInput | SortOrder
    normalized?: SortOrderInput | SortOrder
    searchText?: SortOrderInput | SortOrder
    book?: MaktabahBookOrderByWithRelationInput
    chapter?: MaktabahChapterOrderByWithRelationInput
  }

  export type MaktabahContentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MaktabahContentWhereInput | MaktabahContentWhereInput[]
    OR?: MaktabahContentWhereInput[]
    NOT?: MaktabahContentWhereInput | MaktabahContentWhereInput[]
    bookId?: IntFilter<"MaktabahContent"> | number
    chapterId?: IntNullableFilter<"MaktabahContent"> | number | null
    page?: IntNullableFilter<"MaktabahContent"> | number | null
    volume?: IntNullableFilter<"MaktabahContent"> | number | null
    contentAr?: StringFilter<"MaktabahContent"> | string
    contentText?: StringNullableFilter<"MaktabahContent"> | string | null
    normalized?: StringNullableFilter<"MaktabahContent"> | string | null
    searchText?: StringNullableFilter<"MaktabahContent"> | string | null
    book?: XOR<MaktabahBookRelationFilter, MaktabahBookWhereInput>
    chapter?: XOR<MaktabahChapterNullableRelationFilter, MaktabahChapterWhereInput> | null
  }, "id">

  export type MaktabahContentOrderByWithAggregationInput = {
    id?: SortOrder
    bookId?: SortOrder
    chapterId?: SortOrderInput | SortOrder
    page?: SortOrderInput | SortOrder
    volume?: SortOrderInput | SortOrder
    contentAr?: SortOrder
    contentText?: SortOrderInput | SortOrder
    normalized?: SortOrderInput | SortOrder
    searchText?: SortOrderInput | SortOrder
    _count?: MaktabahContentCountOrderByAggregateInput
    _avg?: MaktabahContentAvgOrderByAggregateInput
    _max?: MaktabahContentMaxOrderByAggregateInput
    _min?: MaktabahContentMinOrderByAggregateInput
    _sum?: MaktabahContentSumOrderByAggregateInput
  }

  export type MaktabahContentScalarWhereWithAggregatesInput = {
    AND?: MaktabahContentScalarWhereWithAggregatesInput | MaktabahContentScalarWhereWithAggregatesInput[]
    OR?: MaktabahContentScalarWhereWithAggregatesInput[]
    NOT?: MaktabahContentScalarWhereWithAggregatesInput | MaktabahContentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"MaktabahContent"> | number
    bookId?: IntWithAggregatesFilter<"MaktabahContent"> | number
    chapterId?: IntNullableWithAggregatesFilter<"MaktabahContent"> | number | null
    page?: IntNullableWithAggregatesFilter<"MaktabahContent"> | number | null
    volume?: IntNullableWithAggregatesFilter<"MaktabahContent"> | number | null
    contentAr?: StringWithAggregatesFilter<"MaktabahContent"> | string
    contentText?: StringNullableWithAggregatesFilter<"MaktabahContent"> | string | null
    normalized?: StringNullableWithAggregatesFilter<"MaktabahContent"> | string | null
    searchText?: StringNullableWithAggregatesFilter<"MaktabahContent"> | string | null
  }

  export type MaktabahBookCreateInput = {
    id: number
    title: string
    titleAr?: string | null
    author?: string | null
    authorAr?: string | null
    category?: string | null
    source?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    chapters?: MaktabahChapterCreateNestedManyWithoutBookInput
    contents?: MaktabahContentCreateNestedManyWithoutBookInput
  }

  export type MaktabahBookUncheckedCreateInput = {
    id: number
    title: string
    titleAr?: string | null
    author?: string | null
    authorAr?: string | null
    category?: string | null
    source?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    chapters?: MaktabahChapterUncheckedCreateNestedManyWithoutBookInput
    contents?: MaktabahContentUncheckedCreateNestedManyWithoutBookInput
  }

  export type MaktabahBookUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    titleAr?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    authorAr?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    chapters?: MaktabahChapterUpdateManyWithoutBookNestedInput
    contents?: MaktabahContentUpdateManyWithoutBookNestedInput
  }

  export type MaktabahBookUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    titleAr?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    authorAr?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    chapters?: MaktabahChapterUncheckedUpdateManyWithoutBookNestedInput
    contents?: MaktabahContentUncheckedUpdateManyWithoutBookNestedInput
  }

  export type MaktabahBookCreateManyInput = {
    id: number
    title: string
    titleAr?: string | null
    author?: string | null
    authorAr?: string | null
    category?: string | null
    source?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type MaktabahBookUpdateManyMutationInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    titleAr?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    authorAr?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MaktabahBookUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    titleAr?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    authorAr?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MaktabahChapterCreateInput = {
    id: number
    title: string
    titleAr?: string | null
    orderNo?: number | null
    book: MaktabahBookCreateNestedOneWithoutChaptersInput
    contents?: MaktabahContentCreateNestedManyWithoutChapterInput
  }

  export type MaktabahChapterUncheckedCreateInput = {
    id: number
    bookId: number
    title: string
    titleAr?: string | null
    orderNo?: number | null
    contents?: MaktabahContentUncheckedCreateNestedManyWithoutChapterInput
  }

  export type MaktabahChapterUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    titleAr?: NullableStringFieldUpdateOperationsInput | string | null
    orderNo?: NullableIntFieldUpdateOperationsInput | number | null
    book?: MaktabahBookUpdateOneRequiredWithoutChaptersNestedInput
    contents?: MaktabahContentUpdateManyWithoutChapterNestedInput
  }

  export type MaktabahChapterUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    bookId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    titleAr?: NullableStringFieldUpdateOperationsInput | string | null
    orderNo?: NullableIntFieldUpdateOperationsInput | number | null
    contents?: MaktabahContentUncheckedUpdateManyWithoutChapterNestedInput
  }

  export type MaktabahChapterCreateManyInput = {
    id: number
    bookId: number
    title: string
    titleAr?: string | null
    orderNo?: number | null
  }

  export type MaktabahChapterUpdateManyMutationInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    titleAr?: NullableStringFieldUpdateOperationsInput | string | null
    orderNo?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type MaktabahChapterUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    bookId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    titleAr?: NullableStringFieldUpdateOperationsInput | string | null
    orderNo?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type MaktabahContentCreateInput = {
    id: number
    page?: number | null
    volume?: number | null
    contentAr: string
    contentText?: string | null
    normalized?: string | null
    searchText?: string | null
    book: MaktabahBookCreateNestedOneWithoutContentsInput
    chapter?: MaktabahChapterCreateNestedOneWithoutContentsInput
  }

  export type MaktabahContentUncheckedCreateInput = {
    id: number
    bookId: number
    chapterId?: number | null
    page?: number | null
    volume?: number | null
    contentAr: string
    contentText?: string | null
    normalized?: string | null
    searchText?: string | null
  }

  export type MaktabahContentUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    page?: NullableIntFieldUpdateOperationsInput | number | null
    volume?: NullableIntFieldUpdateOperationsInput | number | null
    contentAr?: StringFieldUpdateOperationsInput | string
    contentText?: NullableStringFieldUpdateOperationsInput | string | null
    normalized?: NullableStringFieldUpdateOperationsInput | string | null
    searchText?: NullableStringFieldUpdateOperationsInput | string | null
    book?: MaktabahBookUpdateOneRequiredWithoutContentsNestedInput
    chapter?: MaktabahChapterUpdateOneWithoutContentsNestedInput
  }

  export type MaktabahContentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    bookId?: IntFieldUpdateOperationsInput | number
    chapterId?: NullableIntFieldUpdateOperationsInput | number | null
    page?: NullableIntFieldUpdateOperationsInput | number | null
    volume?: NullableIntFieldUpdateOperationsInput | number | null
    contentAr?: StringFieldUpdateOperationsInput | string
    contentText?: NullableStringFieldUpdateOperationsInput | string | null
    normalized?: NullableStringFieldUpdateOperationsInput | string | null
    searchText?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MaktabahContentCreateManyInput = {
    id: number
    bookId: number
    chapterId?: number | null
    page?: number | null
    volume?: number | null
    contentAr: string
    contentText?: string | null
    normalized?: string | null
    searchText?: string | null
  }

  export type MaktabahContentUpdateManyMutationInput = {
    id?: IntFieldUpdateOperationsInput | number
    page?: NullableIntFieldUpdateOperationsInput | number | null
    volume?: NullableIntFieldUpdateOperationsInput | number | null
    contentAr?: StringFieldUpdateOperationsInput | string
    contentText?: NullableStringFieldUpdateOperationsInput | string | null
    normalized?: NullableStringFieldUpdateOperationsInput | string | null
    searchText?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MaktabahContentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    bookId?: IntFieldUpdateOperationsInput | number
    chapterId?: NullableIntFieldUpdateOperationsInput | number | null
    page?: NullableIntFieldUpdateOperationsInput | number | null
    volume?: NullableIntFieldUpdateOperationsInput | number | null
    contentAr?: StringFieldUpdateOperationsInput | string
    contentText?: NullableStringFieldUpdateOperationsInput | string | null
    normalized?: NullableStringFieldUpdateOperationsInput | string | null
    searchText?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type MaktabahChapterListRelationFilter = {
    every?: MaktabahChapterWhereInput
    some?: MaktabahChapterWhereInput
    none?: MaktabahChapterWhereInput
  }

  export type MaktabahContentListRelationFilter = {
    every?: MaktabahContentWhereInput
    some?: MaktabahContentWhereInput
    none?: MaktabahContentWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MaktabahChapterOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MaktabahContentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MaktabahBookCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    titleAr?: SortOrder
    author?: SortOrder
    authorAr?: SortOrder
    category?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MaktabahBookAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type MaktabahBookMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    titleAr?: SortOrder
    author?: SortOrder
    authorAr?: SortOrder
    category?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MaktabahBookMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    titleAr?: SortOrder
    author?: SortOrder
    authorAr?: SortOrder
    category?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MaktabahBookSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type MaktabahBookRelationFilter = {
    is?: MaktabahBookWhereInput
    isNot?: MaktabahBookWhereInput
  }

  export type MaktabahChapterCountOrderByAggregateInput = {
    id?: SortOrder
    bookId?: SortOrder
    title?: SortOrder
    titleAr?: SortOrder
    orderNo?: SortOrder
  }

  export type MaktabahChapterAvgOrderByAggregateInput = {
    id?: SortOrder
    bookId?: SortOrder
    orderNo?: SortOrder
  }

  export type MaktabahChapterMaxOrderByAggregateInput = {
    id?: SortOrder
    bookId?: SortOrder
    title?: SortOrder
    titleAr?: SortOrder
    orderNo?: SortOrder
  }

  export type MaktabahChapterMinOrderByAggregateInput = {
    id?: SortOrder
    bookId?: SortOrder
    title?: SortOrder
    titleAr?: SortOrder
    orderNo?: SortOrder
  }

  export type MaktabahChapterSumOrderByAggregateInput = {
    id?: SortOrder
    bookId?: SortOrder
    orderNo?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type MaktabahChapterNullableRelationFilter = {
    is?: MaktabahChapterWhereInput | null
    isNot?: MaktabahChapterWhereInput | null
  }

  export type MaktabahContentCountOrderByAggregateInput = {
    id?: SortOrder
    bookId?: SortOrder
    chapterId?: SortOrder
    page?: SortOrder
    volume?: SortOrder
    contentAr?: SortOrder
    contentText?: SortOrder
    normalized?: SortOrder
    searchText?: SortOrder
  }

  export type MaktabahContentAvgOrderByAggregateInput = {
    id?: SortOrder
    bookId?: SortOrder
    chapterId?: SortOrder
    page?: SortOrder
    volume?: SortOrder
  }

  export type MaktabahContentMaxOrderByAggregateInput = {
    id?: SortOrder
    bookId?: SortOrder
    chapterId?: SortOrder
    page?: SortOrder
    volume?: SortOrder
    contentAr?: SortOrder
    contentText?: SortOrder
    normalized?: SortOrder
    searchText?: SortOrder
  }

  export type MaktabahContentMinOrderByAggregateInput = {
    id?: SortOrder
    bookId?: SortOrder
    chapterId?: SortOrder
    page?: SortOrder
    volume?: SortOrder
    contentAr?: SortOrder
    contentText?: SortOrder
    normalized?: SortOrder
    searchText?: SortOrder
  }

  export type MaktabahContentSumOrderByAggregateInput = {
    id?: SortOrder
    bookId?: SortOrder
    chapterId?: SortOrder
    page?: SortOrder
    volume?: SortOrder
  }

  export type MaktabahChapterCreateNestedManyWithoutBookInput = {
    create?: XOR<MaktabahChapterCreateWithoutBookInput, MaktabahChapterUncheckedCreateWithoutBookInput> | MaktabahChapterCreateWithoutBookInput[] | MaktabahChapterUncheckedCreateWithoutBookInput[]
    connectOrCreate?: MaktabahChapterCreateOrConnectWithoutBookInput | MaktabahChapterCreateOrConnectWithoutBookInput[]
    createMany?: MaktabahChapterCreateManyBookInputEnvelope
    connect?: MaktabahChapterWhereUniqueInput | MaktabahChapterWhereUniqueInput[]
  }

  export type MaktabahContentCreateNestedManyWithoutBookInput = {
    create?: XOR<MaktabahContentCreateWithoutBookInput, MaktabahContentUncheckedCreateWithoutBookInput> | MaktabahContentCreateWithoutBookInput[] | MaktabahContentUncheckedCreateWithoutBookInput[]
    connectOrCreate?: MaktabahContentCreateOrConnectWithoutBookInput | MaktabahContentCreateOrConnectWithoutBookInput[]
    createMany?: MaktabahContentCreateManyBookInputEnvelope
    connect?: MaktabahContentWhereUniqueInput | MaktabahContentWhereUniqueInput[]
  }

  export type MaktabahChapterUncheckedCreateNestedManyWithoutBookInput = {
    create?: XOR<MaktabahChapterCreateWithoutBookInput, MaktabahChapterUncheckedCreateWithoutBookInput> | MaktabahChapterCreateWithoutBookInput[] | MaktabahChapterUncheckedCreateWithoutBookInput[]
    connectOrCreate?: MaktabahChapterCreateOrConnectWithoutBookInput | MaktabahChapterCreateOrConnectWithoutBookInput[]
    createMany?: MaktabahChapterCreateManyBookInputEnvelope
    connect?: MaktabahChapterWhereUniqueInput | MaktabahChapterWhereUniqueInput[]
  }

  export type MaktabahContentUncheckedCreateNestedManyWithoutBookInput = {
    create?: XOR<MaktabahContentCreateWithoutBookInput, MaktabahContentUncheckedCreateWithoutBookInput> | MaktabahContentCreateWithoutBookInput[] | MaktabahContentUncheckedCreateWithoutBookInput[]
    connectOrCreate?: MaktabahContentCreateOrConnectWithoutBookInput | MaktabahContentCreateOrConnectWithoutBookInput[]
    createMany?: MaktabahContentCreateManyBookInputEnvelope
    connect?: MaktabahContentWhereUniqueInput | MaktabahContentWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type MaktabahChapterUpdateManyWithoutBookNestedInput = {
    create?: XOR<MaktabahChapterCreateWithoutBookInput, MaktabahChapterUncheckedCreateWithoutBookInput> | MaktabahChapterCreateWithoutBookInput[] | MaktabahChapterUncheckedCreateWithoutBookInput[]
    connectOrCreate?: MaktabahChapterCreateOrConnectWithoutBookInput | MaktabahChapterCreateOrConnectWithoutBookInput[]
    upsert?: MaktabahChapterUpsertWithWhereUniqueWithoutBookInput | MaktabahChapterUpsertWithWhereUniqueWithoutBookInput[]
    createMany?: MaktabahChapterCreateManyBookInputEnvelope
    set?: MaktabahChapterWhereUniqueInput | MaktabahChapterWhereUniqueInput[]
    disconnect?: MaktabahChapterWhereUniqueInput | MaktabahChapterWhereUniqueInput[]
    delete?: MaktabahChapterWhereUniqueInput | MaktabahChapterWhereUniqueInput[]
    connect?: MaktabahChapterWhereUniqueInput | MaktabahChapterWhereUniqueInput[]
    update?: MaktabahChapterUpdateWithWhereUniqueWithoutBookInput | MaktabahChapterUpdateWithWhereUniqueWithoutBookInput[]
    updateMany?: MaktabahChapterUpdateManyWithWhereWithoutBookInput | MaktabahChapterUpdateManyWithWhereWithoutBookInput[]
    deleteMany?: MaktabahChapterScalarWhereInput | MaktabahChapterScalarWhereInput[]
  }

  export type MaktabahContentUpdateManyWithoutBookNestedInput = {
    create?: XOR<MaktabahContentCreateWithoutBookInput, MaktabahContentUncheckedCreateWithoutBookInput> | MaktabahContentCreateWithoutBookInput[] | MaktabahContentUncheckedCreateWithoutBookInput[]
    connectOrCreate?: MaktabahContentCreateOrConnectWithoutBookInput | MaktabahContentCreateOrConnectWithoutBookInput[]
    upsert?: MaktabahContentUpsertWithWhereUniqueWithoutBookInput | MaktabahContentUpsertWithWhereUniqueWithoutBookInput[]
    createMany?: MaktabahContentCreateManyBookInputEnvelope
    set?: MaktabahContentWhereUniqueInput | MaktabahContentWhereUniqueInput[]
    disconnect?: MaktabahContentWhereUniqueInput | MaktabahContentWhereUniqueInput[]
    delete?: MaktabahContentWhereUniqueInput | MaktabahContentWhereUniqueInput[]
    connect?: MaktabahContentWhereUniqueInput | MaktabahContentWhereUniqueInput[]
    update?: MaktabahContentUpdateWithWhereUniqueWithoutBookInput | MaktabahContentUpdateWithWhereUniqueWithoutBookInput[]
    updateMany?: MaktabahContentUpdateManyWithWhereWithoutBookInput | MaktabahContentUpdateManyWithWhereWithoutBookInput[]
    deleteMany?: MaktabahContentScalarWhereInput | MaktabahContentScalarWhereInput[]
  }

  export type MaktabahChapterUncheckedUpdateManyWithoutBookNestedInput = {
    create?: XOR<MaktabahChapterCreateWithoutBookInput, MaktabahChapterUncheckedCreateWithoutBookInput> | MaktabahChapterCreateWithoutBookInput[] | MaktabahChapterUncheckedCreateWithoutBookInput[]
    connectOrCreate?: MaktabahChapterCreateOrConnectWithoutBookInput | MaktabahChapterCreateOrConnectWithoutBookInput[]
    upsert?: MaktabahChapterUpsertWithWhereUniqueWithoutBookInput | MaktabahChapterUpsertWithWhereUniqueWithoutBookInput[]
    createMany?: MaktabahChapterCreateManyBookInputEnvelope
    set?: MaktabahChapterWhereUniqueInput | MaktabahChapterWhereUniqueInput[]
    disconnect?: MaktabahChapterWhereUniqueInput | MaktabahChapterWhereUniqueInput[]
    delete?: MaktabahChapterWhereUniqueInput | MaktabahChapterWhereUniqueInput[]
    connect?: MaktabahChapterWhereUniqueInput | MaktabahChapterWhereUniqueInput[]
    update?: MaktabahChapterUpdateWithWhereUniqueWithoutBookInput | MaktabahChapterUpdateWithWhereUniqueWithoutBookInput[]
    updateMany?: MaktabahChapterUpdateManyWithWhereWithoutBookInput | MaktabahChapterUpdateManyWithWhereWithoutBookInput[]
    deleteMany?: MaktabahChapterScalarWhereInput | MaktabahChapterScalarWhereInput[]
  }

  export type MaktabahContentUncheckedUpdateManyWithoutBookNestedInput = {
    create?: XOR<MaktabahContentCreateWithoutBookInput, MaktabahContentUncheckedCreateWithoutBookInput> | MaktabahContentCreateWithoutBookInput[] | MaktabahContentUncheckedCreateWithoutBookInput[]
    connectOrCreate?: MaktabahContentCreateOrConnectWithoutBookInput | MaktabahContentCreateOrConnectWithoutBookInput[]
    upsert?: MaktabahContentUpsertWithWhereUniqueWithoutBookInput | MaktabahContentUpsertWithWhereUniqueWithoutBookInput[]
    createMany?: MaktabahContentCreateManyBookInputEnvelope
    set?: MaktabahContentWhereUniqueInput | MaktabahContentWhereUniqueInput[]
    disconnect?: MaktabahContentWhereUniqueInput | MaktabahContentWhereUniqueInput[]
    delete?: MaktabahContentWhereUniqueInput | MaktabahContentWhereUniqueInput[]
    connect?: MaktabahContentWhereUniqueInput | MaktabahContentWhereUniqueInput[]
    update?: MaktabahContentUpdateWithWhereUniqueWithoutBookInput | MaktabahContentUpdateWithWhereUniqueWithoutBookInput[]
    updateMany?: MaktabahContentUpdateManyWithWhereWithoutBookInput | MaktabahContentUpdateManyWithWhereWithoutBookInput[]
    deleteMany?: MaktabahContentScalarWhereInput | MaktabahContentScalarWhereInput[]
  }

  export type MaktabahBookCreateNestedOneWithoutChaptersInput = {
    create?: XOR<MaktabahBookCreateWithoutChaptersInput, MaktabahBookUncheckedCreateWithoutChaptersInput>
    connectOrCreate?: MaktabahBookCreateOrConnectWithoutChaptersInput
    connect?: MaktabahBookWhereUniqueInput
  }

  export type MaktabahContentCreateNestedManyWithoutChapterInput = {
    create?: XOR<MaktabahContentCreateWithoutChapterInput, MaktabahContentUncheckedCreateWithoutChapterInput> | MaktabahContentCreateWithoutChapterInput[] | MaktabahContentUncheckedCreateWithoutChapterInput[]
    connectOrCreate?: MaktabahContentCreateOrConnectWithoutChapterInput | MaktabahContentCreateOrConnectWithoutChapterInput[]
    createMany?: MaktabahContentCreateManyChapterInputEnvelope
    connect?: MaktabahContentWhereUniqueInput | MaktabahContentWhereUniqueInput[]
  }

  export type MaktabahContentUncheckedCreateNestedManyWithoutChapterInput = {
    create?: XOR<MaktabahContentCreateWithoutChapterInput, MaktabahContentUncheckedCreateWithoutChapterInput> | MaktabahContentCreateWithoutChapterInput[] | MaktabahContentUncheckedCreateWithoutChapterInput[]
    connectOrCreate?: MaktabahContentCreateOrConnectWithoutChapterInput | MaktabahContentCreateOrConnectWithoutChapterInput[]
    createMany?: MaktabahContentCreateManyChapterInputEnvelope
    connect?: MaktabahContentWhereUniqueInput | MaktabahContentWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type MaktabahBookUpdateOneRequiredWithoutChaptersNestedInput = {
    create?: XOR<MaktabahBookCreateWithoutChaptersInput, MaktabahBookUncheckedCreateWithoutChaptersInput>
    connectOrCreate?: MaktabahBookCreateOrConnectWithoutChaptersInput
    upsert?: MaktabahBookUpsertWithoutChaptersInput
    connect?: MaktabahBookWhereUniqueInput
    update?: XOR<XOR<MaktabahBookUpdateToOneWithWhereWithoutChaptersInput, MaktabahBookUpdateWithoutChaptersInput>, MaktabahBookUncheckedUpdateWithoutChaptersInput>
  }

  export type MaktabahContentUpdateManyWithoutChapterNestedInput = {
    create?: XOR<MaktabahContentCreateWithoutChapterInput, MaktabahContentUncheckedCreateWithoutChapterInput> | MaktabahContentCreateWithoutChapterInput[] | MaktabahContentUncheckedCreateWithoutChapterInput[]
    connectOrCreate?: MaktabahContentCreateOrConnectWithoutChapterInput | MaktabahContentCreateOrConnectWithoutChapterInput[]
    upsert?: MaktabahContentUpsertWithWhereUniqueWithoutChapterInput | MaktabahContentUpsertWithWhereUniqueWithoutChapterInput[]
    createMany?: MaktabahContentCreateManyChapterInputEnvelope
    set?: MaktabahContentWhereUniqueInput | MaktabahContentWhereUniqueInput[]
    disconnect?: MaktabahContentWhereUniqueInput | MaktabahContentWhereUniqueInput[]
    delete?: MaktabahContentWhereUniqueInput | MaktabahContentWhereUniqueInput[]
    connect?: MaktabahContentWhereUniqueInput | MaktabahContentWhereUniqueInput[]
    update?: MaktabahContentUpdateWithWhereUniqueWithoutChapterInput | MaktabahContentUpdateWithWhereUniqueWithoutChapterInput[]
    updateMany?: MaktabahContentUpdateManyWithWhereWithoutChapterInput | MaktabahContentUpdateManyWithWhereWithoutChapterInput[]
    deleteMany?: MaktabahContentScalarWhereInput | MaktabahContentScalarWhereInput[]
  }

  export type MaktabahContentUncheckedUpdateManyWithoutChapterNestedInput = {
    create?: XOR<MaktabahContentCreateWithoutChapterInput, MaktabahContentUncheckedCreateWithoutChapterInput> | MaktabahContentCreateWithoutChapterInput[] | MaktabahContentUncheckedCreateWithoutChapterInput[]
    connectOrCreate?: MaktabahContentCreateOrConnectWithoutChapterInput | MaktabahContentCreateOrConnectWithoutChapterInput[]
    upsert?: MaktabahContentUpsertWithWhereUniqueWithoutChapterInput | MaktabahContentUpsertWithWhereUniqueWithoutChapterInput[]
    createMany?: MaktabahContentCreateManyChapterInputEnvelope
    set?: MaktabahContentWhereUniqueInput | MaktabahContentWhereUniqueInput[]
    disconnect?: MaktabahContentWhereUniqueInput | MaktabahContentWhereUniqueInput[]
    delete?: MaktabahContentWhereUniqueInput | MaktabahContentWhereUniqueInput[]
    connect?: MaktabahContentWhereUniqueInput | MaktabahContentWhereUniqueInput[]
    update?: MaktabahContentUpdateWithWhereUniqueWithoutChapterInput | MaktabahContentUpdateWithWhereUniqueWithoutChapterInput[]
    updateMany?: MaktabahContentUpdateManyWithWhereWithoutChapterInput | MaktabahContentUpdateManyWithWhereWithoutChapterInput[]
    deleteMany?: MaktabahContentScalarWhereInput | MaktabahContentScalarWhereInput[]
  }

  export type MaktabahBookCreateNestedOneWithoutContentsInput = {
    create?: XOR<MaktabahBookCreateWithoutContentsInput, MaktabahBookUncheckedCreateWithoutContentsInput>
    connectOrCreate?: MaktabahBookCreateOrConnectWithoutContentsInput
    connect?: MaktabahBookWhereUniqueInput
  }

  export type MaktabahChapterCreateNestedOneWithoutContentsInput = {
    create?: XOR<MaktabahChapterCreateWithoutContentsInput, MaktabahChapterUncheckedCreateWithoutContentsInput>
    connectOrCreate?: MaktabahChapterCreateOrConnectWithoutContentsInput
    connect?: MaktabahChapterWhereUniqueInput
  }

  export type MaktabahBookUpdateOneRequiredWithoutContentsNestedInput = {
    create?: XOR<MaktabahBookCreateWithoutContentsInput, MaktabahBookUncheckedCreateWithoutContentsInput>
    connectOrCreate?: MaktabahBookCreateOrConnectWithoutContentsInput
    upsert?: MaktabahBookUpsertWithoutContentsInput
    connect?: MaktabahBookWhereUniqueInput
    update?: XOR<XOR<MaktabahBookUpdateToOneWithWhereWithoutContentsInput, MaktabahBookUpdateWithoutContentsInput>, MaktabahBookUncheckedUpdateWithoutContentsInput>
  }

  export type MaktabahChapterUpdateOneWithoutContentsNestedInput = {
    create?: XOR<MaktabahChapterCreateWithoutContentsInput, MaktabahChapterUncheckedCreateWithoutContentsInput>
    connectOrCreate?: MaktabahChapterCreateOrConnectWithoutContentsInput
    upsert?: MaktabahChapterUpsertWithoutContentsInput
    disconnect?: MaktabahChapterWhereInput | boolean
    delete?: MaktabahChapterWhereInput | boolean
    connect?: MaktabahChapterWhereUniqueInput
    update?: XOR<XOR<MaktabahChapterUpdateToOneWithWhereWithoutContentsInput, MaktabahChapterUpdateWithoutContentsInput>, MaktabahChapterUncheckedUpdateWithoutContentsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type MaktabahChapterCreateWithoutBookInput = {
    id: number
    title: string
    titleAr?: string | null
    orderNo?: number | null
    contents?: MaktabahContentCreateNestedManyWithoutChapterInput
  }

  export type MaktabahChapterUncheckedCreateWithoutBookInput = {
    id: number
    title: string
    titleAr?: string | null
    orderNo?: number | null
    contents?: MaktabahContentUncheckedCreateNestedManyWithoutChapterInput
  }

  export type MaktabahChapterCreateOrConnectWithoutBookInput = {
    where: MaktabahChapterWhereUniqueInput
    create: XOR<MaktabahChapterCreateWithoutBookInput, MaktabahChapterUncheckedCreateWithoutBookInput>
  }

  export type MaktabahChapterCreateManyBookInputEnvelope = {
    data: MaktabahChapterCreateManyBookInput | MaktabahChapterCreateManyBookInput[]
    skipDuplicates?: boolean
  }

  export type MaktabahContentCreateWithoutBookInput = {
    id: number
    page?: number | null
    volume?: number | null
    contentAr: string
    contentText?: string | null
    normalized?: string | null
    searchText?: string | null
    chapter?: MaktabahChapterCreateNestedOneWithoutContentsInput
  }

  export type MaktabahContentUncheckedCreateWithoutBookInput = {
    id: number
    chapterId?: number | null
    page?: number | null
    volume?: number | null
    contentAr: string
    contentText?: string | null
    normalized?: string | null
    searchText?: string | null
  }

  export type MaktabahContentCreateOrConnectWithoutBookInput = {
    where: MaktabahContentWhereUniqueInput
    create: XOR<MaktabahContentCreateWithoutBookInput, MaktabahContentUncheckedCreateWithoutBookInput>
  }

  export type MaktabahContentCreateManyBookInputEnvelope = {
    data: MaktabahContentCreateManyBookInput | MaktabahContentCreateManyBookInput[]
    skipDuplicates?: boolean
  }

  export type MaktabahChapterUpsertWithWhereUniqueWithoutBookInput = {
    where: MaktabahChapterWhereUniqueInput
    update: XOR<MaktabahChapterUpdateWithoutBookInput, MaktabahChapterUncheckedUpdateWithoutBookInput>
    create: XOR<MaktabahChapterCreateWithoutBookInput, MaktabahChapterUncheckedCreateWithoutBookInput>
  }

  export type MaktabahChapterUpdateWithWhereUniqueWithoutBookInput = {
    where: MaktabahChapterWhereUniqueInput
    data: XOR<MaktabahChapterUpdateWithoutBookInput, MaktabahChapterUncheckedUpdateWithoutBookInput>
  }

  export type MaktabahChapterUpdateManyWithWhereWithoutBookInput = {
    where: MaktabahChapterScalarWhereInput
    data: XOR<MaktabahChapterUpdateManyMutationInput, MaktabahChapterUncheckedUpdateManyWithoutBookInput>
  }

  export type MaktabahChapterScalarWhereInput = {
    AND?: MaktabahChapterScalarWhereInput | MaktabahChapterScalarWhereInput[]
    OR?: MaktabahChapterScalarWhereInput[]
    NOT?: MaktabahChapterScalarWhereInput | MaktabahChapterScalarWhereInput[]
    id?: IntFilter<"MaktabahChapter"> | number
    bookId?: IntFilter<"MaktabahChapter"> | number
    title?: StringFilter<"MaktabahChapter"> | string
    titleAr?: StringNullableFilter<"MaktabahChapter"> | string | null
    orderNo?: IntNullableFilter<"MaktabahChapter"> | number | null
  }

  export type MaktabahContentUpsertWithWhereUniqueWithoutBookInput = {
    where: MaktabahContentWhereUniqueInput
    update: XOR<MaktabahContentUpdateWithoutBookInput, MaktabahContentUncheckedUpdateWithoutBookInput>
    create: XOR<MaktabahContentCreateWithoutBookInput, MaktabahContentUncheckedCreateWithoutBookInput>
  }

  export type MaktabahContentUpdateWithWhereUniqueWithoutBookInput = {
    where: MaktabahContentWhereUniqueInput
    data: XOR<MaktabahContentUpdateWithoutBookInput, MaktabahContentUncheckedUpdateWithoutBookInput>
  }

  export type MaktabahContentUpdateManyWithWhereWithoutBookInput = {
    where: MaktabahContentScalarWhereInput
    data: XOR<MaktabahContentUpdateManyMutationInput, MaktabahContentUncheckedUpdateManyWithoutBookInput>
  }

  export type MaktabahContentScalarWhereInput = {
    AND?: MaktabahContentScalarWhereInput | MaktabahContentScalarWhereInput[]
    OR?: MaktabahContentScalarWhereInput[]
    NOT?: MaktabahContentScalarWhereInput | MaktabahContentScalarWhereInput[]
    id?: IntFilter<"MaktabahContent"> | number
    bookId?: IntFilter<"MaktabahContent"> | number
    chapterId?: IntNullableFilter<"MaktabahContent"> | number | null
    page?: IntNullableFilter<"MaktabahContent"> | number | null
    volume?: IntNullableFilter<"MaktabahContent"> | number | null
    contentAr?: StringFilter<"MaktabahContent"> | string
    contentText?: StringNullableFilter<"MaktabahContent"> | string | null
    normalized?: StringNullableFilter<"MaktabahContent"> | string | null
    searchText?: StringNullableFilter<"MaktabahContent"> | string | null
  }

  export type MaktabahBookCreateWithoutChaptersInput = {
    id: number
    title: string
    titleAr?: string | null
    author?: string | null
    authorAr?: string | null
    category?: string | null
    source?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    contents?: MaktabahContentCreateNestedManyWithoutBookInput
  }

  export type MaktabahBookUncheckedCreateWithoutChaptersInput = {
    id: number
    title: string
    titleAr?: string | null
    author?: string | null
    authorAr?: string | null
    category?: string | null
    source?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    contents?: MaktabahContentUncheckedCreateNestedManyWithoutBookInput
  }

  export type MaktabahBookCreateOrConnectWithoutChaptersInput = {
    where: MaktabahBookWhereUniqueInput
    create: XOR<MaktabahBookCreateWithoutChaptersInput, MaktabahBookUncheckedCreateWithoutChaptersInput>
  }

  export type MaktabahContentCreateWithoutChapterInput = {
    id: number
    page?: number | null
    volume?: number | null
    contentAr: string
    contentText?: string | null
    normalized?: string | null
    searchText?: string | null
    book: MaktabahBookCreateNestedOneWithoutContentsInput
  }

  export type MaktabahContentUncheckedCreateWithoutChapterInput = {
    id: number
    bookId: number
    page?: number | null
    volume?: number | null
    contentAr: string
    contentText?: string | null
    normalized?: string | null
    searchText?: string | null
  }

  export type MaktabahContentCreateOrConnectWithoutChapterInput = {
    where: MaktabahContentWhereUniqueInput
    create: XOR<MaktabahContentCreateWithoutChapterInput, MaktabahContentUncheckedCreateWithoutChapterInput>
  }

  export type MaktabahContentCreateManyChapterInputEnvelope = {
    data: MaktabahContentCreateManyChapterInput | MaktabahContentCreateManyChapterInput[]
    skipDuplicates?: boolean
  }

  export type MaktabahBookUpsertWithoutChaptersInput = {
    update: XOR<MaktabahBookUpdateWithoutChaptersInput, MaktabahBookUncheckedUpdateWithoutChaptersInput>
    create: XOR<MaktabahBookCreateWithoutChaptersInput, MaktabahBookUncheckedCreateWithoutChaptersInput>
    where?: MaktabahBookWhereInput
  }

  export type MaktabahBookUpdateToOneWithWhereWithoutChaptersInput = {
    where?: MaktabahBookWhereInput
    data: XOR<MaktabahBookUpdateWithoutChaptersInput, MaktabahBookUncheckedUpdateWithoutChaptersInput>
  }

  export type MaktabahBookUpdateWithoutChaptersInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    titleAr?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    authorAr?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contents?: MaktabahContentUpdateManyWithoutBookNestedInput
  }

  export type MaktabahBookUncheckedUpdateWithoutChaptersInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    titleAr?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    authorAr?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contents?: MaktabahContentUncheckedUpdateManyWithoutBookNestedInput
  }

  export type MaktabahContentUpsertWithWhereUniqueWithoutChapterInput = {
    where: MaktabahContentWhereUniqueInput
    update: XOR<MaktabahContentUpdateWithoutChapterInput, MaktabahContentUncheckedUpdateWithoutChapterInput>
    create: XOR<MaktabahContentCreateWithoutChapterInput, MaktabahContentUncheckedCreateWithoutChapterInput>
  }

  export type MaktabahContentUpdateWithWhereUniqueWithoutChapterInput = {
    where: MaktabahContentWhereUniqueInput
    data: XOR<MaktabahContentUpdateWithoutChapterInput, MaktabahContentUncheckedUpdateWithoutChapterInput>
  }

  export type MaktabahContentUpdateManyWithWhereWithoutChapterInput = {
    where: MaktabahContentScalarWhereInput
    data: XOR<MaktabahContentUpdateManyMutationInput, MaktabahContentUncheckedUpdateManyWithoutChapterInput>
  }

  export type MaktabahBookCreateWithoutContentsInput = {
    id: number
    title: string
    titleAr?: string | null
    author?: string | null
    authorAr?: string | null
    category?: string | null
    source?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    chapters?: MaktabahChapterCreateNestedManyWithoutBookInput
  }

  export type MaktabahBookUncheckedCreateWithoutContentsInput = {
    id: number
    title: string
    titleAr?: string | null
    author?: string | null
    authorAr?: string | null
    category?: string | null
    source?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    chapters?: MaktabahChapterUncheckedCreateNestedManyWithoutBookInput
  }

  export type MaktabahBookCreateOrConnectWithoutContentsInput = {
    where: MaktabahBookWhereUniqueInput
    create: XOR<MaktabahBookCreateWithoutContentsInput, MaktabahBookUncheckedCreateWithoutContentsInput>
  }

  export type MaktabahChapterCreateWithoutContentsInput = {
    id: number
    title: string
    titleAr?: string | null
    orderNo?: number | null
    book: MaktabahBookCreateNestedOneWithoutChaptersInput
  }

  export type MaktabahChapterUncheckedCreateWithoutContentsInput = {
    id: number
    bookId: number
    title: string
    titleAr?: string | null
    orderNo?: number | null
  }

  export type MaktabahChapterCreateOrConnectWithoutContentsInput = {
    where: MaktabahChapterWhereUniqueInput
    create: XOR<MaktabahChapterCreateWithoutContentsInput, MaktabahChapterUncheckedCreateWithoutContentsInput>
  }

  export type MaktabahBookUpsertWithoutContentsInput = {
    update: XOR<MaktabahBookUpdateWithoutContentsInput, MaktabahBookUncheckedUpdateWithoutContentsInput>
    create: XOR<MaktabahBookCreateWithoutContentsInput, MaktabahBookUncheckedCreateWithoutContentsInput>
    where?: MaktabahBookWhereInput
  }

  export type MaktabahBookUpdateToOneWithWhereWithoutContentsInput = {
    where?: MaktabahBookWhereInput
    data: XOR<MaktabahBookUpdateWithoutContentsInput, MaktabahBookUncheckedUpdateWithoutContentsInput>
  }

  export type MaktabahBookUpdateWithoutContentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    titleAr?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    authorAr?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    chapters?: MaktabahChapterUpdateManyWithoutBookNestedInput
  }

  export type MaktabahBookUncheckedUpdateWithoutContentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    titleAr?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    authorAr?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    chapters?: MaktabahChapterUncheckedUpdateManyWithoutBookNestedInput
  }

  export type MaktabahChapterUpsertWithoutContentsInput = {
    update: XOR<MaktabahChapterUpdateWithoutContentsInput, MaktabahChapterUncheckedUpdateWithoutContentsInput>
    create: XOR<MaktabahChapterCreateWithoutContentsInput, MaktabahChapterUncheckedCreateWithoutContentsInput>
    where?: MaktabahChapterWhereInput
  }

  export type MaktabahChapterUpdateToOneWithWhereWithoutContentsInput = {
    where?: MaktabahChapterWhereInput
    data: XOR<MaktabahChapterUpdateWithoutContentsInput, MaktabahChapterUncheckedUpdateWithoutContentsInput>
  }

  export type MaktabahChapterUpdateWithoutContentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    titleAr?: NullableStringFieldUpdateOperationsInput | string | null
    orderNo?: NullableIntFieldUpdateOperationsInput | number | null
    book?: MaktabahBookUpdateOneRequiredWithoutChaptersNestedInput
  }

  export type MaktabahChapterUncheckedUpdateWithoutContentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    bookId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    titleAr?: NullableStringFieldUpdateOperationsInput | string | null
    orderNo?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type MaktabahChapterCreateManyBookInput = {
    id: number
    title: string
    titleAr?: string | null
    orderNo?: number | null
  }

  export type MaktabahContentCreateManyBookInput = {
    id: number
    chapterId?: number | null
    page?: number | null
    volume?: number | null
    contentAr: string
    contentText?: string | null
    normalized?: string | null
    searchText?: string | null
  }

  export type MaktabahChapterUpdateWithoutBookInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    titleAr?: NullableStringFieldUpdateOperationsInput | string | null
    orderNo?: NullableIntFieldUpdateOperationsInput | number | null
    contents?: MaktabahContentUpdateManyWithoutChapterNestedInput
  }

  export type MaktabahChapterUncheckedUpdateWithoutBookInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    titleAr?: NullableStringFieldUpdateOperationsInput | string | null
    orderNo?: NullableIntFieldUpdateOperationsInput | number | null
    contents?: MaktabahContentUncheckedUpdateManyWithoutChapterNestedInput
  }

  export type MaktabahChapterUncheckedUpdateManyWithoutBookInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    titleAr?: NullableStringFieldUpdateOperationsInput | string | null
    orderNo?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type MaktabahContentUpdateWithoutBookInput = {
    id?: IntFieldUpdateOperationsInput | number
    page?: NullableIntFieldUpdateOperationsInput | number | null
    volume?: NullableIntFieldUpdateOperationsInput | number | null
    contentAr?: StringFieldUpdateOperationsInput | string
    contentText?: NullableStringFieldUpdateOperationsInput | string | null
    normalized?: NullableStringFieldUpdateOperationsInput | string | null
    searchText?: NullableStringFieldUpdateOperationsInput | string | null
    chapter?: MaktabahChapterUpdateOneWithoutContentsNestedInput
  }

  export type MaktabahContentUncheckedUpdateWithoutBookInput = {
    id?: IntFieldUpdateOperationsInput | number
    chapterId?: NullableIntFieldUpdateOperationsInput | number | null
    page?: NullableIntFieldUpdateOperationsInput | number | null
    volume?: NullableIntFieldUpdateOperationsInput | number | null
    contentAr?: StringFieldUpdateOperationsInput | string
    contentText?: NullableStringFieldUpdateOperationsInput | string | null
    normalized?: NullableStringFieldUpdateOperationsInput | string | null
    searchText?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MaktabahContentUncheckedUpdateManyWithoutBookInput = {
    id?: IntFieldUpdateOperationsInput | number
    chapterId?: NullableIntFieldUpdateOperationsInput | number | null
    page?: NullableIntFieldUpdateOperationsInput | number | null
    volume?: NullableIntFieldUpdateOperationsInput | number | null
    contentAr?: StringFieldUpdateOperationsInput | string
    contentText?: NullableStringFieldUpdateOperationsInput | string | null
    normalized?: NullableStringFieldUpdateOperationsInput | string | null
    searchText?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MaktabahContentCreateManyChapterInput = {
    id: number
    bookId: number
    page?: number | null
    volume?: number | null
    contentAr: string
    contentText?: string | null
    normalized?: string | null
    searchText?: string | null
  }

  export type MaktabahContentUpdateWithoutChapterInput = {
    id?: IntFieldUpdateOperationsInput | number
    page?: NullableIntFieldUpdateOperationsInput | number | null
    volume?: NullableIntFieldUpdateOperationsInput | number | null
    contentAr?: StringFieldUpdateOperationsInput | string
    contentText?: NullableStringFieldUpdateOperationsInput | string | null
    normalized?: NullableStringFieldUpdateOperationsInput | string | null
    searchText?: NullableStringFieldUpdateOperationsInput | string | null
    book?: MaktabahBookUpdateOneRequiredWithoutContentsNestedInput
  }

  export type MaktabahContentUncheckedUpdateWithoutChapterInput = {
    id?: IntFieldUpdateOperationsInput | number
    bookId?: IntFieldUpdateOperationsInput | number
    page?: NullableIntFieldUpdateOperationsInput | number | null
    volume?: NullableIntFieldUpdateOperationsInput | number | null
    contentAr?: StringFieldUpdateOperationsInput | string
    contentText?: NullableStringFieldUpdateOperationsInput | string | null
    normalized?: NullableStringFieldUpdateOperationsInput | string | null
    searchText?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MaktabahContentUncheckedUpdateManyWithoutChapterInput = {
    id?: IntFieldUpdateOperationsInput | number
    bookId?: IntFieldUpdateOperationsInput | number
    page?: NullableIntFieldUpdateOperationsInput | number | null
    volume?: NullableIntFieldUpdateOperationsInput | number | null
    contentAr?: StringFieldUpdateOperationsInput | string
    contentText?: NullableStringFieldUpdateOperationsInput | string | null
    normalized?: NullableStringFieldUpdateOperationsInput | string | null
    searchText?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use MaktabahBookCountOutputTypeDefaultArgs instead
     */
    export type MaktabahBookCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MaktabahBookCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MaktabahChapterCountOutputTypeDefaultArgs instead
     */
    export type MaktabahChapterCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MaktabahChapterCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MaktabahBookDefaultArgs instead
     */
    export type MaktabahBookArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MaktabahBookDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MaktabahChapterDefaultArgs instead
     */
    export type MaktabahChapterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MaktabahChapterDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MaktabahContentDefaultArgs instead
     */
    export type MaktabahContentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MaktabahContentDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}