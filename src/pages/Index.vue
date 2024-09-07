<template>
    <Layout home>
        <div class="relative flex">
            <div
                class="z-10 flex flex-col items-center max-w-4xl px-4 py-8 mx-auto text-center md:py-16"
            >
                <div class="flex flex-col items-center mb-2 text-ui-primary">
                    <h1 class="text-4xl border-none md:text-4xl lg:text-6xl">
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
                    LdapRecord is a framework that helps you quickly integrate
                    LDAP into your
                    <span class="font-bold">PHP</span> applications.
                </p>

                <div class="flex justify-center mt-8 space-x-4">
                    <Button to="/docs/core/v3/">
                        Get started
                        <ArrowRightCircleIcon class="ml-4" size="1x" />
                    </Button>
                </div>
            </div>

            <BackgroundSvg
                height="500"
                class="absolute top-0 z-0 w-full -my-32 text-ui-shade"
            />
        </div>

        <div
            class="relative z-10 flex flex-col pt-32 mx-auto space-y-32 max-w-7xl"
        >
            <Example title="Declarative" subtitle="LDAP Models.">
                <template #icon>
                    <CodeIcon class="w-6 h-6 text-white" />
                </template>

                <template #description>
                    Each LDAP object type has its own model. If you've used
                    Laravel's Eloquent or an Active Record equivalent, you'll
                    feel right at home.
                </template>

                <template #content>
                    <CodeWindow
                        class="overflow-hidden rounded-lg shadow-lg"
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
                    <ZapIcon class="w-6 h-6 text-white" />
                </template>

                <template #description>
                    LdapRecord's filter builder provides a clean, chainable API,
                    that's easy to read and write.
                </template>

                <template #content>
                    <CodeWindow
                        class="overflow-hidden rounded-lg shadow-lg"
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
                    <BatteryChargingIcon class="w-6 h-6 text-white" />
                </template>

                <template #description>
                    Events, caching, logging, testing tools, relationships,
                    accessors, mutators, and more. They all come out-of-the-box.
                </template>

                <template #content>
                    <CodeWindow
                        class="overflow-hidden rounded-lg shadow-lg"
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

        <div class="relative py-16 bg-ui-background sm:py-24 lg:py-32">
            <div
                class="max-w-md px-4 mx-auto text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl"
            >
                <h2
                    class="text-base font-black tracking-wider uppercase text-ui-primary"
                >
                    Integrate faster
                </h2>

                <p
                    class="mt-2 text-3xl font-extrabold tracking-tight text-ui-typo sm:text-4xl"
                >
                    Everything you'll need to integrate LDAP.
                </p>

                <div class="mt-12">
                    <div
                        class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        <Feature
                            name="Works With All Directories"
                            description="Support for Active Directory, OpenLDAP and 389 Directory Server is included."
                        >
                            <template #icon>
                                <CheckCircleIcon class="w-6 h-6 text-white" />
                            </template>
                        </Feature>

                        <Feature
                            name="Fluent Filter Builder"
                            description="Effortlessly build complex LDAP filters with easy to read and write fluent syntax."
                        >
                            <template #icon>
                                <RefreshCwIcon class="w-6 h-6 text-white" />
                            </template>
                        </Feature>

                        <Feature
                            name="Friends In High Places"
                            description="Includes a first-party feature packed integration with the Laravel framework."
                        >
                            <template #icon>
                                <LaravelIcon class="w-6 h-6 text-white" />
                            </template>
                        </Feature>
                    </div>
                </div>
            </div>
        </div>

        <div
            class="px-4 py-12 mx-auto text-center max-w-7xl sm:px-6 lg:py-16 lg:px-8"
        >
            <div class="py-8 rounded-lg bg-ui-light border border-ui-border">
                <h2 class="text-3xl tracking-tight sm:text-4xl">
                    <span class="block font-extrabold text-ui-typo">
                      Ready to dive in?
                    </span>

                    <span class="block text-2xl text-ui-secondary">
                        Get up and running in minutes.
                    </span>
                </h2>

                <div
                    class="flex flex-col items-center justify-center mt-8 space-y-4 md:flex-row md:space-y-0"
                >
                    <div class="inline-flex rounded-md">
                        <Button to="/docs/core/v3/quickstart">
                            Quickstart
                        </Button>
                    </div>

                    <div class="inline-flex md:ml-3">
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
        const description =
            "LdapRecord is a framework that helps you quickly integrate LDAP into  your PHP applications.";

        return {
            title: "A framework for rapid LDAP integration.",
            meta: [
                {
                    name: "description",
                    content: description,
                },
                {
                    key: "og:title",
                    name: "og:title",
                    content: "LdapRecord",
                },
                {
                    key: "twitter:title",
                    name: "twitter:title",
                    content: "LdapRecord",
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
