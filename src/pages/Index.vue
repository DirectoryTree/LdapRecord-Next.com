<template>
  <Layout>
    <div class="relative flex">
      <div
        class="max-w-4xl flex flex-col items-center text-center px-4 py-8 md:py-16 mx-auto z-10"
      >
        <div class="flex flex-col items-center mb-2 text-ui-primary">
          <h1 class="text-4xl md:text-4xl lg:text-6xl border-none">
            <span>
              A framework for
              <br />
            </span>

            <span class="text-gradient bg-gradient-l-purple-light">
              Rapid LDAP Integration
            </span>
          </h1>
        </div>

        <p class="text-xl text-center text-ui-secondary">
          LdapRecord is a framework that helps you quickly integrate LDAP into
          your <span class="font-bold">PHP</span> applications.
        </p>

        <div class="flex justify-center mt-8 space-x-4">
          <Button to="/docs/core/v2/">
            Get started
            <ArrowRightCircleIcon class="ml-4" size="1x" />
          </Button>
        </div>
      </div>

      <BackgroundSvg
        height="500"
        class="absolute top-0 w-full z-0 text-ui-shade -my-32"
      />
    </div>

    <div class="relative flex flex-col z-10 space-y-32 max-w-7xl mx-auto pt-32">
      <Example title="Declarative" subtitle="LDAP Models.">
        <template #icon>
          <CodeIcon class="h-6 w-6 text-white" />
        </template>

        <template #description>
          Each LDAP object type has its own model. If you've used Laravel's
          Eloquent or an Active Record equivalent, you'll feel right at home.
        </template>

        <template #content>
          <CodeWindow
            class="shadow-lg rounded-lg ring-1 ring-black ring-opacity-5 overflow-hidden"
          >
            <CodeWindowTab
              name="Model.php"
              source="
```php
use LdapRecord\Models\Model;

class User extends Model
{
    protected $objectClasses = [
        'top',
        'person',
        'organizationalperson',
        'user',
    ];
}
```"
            />

            <CodeWindowTab
              name="Usage.php"
              source="
```php
$user = User::create([
    'company'        => 'LdapRecord',
    'title'          => 'Web Developer',
    'password'       => 'P@ssw0rd',
    'samaccountname' => 'sbauman',
    'mail'           => 'sbauman@acme.org',
    'givenname'      => 'Steve',
    'sn'             => 'Bauman',
]);
```"
            />
          </CodeWindow>
        </template>
      </Example>

      <Example alternate title="Query" subtitle="Like a boss.">
        <template #icon>
          <ZapIcon class="h-6 w-6 text-white" />
        </template>

        <template #description>
          LdapRecord's filter builder provides a clean, chainable API, that's
          easy to read and write.
        </template>

        <template #content>
          <CodeWindow
            class="shadow-lg rounded-lg ring-1 ring-black ring-opacity-5 overflow-hidden"
          >
            <CodeWindowTab
              name="QueryBuilder.php"
              source="
```php
User::in('ou=office,dc=local,dc=com')
    ->whereEnabled()
    ->whereMemberOf('cn=managers,ou=groups,dc=local,dc=com')
    ->whereNotContains('company', 'acme')
    ->get()
    ->each(function ($user) {
        $user->company = 'Acme Organization';

        $user->save();
    });
```"
            />
          </CodeWindow>
        </template>
      </Example>

      <Example title="Batteries" subtitle=" Come included.">
        <template #icon>
          <BatteryChargingIcon class="h-6 w-6 text-white" />
        </template>

        <template #description>
          Events, caching, logging, testing tools, relationships, accessors,
          mutators, and more. They all come out-of-the-box.
        </template>

        <template #content>
          <CodeWindow
            class="shadow-lg rounded-lg ring-1 ring-black ring-opacity-5 overflow-hidden"
          >
            <CodeWindowTab
              name="Events.php"
              source="
```php
$dispatcher = Container::getEventDispatcher();

$dispatcher->listen(Saved::class, function (Saved $event) {
    Mail::send(
        new LdapObjectModified($event->getModel())
    );
});
```"
            />

            <CodeWindowTab
              name="Caching.php"
              source="
```php
$connection = Container::getDefaultConnection();

$connection->setCache($myAppCache);

$until = new \DateTime('tomorrow');

$users = User::cache($until)->get();
```"
            />

            <CodeWindowTab
              name="Relations.php"
              source="
```php
$user = User::find('cn=John Doe,dc=local,dc=com');

$groups = $user->groups()->get();

foreach ($groups as $group) {
    echo $group->getName() . PHP_EOL;
}
```"
            />
          </CodeWindow>
        </template>
      </Example>
    </div>

    <div class="relative bg-ui-background py-16 sm:py-24 lg:py-32">
      <div
        class="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl"
      >
        <h2
          class="text-base font-black tracking-wider text-ui-primary uppercase"
        >
          Integrate faster
        </h2>

        <p
          class="mt-2 text-3xl font-extrabold text-ui-typo tracking-tight sm:text-4xl"
        >
          Everything you'll need to integrate LDAP.
        </p>

        <div class="mt-12">
          <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Feature
              name="Works With All Directories"
              description="Support for Active Directory, OpenLDAP and 389 Directory Server is included."
            >
              <template #icon>
                <CheckCircleIcon class="h-6 w-6 text-white" />
              </template>
            </Feature>

            <Feature
              name="Fluent Filter Builder"
              description="Effortlessly build complex LDAP filters with easy to read and write fluent syntax."
            >
              <template #icon>
                <RefreshCwIcon class="h-6 w-6 text-white" />
              </template>
            </Feature>

            <Feature
              name="Friends In High Places"
              description="Heavy integrations with Laravel and Lumen frameworks come directly supported."
            >
              <template #icon>
                <LaravelIcon class="h-6 w-6 text-white" />
              </template>
            </Feature>
          </div>
        </div>
      </div>
    </div>

    <div
      class="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8"
    >
      <div class="bg-ui-shade rounded-lg shadow-lg py-8">
        <h2 class="text-3xl tracking-tight sm:text-4xl">
          <span class="block font-extrabold text-ui-typo"
            >Ready to dive in?</span
          >

          <span class="block text-2xl text-ui-secondary">
            Get up and running in minutes.
          </span>
        </h2>

        <div class="mt-8 flex justify-center">
          <div class="inline-flex rounded-md">
            <Button to="/docs/core/v2/quickstart">
              Quickstart
            </Button>
          </div>

          <div class="ml-3 inline-flex">
            <Button
              variant="secondary"
              class="border-ui-border"
              to="https://github.com/sponsors/stevebauman"
            >
              Sponsor
              <HeartIcon class="ml-4 text-red-500" size="1x" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Button from "@/components/Button";
import Feature from "@/components/Feature";
import Example from "@/components/Example";
import LaravelIcon from "@/components/LaravelIcon";
import CodeWindow from "@/components/CodeWindow";
import CodeWindowTab from "@/components/CodeWindowTab";
import BackgroundSvg from "@/assets/background.svg";

import {
  ArrowRightCircleIcon,
  ZapIcon,
  CodeIcon,
  MoonIcon,
  SearchIcon,
  HeartIcon,
  CheckCircleIcon,
  RefreshCwIcon,
  BatteryChargingIcon,
} from "vue-feather-icons";

export default {
  components: {
    BackgroundSvg,
    BatteryChargingIcon,
    Button,
    Feature,
    Example,
    CodeWindow,
    CodeWindowTab,
    LaravelIcon,
    CheckCircleIcon,
    HeartIcon,
    ArrowRightCircleIcon,
    ZapIcon,
    CodeIcon,
    MoonIcon,
    SearchIcon,
    RefreshCwIcon,
  },

  data() {
    return {
      examples: {
        builder: "testing",
      },
    };
  },

  metaInfo() {
    const title = "A framework for rapid LDAP integration.";

    const description =
      "LdapRecord is a framework that helps you quickly integrate LDAP into  your PHP applications.";

    return {
      title: title,
      meta: [
        {
          name: "description",
          content: description,
        },
        {
          key: "og:title",
          name: "og:title",
          content: title,
        },
        {
          key: "twitter:title",
          name: "twitter:title",
          content: title,
        },
        {
          key: "og:description",
          name: "og:description",
          content: description,
        },
        {
          key: "twitter:description",
          name: "twitter:description",
          content: description,
        },
      ],
    };
  },
};
</script>
