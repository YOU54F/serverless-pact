# -*- encoding: utf-8 -*-
# stub: pact_broker-client 1.18.0 ruby lib

Gem::Specification.new do |s|
  s.name = "pact_broker-client".freeze
  s.version = "1.18.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Beth Skurrie".freeze]
  s.date = "2019-03-04"
  s.description = "Client for the Pact Broker. Publish, retrieve and query pacts and verification results.".freeze
  s.email = ["bskurrie@dius.com.au".freeze]
  s.executables = ["pact-broker".freeze]
  s.files = ["bin/pact-broker".freeze]
  s.homepage = "https://github.com/bethesque/pact_broker-client.git".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.0".freeze)
  s.rubygems_version = "2.7.8".freeze
  s.summary = "See description".freeze

  s.installed_by_version = "2.7.8" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<httparty>.freeze, [">= 0"])
      s.add_runtime_dependency(%q<json>.freeze, [">= 0"])
      s.add_runtime_dependency(%q<term-ansicolor>.freeze, [">= 0"])
      s.add_runtime_dependency(%q<table_print>.freeze, ["~> 1.5"])
      s.add_runtime_dependency(%q<thor>.freeze, ["~> 0.20"])
      s.add_runtime_dependency(%q<rake>.freeze, [">= 0"])
      s.add_development_dependency(%q<fakefs>.freeze, ["~> 0.4"])
      s.add_development_dependency(%q<webmock>.freeze, ["~> 3.0"])
      s.add_development_dependency(%q<conventional-changelog>.freeze, ["~> 1.3"])
      s.add_development_dependency(%q<pact>.freeze, ["~> 1.16"])
      s.add_development_dependency(%q<bump>.freeze, ["~> 0.5"])
    else
      s.add_dependency(%q<httparty>.freeze, [">= 0"])
      s.add_dependency(%q<json>.freeze, [">= 0"])
      s.add_dependency(%q<term-ansicolor>.freeze, [">= 0"])
      s.add_dependency(%q<table_print>.freeze, ["~> 1.5"])
      s.add_dependency(%q<thor>.freeze, ["~> 0.20"])
      s.add_dependency(%q<rake>.freeze, [">= 0"])
      s.add_dependency(%q<fakefs>.freeze, ["~> 0.4"])
      s.add_dependency(%q<webmock>.freeze, ["~> 3.0"])
      s.add_dependency(%q<conventional-changelog>.freeze, ["~> 1.3"])
      s.add_dependency(%q<pact>.freeze, ["~> 1.16"])
      s.add_dependency(%q<bump>.freeze, ["~> 0.5"])
    end
  else
    s.add_dependency(%q<httparty>.freeze, [">= 0"])
    s.add_dependency(%q<json>.freeze, [">= 0"])
    s.add_dependency(%q<term-ansicolor>.freeze, [">= 0"])
    s.add_dependency(%q<table_print>.freeze, ["~> 1.5"])
    s.add_dependency(%q<thor>.freeze, ["~> 0.20"])
    s.add_dependency(%q<rake>.freeze, [">= 0"])
    s.add_dependency(%q<fakefs>.freeze, ["~> 0.4"])
    s.add_dependency(%q<webmock>.freeze, ["~> 3.0"])
    s.add_dependency(%q<conventional-changelog>.freeze, ["~> 1.3"])
    s.add_dependency(%q<pact>.freeze, ["~> 1.16"])
    s.add_dependency(%q<bump>.freeze, ["~> 0.5"])
  end
end
